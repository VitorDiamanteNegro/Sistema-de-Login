// script.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Verificar se o usuário é o seu nome e a senha é sua data de aniversário
    // Substitua "SeuNome" pelo seu nome real e "01011990" pela sua data de nascimento no formato DDMMAAAA
    if (username === "SeuNome" && password === "01011990") {
        showAlert('Login realizado com sucesso!', 'success');
        // Redirecionar para a página principal após login bem-sucedido
        setTimeout(() => {
            window.location.href = 'pagina-principal.html';
        }, 1500);
    } else {
        showAlert('Usuário ou senha incorretos!', 'error');
    }
});

function showAlert(message, type) {
    // Remover alertas anteriores
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Criar elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    
    // Estilizar o alerta
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.padding = '10px 20px';
    alert.style.borderRadius = '5px';
    alert.style.color = 'white';
    alert.style.fontWeight = '500';
    alert.style.zIndex = '1000';
    alert.style.opacity = '0';
    alert.style.transition = 'opacity 0.3s';
    
    if (type === 'success') {
        alert.style.backgroundColor = '#4caf50';
    } else {
        alert.style.backgroundColor = '#f44336';
    }
    
    // Adicionar alerta à página
    document.body.appendChild(alert);
    
    // Animação de entrada
    setTimeout(() => {
        alert.style.opacity = '1';
    }, 10);
    
    // Remover alerta após 3 segundos
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}
