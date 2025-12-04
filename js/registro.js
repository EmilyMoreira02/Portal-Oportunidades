function iniciarRegistro(email, password, phone, birthdate, city) {
    // 1. Cria os objetos de dados para o novo usuário
    const dadosDePerfil = {
        nomeDoUsuario: '', 
        emailDoUsuario: email,
        telefoneDoUsuario: phone,
        localizacaoDoUsuario: city,
        nascimentoDoUsuario: birthdate,
        urlFoto: null, 
    };
    
    const dadosLogin = {
        email: email,
        password: password, // Lembrete: NUNCA salvar a senha em texto simples em produção.
    };
    
    // 2. Obtém a lista ATUAL de usuários OU inicia uma lista vazia
    const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados');
    const usuarios = usuariosSalvosJSON ? JSON.parse(usuariosSalvosJSON) : []; 
    
    // 3. VERIFICA se o e-mail já está cadastrado
    const emailExiste = usuarios.some(u => u.dadosLogin.email === email);
    
    if (emailExiste) {
        alert('Erro: O e-mail informado já está cadastrado.');
        return; // Interrompe o registro
    }
    
    // 4. Adiciona o NOVO usuário na lista
    usuarios.push({ dadosDePerfil, dadosLogin });

    // 5. SALVA a lista COMPLETA de volta no localStorage
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios)); 
    
    window.location.href = "login.html"; 
}

function validarERegistrar(event) {
    event.preventDefault(); 
    const form = document.getElementById('registro-form');
    
    if (form.checkValidity()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const birthdate = document.getElementById('birthdate').value;
        const city = document.getElementById('city').value;
        
        iniciarRegistro(email, password, phone, birthdate, city);
        
    } else {
        form.reportValidity(); 
    }
}

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
    const formRegistro = document.getElementById('registro-form');
    if (formRegistro) {
        formRegistro.addEventListener('submit', validarERegistrar);
    }

    const mostrarSenha = document.getElementById('eye-password');
    if (mostrarSenha) {
        mostrarSenha.addEventListener('click', mostrarSenhaEye);
    }
});