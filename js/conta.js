const inputFoto = document.getElementById('upload-foto');
const imagemPerfil = document.getElementById('profile-img');
const botaoRemover = document.getElementById('remove-img-btn');

const defaultImgSrc = "https://via.placeholder.com/100/CCCCCC/FFFFFF?text=EU";

inputFoto.addEventListener('change', function(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagemPerfil.src = e.target.result;
        }

        reader.readAsDataURL(event.target.files[0]);
    }
});

botaoRemover.addEventListener('click', function() {
    imagemPerfil.src = defaultImgSrc;
    inputFoto.value = '';
});

// Obtém a referência do botão pelo ID
const salvarBtn = document.getElementById('salvarBtn');

// Adiciona um ouvinte de evento para o clique no botão
salvarBtn.addEventListener('click', () => {
    // 1. Coleta os valores dos campos de entrada
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // 2. Cria um objeto com os dados para salvar
    const dadosParaSalvar = {
        nomeDoUsuario: nome,
        emailDoUsuario: email,
        dataHoraSalvamento: new Date().toLocaleString()
    };

    // 3. Converte o objeto JavaScript para uma string JSON
    const dadosJSON = JSON.stringify(dadosParaSalvar);

    // 4. Armazena a string JSON no localStorage com uma chave
    localStorage.setItem('configuracoesUsuario', dadosJSON);

    // 5. Exibe o pop-up de alerta
    alert('✅ Os valores foram alterados e armazenados com sucesso no localStorage!');

    // Opcional: Para verificar, você pode abrir o console (F12) e digitar
});