function iniciarRegistro() {
    window.location.href = "login.html"; 
    
    console.log("Cadastro iniciado e redirecionando...");
}

function validarERegistrar(event) {
    event.preventDefault(); 

    const form = document.getElementById('login-form');

    if (form.checkValidity()) {
        iniciarRegistro();
    } else {
        console.log("Por favor, preencha todos os campos obrigatórios.");
        
        form.reportValidity(); 
    }
    
    return false;
}