function iniciarLogin() {
    window.location.href = "dash.html"; 
    
    console.log("Login iniciado e redirecionando...");
}

function validarELogar(event) {
    event.preventDefault(); 

    const form = document.getElementById('login-form');

    if (form.checkValidity()) {
        iniciarLogin();
    } else {
        console.log("Por favor, preencha todos os campos obrigatórios.");
        
        form.reportValidity(); 
    }
    
    return false;
}