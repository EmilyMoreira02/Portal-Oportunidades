// Arquivo: js/senha.js

document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-form');
    const newPasswordSection = document.getElementById('new-password-section');
    const successMessage = document.getElementById('success-message');
    const confirmResetBtn = document.getElementById('confirm-reset-btn');

    let userToResetIndex = -1; // Armazena o índice do usuário na lista
    let usuariosSalvos = []; // Armazena a lista de usuários para manipulação

    // --- ETAPA 1: SOLICITAR REDEFINIÇÃO (Verificar E-mail) ---
    resetForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados'); // Busca a LISTA
        
        if (!usuariosSalvosJSON) {
            alert('Erro: Nenhuma conta registrada no sistema.');
            return;
        }

        usuariosSalvos = JSON.parse(usuariosSalvosJSON);
        
        // 1. Busca o índice do usuário na lista pelo e-mail
        userToResetIndex = usuariosSalvos.findIndex(usuario => 
             usuario.dadosLogin.email === email
        );
        
        if (userToResetIndex !== -1) { // Se encontrou o índice
            
            // Oculta o formulário de e-mail e mostra o formulário de nova senha
            resetForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            newPasswordSection.style.display = 'block';

        } else {
            alert('E-mail não encontrado. Verifique se o e-mail está correto.');
        }
    });
    
    // --- ETAPA 2: CONFIRMAR NOVA SENHA (Atualizar no localStorage) ---
    confirmResetBtn.addEventListener('click', function() {
        const newPasswordInput = document.getElementById('new-password');
        const newPassword = newPasswordInput.value;

        
        if (userToResetIndex !== -1) {
            // 1. ATUALIZA A SENHA do usuário específico na lista
            usuariosSalvos[userToResetIndex].dadosLogin.password = newPassword;
            
            // 2. SALVA A LISTA COMPLETA E ATUALIZADA de volta no localStorage
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosSalvos));
            
            // 3. Redireciona para o login
            window.location.href = 'login.html';
        }
    });
    
    // Função auxiliar (mantida para caso o seu HTML a use)
    function showSuccess(show) {
        if (show) {
            successMessage.style.display = 'block';
        } else {
            successMessage.style.display = 'none';
        }
    }
});