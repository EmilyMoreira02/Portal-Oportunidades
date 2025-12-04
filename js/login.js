// Arquivo: js/login.js

function mostrarSenhaEye() {
    const passwordInput = document.getElementById('password');
    const mostrarSenha = document.getElementById('eye-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        mostrarSenha.textContent = 'visibility';
    } else {
        passwordInput.type = 'password';
        mostrarSenha.textContent = 'visibility_off';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mostrarSenha = document.getElementById('eye-password');
    if (mostrarSenha) {
        mostrarSenha.addEventListener('click', mostrarSenhaEye);
    }
    
    const formLogin = document.getElementById('login-form');
    
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            
            // 1. Tenta buscar a lista de usuários salvos
            const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados');
            
            if (usuariosSalvosJSON) {
                const usuarios = JSON.parse(usuariosSalvosJSON);
                
                // 2. Tenta encontrar o usuário que corresponde ao e-mail e senha
                const usuarioEncontrado = usuarios.find(usuario => 
                    usuario.dadosLogin.email === emailInput && 
                    usuario.dadosLogin.password === passwordInput
                );
                
                if (usuarioEncontrado) {
                    // Login bem-sucedido!
                    
                    // 3. Define o usuário como logado e salva o e-mail (para buscar dados nas outras páginas)
                    localStorage.setItem('usuarioLogado', 'true');
                    localStorage.setItem('emailUsuarioLogado', emailInput);
                    
                    window.location.href = 'dash.html'; 
                } else {
                    alert('Erro: E-mail ou senha incorretos.');
                }
            } else {
                alert('Erro: Nenhuma conta registrada encontrada. Crie uma conta primeiro.');
            }
        });
    }
});