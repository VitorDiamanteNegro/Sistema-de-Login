// Sistema de Autenticação
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('flashstudy_users')) || [];
        this.init();
    }

    init() {
        // Verificar se há usuário logado
        const savedUser = localStorage.getItem('flashstudy_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Carregar dados iniciais
        this.loadInitialData();
    }

    setupEventListeners() {
        // Formulário de Login
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Formulário de Cadastro
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Força da senha
        document.getElementById('signupPassword').addEventListener('input', (e) => {
            this.updatePasswordStrength(e.target.value);
        });

        // Verificação de confirmação de senha
        document.getElementById('signupConfirmPassword').addEventListener('input', (e) => {
            this.checkPasswordMatch();
        });

        // Botões do hero
        document.getElementById('heroLoginBtn').addEventListener('click', () => {
            this.openModal('login');
        });

        document.getElementById('heroSignupBtn').addEventListener('click', () => {
            this.openModal('signup');
        });
    }

    loadInitialData() {
        // Carregar flashcards e baralhos do localStorage
        if (!localStorage.getItem('flashstudy_flashcards')) {
            const initialFlashcards = [
                {
                    id: '1',
                    question: 'O que é HTML?',
                    answer: 'HTML é uma linguagem de marcação utilizada para criar páginas web.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: '2',
                    question: 'Qual é a fórmula do Teorema de Pitágoras?',
                    answer: 'a² = b² + c², onde a é a hipotenusa e b e c são os catetos.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: '3',
                    question: 'O que é fotossíntese?',
                    answer: 'É o processo pelo qual as plantas convertem luz solar em energia química.',
                    category: 'ciencias',
                    deckId: '3'
                }
            ];
            localStorage.setItem('flashstudy_flashcards', JSON.stringify(initialFlashcards));
        }

        if (!localStorage.getItem('flashstudy_decks')) {
            const initialDecks = [
                {
                    id: '1',
                    name: 'Programação Web',
                    description: 'Conceitos fundamentais de desenvolvimento web',
                    color: '#4361ee',
                    cardCount: 1,
                    mastered: 0
                },
                {
                    id: '2',
                    name: 'Matemática Básica',
                    description: 'Conceitos fundamentais de matemática',
                    color: '#f72585',
                    cardCount: 1,
                    mastered: 0
                },
                {
                    id: '3',
                    name: 'Ciências Naturais',
                    description: 'Biologia, química e física',
                    color: '#4cc9f0',
                    cardCount: 1,
                    mastered: 0
                }
            ];
            localStorage.setItem('flashstudy_decks', JSON.stringify(initialDecks));
        }
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (this.login(email, password)) {
            this.closeModal();
            this.showNotification('Login realizado com sucesso!', 'success');
        }
    }

    handleSignup() {
        const formData = {
            firstName: document.getElementById('signupFirstName').value,
            lastName: document.getElementById('signupLastName').value,
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value,
            confirmPassword: document.getElementById('signupConfirmPassword').value
        };

        // Validações
        if (!this.validateSignup(formData)) {
            return;
        }

        if (this.signup(formData)) {
            this.closeModal();
            this.showNotification('Conta criada com sucesso!', 'success');
        }
    }

    validateSignup(formData) {
        // Verificar se todos os campos estão preenchidos
        for (let key in formData) {
            if (!formData[key]) {
                this.showNotification('Por favor, preencha todos os campos', 'error');
                return false;
            }
        }

        // Verificar se as senhas coincidem
        if (formData.password !== formData.confirmPassword) {
            this.showNotification('As senhas não coincidem', 'error');
            return false;
        }

        // Verificar força da senha
        if (formData.password.length < 6) {
            this.showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
            return false;
        }

        // Verificar termos
        if (!document.getElementById('acceptTerms').checked) {
            this.showNotification('Você deve aceitar os termos de serviço', 'error');
            return false;
        }

        return true;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('flashstudy_current_user', JSON.stringify(user));
            this.updateUI();
            return true;
        }
        
        this.showNotification('E-mail ou senha incorretos', 'error');
        return false;
    }

    signup(userData) {
        // Verificar se o email já existe
        if (this.users.find(u => u.email === userData.email)) {
            this.showNotification('Este e-mail já está cadastrado', 'error');
            return false;
        }

        // Criar novo usuário
        const newUser = {
            id: Date.now().toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            createdAt: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.firstName + ' ' + userData.lastName)}&background=4361ee&color=fff&size=128`
        };

        this.users.push(newUser);
        localStorage.setItem('flashstudy_users', JSON.stringify(this.users));

        // Logar automaticamente
        this.currentUser = newUser;
        localStorage.setItem('flashstudy_current_user', JSON.stringify(newUser));
        this.updateUI();

        return true;
    }

    loginWithGoogle() {
        // Simulação de login com Google
        const googleUser = {
            id: 'google_' + Date.now(),
            firstName: 'Usuário',
            lastName: 'Google',
            email: 'usuario.google@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80',
            provider: 'google',
            createdAt: new Date().toISOString()
        };

        this.currentUser = googleUser;
        localStorage.setItem('flashstudy_current_user', JSON.stringify(googleUser));
        this.updateUI();
        this.closeModal();
        this.showNotification('Login com Google realizado com sucesso!', 'success');
    }

    signupWithGoogle() {
        this.loginWithGoogle();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('flashstudy_current_user');
        this.updateUI();
        this.showNotification('Logout realizado com sucesso', 'info');
    }

    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const authStatus = document.getElementById('authStatus');
        const userWelcome = document.getElementById('userWelcome');
        const statusMessage = document.getElementById('statusMessage');
        const welcomeName = document.getElementById('welcomeName');
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');

        if (this.currentUser) {
            // Usuário logado
            authButtons.style.display = 'none';
            userMenu.style.display = 'block';
            authStatus.style.display = 'none';
            userWelcome.style.display = 'block';

            welcomeName.textContent = this.currentUser.firstName;
            userName.textContent = this.currentUser.firstName;
            userAvatar.src = this.currentUser.avatar;
            userAvatar.alt = this.currentUser.firstName;

            // Carregar dados do usuário
            this.loadUserData();
        } else {
            // Usuário não logado
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
            authStatus.style.display = 'block';
            userWelcome.style.display = 'none';
        }
    }

    loadUserData() {
        // Carregar flashcards e baralhos
        loadFlashcards();
        loadDecks();
    }

    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-fill');
        const strengthValue = document.querySelector('.strength-value');
        
        let strength = 0;
        let color = '#f94144';
        let text = 'Muito fraca';

        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        switch(strength) {
            case 1:
                color = '#f94144';
                text = 'Fraca';
                break;
            case 2:
                color = '#f8961e';
                text = 'Regular';
                break;
            case 3:
                color = '#f9c74f';
                text = 'Boa';
                break;
            case 4:
                color = '#90be6d';
                text = 'Forte';
                break;
            case 5:
                color = '#43aa8b';
                text = 'Muito forte';
                break;
        }

        strengthBar.style.width = `${strength * 20}%`;
        strengthBar.style.background = color;
        strengthValue.textContent = text;
        strengthValue.style.color = color;
    }

    checkPasswordMatch() {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const checkIcon = document.querySelector('.password-match .fa-check');
        const matchText = document.querySelector('.match-text');

        if (confirmPassword === '') {
            checkIcon.style.display = 'none';
            matchText.textContent = '';
            return;
        }

        if (password === confirmPassword) {
            checkIcon.style.display = 'inline';
            matchText.textContent = 'Senhas coincidem';
            matchText.style.color = '#43aa8b';
        } else {
            checkIcon.style.display = 'none';
            matchText.textContent = 'Senhas não coincidem';
            matchText.style.color = '#f94144';
        }
    }

    openModal(modalType) {
        this.closeModal();
        const modal = document.getElementById(modalType + 'Modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        
        // Limpar formulários
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
        this.updatePasswordStrength('');
        this.checkPasswordMatch();
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationIcon = notification.querySelector('.notification-icon');
        const notificationMessage = notification.querySelector('.notification-message');

        // Configurar ícone baseado no tipo
        notificationIcon.className = 'notification-icon';
        switch(type) {
            case 'success':
                notificationIcon.classList.add('fas', 'fa-check-circle');
                break;
            case 'error':
                notificationIcon.classList.add('fas', 'fa-exclamation-circle');
                break;
            case 'info':
                notificationIcon.classList.add('fas', 'fa-info-circle');
                break;
        }

        notificationMessage.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');

        // Auto-remover após 5 segundos
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 5000);
    }
}

// Sistema de Navegação
function setupNavigation() {
    // Configurar links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Atualizar navegação ativa
            document.querySelectorAll('.nav-link').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Função para mostrar seção
function showSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sistema de Flashcards
function loadFlashcards() {
    const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
    const grid = document.getElementById('flashcardsGrid');
    
    grid.innerHTML = '';
    
    if (flashcards.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-layer-group"></i>
                <h3>Nenhum flashcard encontrado</h3>
                <p>Crie seu primeiro flashcard para começar a estudar!</p>
                <button class="btn btn-primary" onclick="showCreateFlashcardForm()">
                    <i class="fas fa-plus"></i> Criar Primeiro Flashcard
                </button>
            </div>
        `;
        return;
    }
    
    flashcards.forEach(flashcard => {
        const categoryNames = {
            'programacao': 'Programação',
            'matematica': 'Matemática',
            'historia': 'História',
            'ciencias': 'Ciências',
            'ingles': 'Inglês'
        };
        
        const cardElement = document.createElement('div');
        cardElement.className = 'flashcard-item';
        cardElement.innerHTML = `
            <div class="flashcard-category">${categoryNames[flashcard.category] || flashcard.category}</div>
            <div class="flashcard-question">${flashcard.question}</div>
            <div class="flashcard-actions">
                <button class="btn btn-outline btn-sm" onclick="viewFlashcard('${flashcard.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn btn-outline btn-sm" onclick="editFlashcard('${flashcard.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteFlashcard('${flashcard.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        grid.appendChild(cardElement);
    });
}

function showCreateFlashcardForm() {
    document.getElementById('createFlashcardForm').style.display = 'block';
}

function hideCreateFlashcardForm() {
    document.getElementById('createFlashcardForm').style.display = 'none';
}

function addNewFlashcard() {
    const question = document.getElementById('flashcardQuestion').value;
    const answer = document.getElementById('flashcardAnswer').value;
    const category = document.getElementById('flashcardCategory').value;
    
    if (!question || !answer || !category) {
        authSystem.showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
    const newFlashcard = {
        id: Date.now().toString(),
        question,
        answer,
        category,
        deckId: null,
        createdAt: new Date().toISOString()
    };
    
    flashcards.push(newFlashcard);
    localStorage.setItem('flashstudy_flashcards', JSON.stringify(flashcards));
    
    hideCreateFlashcardForm();
    loadFlashcards();
    authSystem.showNotification('Flashcard criado com sucesso!', 'success');
    
    // Limpar formulário
    document.getElementById('flashcardQuestion').value = '';
    document.getElementById('flashcardAnswer').value = '';
    document.getElementById('flashcardCategory').value = '';
}

function viewFlashcard(flashcardId) {
    const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
    const flashcard = flashcards.find(f => f.id === flashcardId);
    
    if (flashcard) {
        const categoryNames = {
            'programacao': 'Programação',
            'matematica': 'Matemática',
            'historia': 'História',
            'ciencias': 'Ciências',
            'ingles': 'Inglês'
        };
        
        document.getElementById('viewerCategory').textContent = categoryNames[flashcard.category] || flashcard.category;
        document.getElementById('viewerQuestion').textContent = flashcard.question;
        document.getElementById('viewerAnswer').textContent = flashcard.answer;
        
        document.getElementById('flashcardsGrid').style.display = 'none';
        document.getElementById('flashcardViewer').style.display = 'block';
    }
}

function closeFlashcardViewer() {
    document.getElementById('flashcardViewer').style.display = 'none';
    document.getElementById('flashcardsGrid').style.display = 'grid';
}

function flipLargeCard(card) {
    card.classList.toggle('flipped');
}

// Sistema de Baralhos
function loadDecks() {
    const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
    const grid = document.getElementById('decksGrid');
    
    grid.innerHTML = '';
    
    if (decks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>Nenhum baralho encontrado</h3>
                <p>Crie seu primeiro baralho para organizar seus flashcards!</p>
                <button class="btn btn-primary" onclick="showCreateDeckForm()">
                    <i class="fas fa-plus"></i> Criar Primeiro Baralho
                </button>
            </div>
        `;
        return;
    }
    
    decks.forEach(deck => {
        const progress = deck.cardCount > 0 ? Math.round((deck.mastered / deck.cardCount) * 100) : 0;
        
        const deckElement = document.createElement('div');
        deckElement.className = 'deck-item';
        deckElement.style.borderLeftColor = deck.color;
        deckElement.innerHTML = `
            <div class="deck-header">
                <div>
                    <div class="deck-title">${deck.name}</div>
                    <div class="deck-description">${deck.description}</div>
                </div>
                <div class="deck-color" style="background: ${deck.color}"></div>
            </div>
            <div class="deck-stats-small">
                <span><i class="fas fa-layer-group"></i> ${deck.cardCount} cards</span>
                <span><i class="fas fa-check-circle"></i> ${progress}% dominado</span>
            </div>
            <div class="deck-actions">
                <button class="btn btn-outline btn-sm" onclick="viewDeck('${deck.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn btn-outline btn-sm" onclick="editDeck('${deck.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteDeck('${deck.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        grid.appendChild(deckElement);
    });
}

function showCreateDeckForm() {
    document.getElementById('createDeckForm').style.display = 'block';
}

function hideCreateDeckForm() {
    document.getElementById('createDeckForm').style.display = 'none';
}

function addNewDeck() {
    const name = document.getElementById('deckName').value;
    const description = document.getElementById('deckDescription').value;
    const color = document.querySelector('.color-option.active')?.getAttribute('data-color') || '#4361ee';
    
    if (!name) {
        authSystem.showNotification('Por favor, informe o nome do baralho', 'error');
        return;
    }
    
    const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
    const newDeck = {
        id: Date.now().toString(),
        name,
        description,
        color,
        cardCount: 0,
        mastered: 0,
        createdAt: new Date().toISOString()
    };
    
    decks.push(newDeck);
    localStorage.setItem('flashstudy_decks', JSON.stringify(decks));
    
    hideCreateDeckForm();
    loadDecks();
    authSystem.showNotification('Baralho criado com sucesso!', 'success');
    
    // Limpar formulário
    document.getElementById('deckName').value = '';
    document.getElementById('deckDescription').value = '';
}

function viewDeck(deckId) {
    const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
    const deck = decks.find(d => d.id === deckId);
    const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
    const deckFlashcards = flashcards.filter(f => f.deckId === deckId);
    
    if (deck) {
        const progress = deck.cardCount > 0 ? Math.round((deck.mastered / deck.cardCount) * 100) : 0;
        
        document.getElementById('deckViewTitle').textContent = deck.name;
        document.getElementById('deckViewDescription').textContent = deck.description;
        document.getElementById('deckTotalCards').textContent = deck.cardCount;
        document.getElementById('deckMasteredCards').textContent = deck.mastered;
        document.getElementById('deckProgress').textContent = progress + '%';
        
        // Listar flashcards do baralho
        const cardsList = document.getElementById('deckCardsList');
        cardsList.innerHTML = '';
        
        if (deckFlashcards.length === 0) {
            cardsList.innerHTML = '<p class="empty-message">Nenhum flashcard neste baralho.</p>';
        } else {
            deckFlashcards.forEach(flashcard => {
                const cardElement = document.createElement('div');
                cardElement.className = 'deck-card-item';
                cardElement.innerHTML = `
                    <strong>${flashcard.question}</strong>
                    <p>${flashcard.answer.substring(0, 100)}...</p>
                `;
                cardsList.appendChild(cardElement);
            });
        }
        
        document.getElementById('decksGrid').style.display = 'none';
        document.getElementById('deckView').style.display = 'block';
    }
}

function closeDeckView() {
    document.getElementById('deckView').style.display = 'none';
    document.getElementById('decksGrid').style.display = 'grid';
}

// Color Picker
document.addEventListener('DOMContentLoaded', function() {
    // Configurar color picker
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Selecionar primeira cor por padrão
    const firstColor = document.querySelector('.color-option');
    if (firstColor) {
        firstColor.classList.add('active');
    }
});

// Funções Globais
function loginWithGoogle() {
    authSystem.loginWithGoogle();
}

function signupWithGoogle() {
    authSystem.signupWithGoogle();
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

function redirectToFlashcards() {
    // Mostrar tela de carregamento
    showRedirectingScreen();
    
    // URL do seu site de flashcards
    const baseUrl = 'https://vitordiamantenegro.github.io/TCC/';
    
    // Redirecionar após 2 segundos (para mostrar a animação)
    setTimeout(() => {
        window.location.href = baseUrl;
    }, 2000);
}

function showRedirectingScreen() {
    const redirectingHTML = `
        <div class="redirecting" id="redirectingScreen">
            <div class="redirecting-spinner"></div>
            <h2>Redirecionando para o FlashStudy</h2>
            <p>Preparando sua experiência de estudo...</p>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', redirectingHTML);
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    const userInfo = document.querySelector('.user-info');
    
    if (!userInfo.contains(e.target) && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});

// Fechar modal ao clicar no X ou fora
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        authSystem.closeModal();
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            authSystem.closeModal();
        }
    });
});

// Alternar entre login e cadastro
document.querySelectorAll('.switch-to-signup').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        authSystem.closeModal();
        authSystem.openModal('signup');
    });
});

document.querySelectorAll('.switch-to-login').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        authSystem.closeModal();
        authSystem.openModal('login');
    });
});

// Fechar notificação
document.querySelector('.notification-close').addEventListener('click', () => {
    document.getElementById('notification').classList.add('hidden');
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        authSystem.closeModal();
        document.getElementById('userDropdown').classList.remove('show');
    }
});

// Botões do header
document.getElementById('loginBtn').addEventListener('click', () => {
    authSystem.openModal('login');
});

document.getElementById('signupBtn').addEventListener('click', () => {
    authSystem.openModal('signup');
});

// Inicializar sistema
const authSystem = new AuthSystem();
setupNavigation();

// Carregar dados iniciais se o usuário estiver logado
if (authSystem.currentUser) {
    authSystem.loadUserData();
}