document.addEventListener('DOMContentLoaded', function() {
    // Alternar entre as abas de login e cadastro
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Ativar a aba clicada
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar o formulário correspondente
            forms.forEach(form => {
                if (form.id === tabName + 'Form') {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
            
            // Limpar alertas ao trocar de aba
            document.getElementById('loginAlert').style.display = 'none';
            document.getElementById('cadastroAlert').style.display = 'none';
        });
    });
    
    // Manipular o formulário de login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const alert = document.getElementById('loginAlert');
        
        // Verificar se o usuário existe no localStorage
        const users = JSON.parse(localStorage.getItem('users')) || {};
        
        if (users[username] && users[username] === password) {
            showAlert(alert, 'Login realizado com sucesso!', 'success');
            
            // Limpar o formulário
            this.reset();
            
            // Redirecionar após um breve delay
            setTimeout(() => {
                window.location.href = 'pagina-principal.html';
            }, 1500);
        } else {
            showAlert(alert, 'Usuário ou senha incorretos!', 'error');
        }
    });
    
    // Manipular o formulário de cadastro
    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('cadastroUsername').value;
        const password = document.getElementById('cadastroPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const alert = document.getElementById('cadastroAlert');
        
        // Validar se as senhas coincidem
        if (password !== confirmPassword) {
            showAlert(alert, 'As senhas não coincidem!', 'error');
            return;
        }
        
        // Validar comprimento da senha
        if (password.length < 8) {
            showAlert(alert, 'A senha deve ter pelo menos 8 caracteres!', 'error');
            return;
        }
        
        // Obter usuários existentes do localStorage
        const users = JSON.parse(localStorage.getItem('users')) || {};
        
        // Verificar se o usuário já existe
        if (users[username]) {
            showAlert(alert, 'Este usuário já existe!', 'error');
            return;
        }
        
        // Adicionar novo usuário
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        
        showAlert(alert, 'Cadastro realizado com sucesso! Faça login para continuar.', 'success');
        
        // Limpar o formulário
        this.reset();
        
        // Mudar para a aba de login após cadastro bem-sucedido
        setTimeout(() => {
            document.querySelector('.tab[data-tab="login"]').click();
        }, 2000);
    });
    
    // Função para exibir alertas
    function showAlert(element, message, type) {
        element.textContent = message;
        element.className = 'alert ' + type;
        element.style.display = 'block';
        
        // Rolagem suave para o alerta
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Adicionar usuário padrão (seu nome e data de aniversário)
    const defaultUsername = "SeuNome"; // Substitua pelo seu nome
    const defaultPassword = "01011990"; // Substitua pela sua data de nascimento (DDMMAAAA)
    
    // Verificar se já existem usuários no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Adicionar usuário padrão se não existir
    if (!users[defaultUsername]) {
        users[defaultUsername] = defaultPassword;
        localStorage.setItem('users', JSON.stringify(users));
    }
});