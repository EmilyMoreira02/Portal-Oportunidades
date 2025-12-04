let uploadedImageBase64 = null;
const defaultImgSrc = "images/image/perfil.jpg"; 

// --- FUNÇÃO CENTRAL DE NOTIFICAÇÃO (Baseada no seu código) ---
function exibirNotificacao(mensagem, tipo) {
    const statusDiv = document.getElementById('mensagem-status');
    if (!statusDiv) {
        alert(mensagem); 
        return;
    }
    statusDiv.style.display = 'none';
    statusDiv.className = 'mensagem-status';
    statusDiv.innerHTML = '';

    setTimeout(function() {
        statusDiv.classList.add(tipo);
        statusDiv.innerHTML = mensagem;
        statusDiv.style.display = 'block';

        // Esconde a notificação após 3 segundos
        setTimeout(function() {
            statusDiv.style.display = 'none';
        }, 3000); 

    }, 100); 
}


// --- FUNÇÕES DE REGISTRO DE USUÁRIO (Criar conta) ---
function iniciarRegistro(email, password, phone, birthdate, city) {
    const dadosDePerfil = {
        nomeDoUsuario: 'Usuário Novo', 
        emailDoUsuario: email,
        telefoneDoUsuario: phone,
        localizacaoDoUsuario: city,
        nascimentoDoUsuario: birthdate,
        urlFoto: defaultImgSrc,
    };
    const dadosLogin = {
        email: email,
        password: password,
    };
    const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados');
    const usuarios = usuariosSalvosJSON ? JSON.parse(usuariosSalvosJSON) : []; 
    
    const emailExiste = usuarios.some(u => u.dadosLogin.email === email);
    
    if (emailExiste) {
        exibirNotificacao('❌ Erro: O e-mail informado já está cadastrado.', 'erro');
        return; 
    }
    
    usuarios.push({ dadosDePerfil, dadosLogin });
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios)); 
    
    window.location.href = "login.html"; 
}

function validarERegistrar(event) {
    event.preventDefault(); 
    const form = document.getElementById('registro-form');
    
    if (form && form.checkValidity()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const birthdate = document.getElementById('birthdate').value;
        const city = document.getElementById('city').value;
        
        iniciarRegistro(email, password, phone, birthdate, city);
        
    } else if (form) {
        form.reportValidity(); 
    }
}


// --- FUNÇÕES DE LOGIN DE USUÁRIO ---
function iniciarLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    
    const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados');
    
    if (usuariosSalvosJSON) {
        const usuarios = JSON.parse(usuariosSalvosJSON);
        
        const usuarioEncontrado = usuarios.find(usuario => 
            usuario.dadosLogin.email === emailInput && 
            usuario.dadosLogin.password === passwordInput
        );
        
        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', 'true');
            localStorage.setItem('emailUsuarioLogado', emailInput);
            
            window.location.href = 'dash.html'; 
        } else {
            exibirNotificacao('❌ Erro: E-mail ou senha incorretos.', 'erro');
        }
    } else {
        exibirNotificacao('❌ Erro: Nenhuma conta registrada encontrada. Crie uma conta primeiro.', 'erro');
    }
}


// --- FUNÇÕES DE PERFIL/CONTA (Carregar e Salvar dados) ---
function getUsuarioLogado() {
    const emailLogado = localStorage.getItem('emailUsuarioLogado');
    const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados');

    if (!emailLogado || !usuariosSalvosJSON) {
        return null;
    }

    try {
        const usuarios = JSON.parse(usuariosSalvosJSON);
        return usuarios.find(u => u.dadosLogin.email === emailLogado);
    } catch (e) {
        console.error("Erro ao analisar a lista de usuários.", e);
        return null;
    }
}

function checkAuthAndLoadProfile() {
    const imagemPerfil = document.getElementById('profile-img');
    const usuarioLogado = getUsuarioLogado();

    if (!usuarioLogado) {
        if (imagemPerfil) { 
            exibirNotificacao('⚠️ Você precisa estar logado para acessar esta página.', 'alerta');
            window.location.href = 'login.html';
        }
        return;
    }

    const dadosSalvos = usuarioLogado.dadosDePerfil;

    // Preenche os campos (se existirem na página)
    if (document.getElementById('nome')) document.getElementById('nome').value = dadosSalvos.nomeDoUsuario || '';
    if (document.getElementById('email')) document.getElementById('email').value = dadosSalvos.emailDoUsuario || '';
    if (document.getElementById('telefone')) document.getElementById('telefone').value = dadosSalvos.telefoneDoUsuario || '';
    if (document.getElementById('localizacao')) document.getElementById('localizacao').value = dadosSalvos.localizacaoDoUsuario || '';
    if (document.getElementById('nascimento')) document.getElementById('nascimento').value = dadosSalvos.nascimentoDoUsuario || '';

    // Lógica para carregar a imagem principal
    if (imagemPerfil) {
        const urlFoto = dadosSalvos.urlFoto;
        imagemPerfil.src = urlFoto && urlFoto !== null ? urlFoto : defaultImgSrc;
        uploadedImageBase64 = imagemPerfil.src;
    }
    
    // Atualiza foto no menu (se o elemento existir)
    const imagemMenu = document.getElementById('menu-profile-img');
    if (imagemMenu) {
        const urlFoto = dadosSalvos.urlFoto;
        imagemMenu.src = urlFoto ? urlFoto : defaultImgSrc;
    }
}

/**
 * Salva os dados do perfil no localStorage.
 * @param {Event} event - O objeto de evento disparado pelo clique (ou submit).
 */
function salvarPerfil(event) {
    // 🛑 CORREÇÃO: Previne o envio padrão do formulário que causa o recarregamento.
    if (event) event.preventDefault(); 
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value; 
    const telefone = document.getElementById('telefone').value;
    const localizacao = document.getElementById('localizacao').value;
    const nascimento = document.getElementById('nascimento').value;

    const dadosParaSalvar = {
        nomeDoUsuario: nome,
        emailDoUsuario: email, 
        telefoneDoUsuario: telefone,
        localizacaoDoUsuario: localizacao,
        nascimentoDoUsuario: nascimento,
        urlFoto: uploadedImageBase64,
        dataHoraSalvamento: new Date().toLocaleString()
    };

    const usuariosSalvosJSON = localStorage.getItem('usuariosRegistrados');
    if (!usuariosSalvosJSON) {
        exibirNotificacao('❌ Erro: Lista de usuários não encontrada.', 'erro');
        return;
    }
    let usuarios = JSON.parse(usuariosSalvosJSON);
    const emailLogado = localStorage.getItem('emailUsuarioLogado');
    
    const index = usuarios.findIndex(u => u.dadosLogin.email === emailLogado);

    if (index !== -1) {
        usuarios[index].dadosDePerfil = dadosParaSalvar;

        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
        
        exibirNotificacao('✅ Alterações salvas com sucesso!', 'sucesso');
        
        checkAuthAndLoadProfile();
    } else {
        exibirNotificacao('❌ Erro: Usuário logado não encontrado na lista.', 'erro');
    }
}


// --- FUNÇÃO DE LOGOUT ---
function handleLogout(event) {
    if (event) event.preventDefault();
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('emailUsuarioLogado');
    window.location.href = 'index.html'; 
}


// --- INICIALIZAÇÃO E LISTENERS GERAIS ---
document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndLoadProfile();
    
    const formRegistro = document.getElementById('registro-form');
    if (formRegistro) {
        formRegistro.addEventListener('submit', validarERegistrar);
    }
    
    const formLogin = document.getElementById('login-form');
    if (formLogin) {
        formLogin.addEventListener('submit', iniciarLogin);
    }

    // 💡 Listener do botão Salvar Alterações
    const salvarBtn = document.getElementById('salvarBtn');
    if (salvarBtn) {
        // O evento de 'click' chama a função 'salvarPerfil' que agora previne o submit.
        salvarBtn.addEventListener('click', salvarPerfil);
    }

    const inputFoto = document.getElementById('upload-foto');
    const imagemPerfil = document.getElementById('profile-img');
    if (inputFoto && imagemPerfil) {
        inputFoto.addEventListener('change', function(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagemPerfil.src = e.target.result;
                    uploadedImageBase64 = e.target.result;
                    exibirNotificacao('Foto carregada. Clique em Salvar Alterações para confirmar.', 'alerta');
                }
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }

    const logoutLink = document.querySelector('.logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
});