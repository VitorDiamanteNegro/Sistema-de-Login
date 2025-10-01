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
        
        // Inicializar funcionalidades
        this.initializeFeatures();
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

    initializeFeatures() {
        // Busca de flashcards
        const searchFlashcards = document.getElementById('searchFlashcards');
        if (searchFlashcards) {
            searchFlashcards.addEventListener('input', (e) => {
                this.searchFlashcards(e.target.value);
            });
        }

        // Busca de baralhos
        const searchDecks = document.getElementById('searchDecks');
        if (searchDecks) {
            searchDecks.addEventListener('input', (e) => {
                this.searchDecks(e.target.value);
            });
        }

        // Seletor de matéria
        const subjectSelector = document.getElementById('subjectSelector');
        if (subjectSelector) {
            subjectSelector.addEventListener('change', (e) => {
                this.filterFlashcardsBySubject(e.target.value);
            });
        }
    }

    loadInitialData() {
        // Carregar flashcards do localStorage ou criar dados iniciais
        if (!localStorage.getItem('flashstudy_flashcards')) {
            const initialFlashcards = this.getInitialFlashcards();
            localStorage.setItem('flashstudy_flashcards', JSON.stringify(initialFlashcards));
        }

        // Carregar baralhos do localStorage ou criar dados iniciais
        if (!localStorage.getItem('flashstudy_decks')) {
            const initialDecks = this.getInitialDecks();
            localStorage.setItem('flashstudy_decks', JSON.stringify(initialDecks));
        }
    }

    getInitialFlashcards() {
        return [
            // PROGRAMACAO - 10 flashcards
            {
                id: '1',
                question: 'O que é HTML?',
                answer: 'HTML é uma linguagem de marcação utilizada para criar páginas web.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                question: 'Qual a diferença entre let e var em JavaScript?',
                answer: 'let tem escopo de bloco, enquanto var tem escopo de função.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                question: 'O que é CSS?',
                answer: 'CSS é uma linguagem de estilo usada para descrever a apresentação de documentos HTML.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                question: 'O que é uma API?',
                answer: 'API é uma interface que permite comunicação entre diferentes sistemas de software.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '5',
                question: 'O que é Git?',
                answer: 'Git é um sistema de controle de versão distribuído para rastrear mudanças no código.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '6',
                question: 'O que é React?',
                answer: 'React é uma biblioteca JavaScript para construir interfaces de usuário.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '7',
                question: 'O que é um banco de dados relacional?',
                answer: 'É um banco que organiza dados em tabelas com relações entre elas.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '8',
                question: 'O que é POO?',
                answer: 'Programação Orientada a Objetos, paradigma baseado em objetos e classes.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '9',
                question: 'O que é npm?',
                answer: 'Node Package Manager, gerenciador de pacotes do Node.js.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },
            {
                id: '10',
                question: 'O que é um framework?',
                answer: 'É uma estrutura que fornece funcionalidades básicas para desenvolvimento.',
                category: 'programacao',
                subject: 'programacao',
                deckId: '1',
                createdAt: new Date().toISOString()
            },

            // MATEMATICA - 10 flashcards
            {
                id: '11',
                question: 'Qual é a fórmula do Teorema de Pitágoras?',
                answer: 'a² = b² + c², onde a é a hipotenusa e b e c são os catetos.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '12',
                question: 'O que é uma equação do segundo grau?',
                answer: 'É uma equação na forma ax² + bx + c = 0, onde a ≠ 0.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '13',
                question: 'Como calcular a área de um círculo?',
                answer: 'A = π × r², onde r é o raio do círculo.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '14',
                question: 'O que são números primos?',
                answer: 'São números maiores que 1 divisíveis apenas por 1 e por eles mesmos.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '15',
                question: 'Como calcular o perímetro de um quadrado?',
                answer: 'P = 4 × lado',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '16',
                question: 'O que é uma fração?',
                answer: 'É uma representação de uma parte de um todo, na forma a/b.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '17',
                question: 'Como converter decimal em porcentagem?',
                answer: 'Multiplicar por 100 e adicionar o símbolo %.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '18',
                question: 'O que é média aritmética?',
                answer: 'Soma de todos os valores dividida pelo número de valores.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '19',
                question: 'Como calcular juros simples?',
                answer: 'J = C × i × t, onde C=capital, i=taxa, t=tempo.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },
            {
                id: '20',
                question: 'O que é um número inteiro?',
                answer: 'São números sem parte decimal, positivos, negativos ou zero.',
                category: 'matematica',
                subject: 'matematica',
                deckId: '2',
                createdAt: new Date().toISOString()
            },

            // HISTORIA - 10 flashcards
            {
                id: '21',
                question: 'Quando foi proclamada a Independência do Brasil?',
                answer: '7 de setembro de 1822.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '22',
                question: 'Quem foi Dom Pedro I?',
                answer: 'Primeiro imperador do Brasil, proclamou a independência.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '23',
                question: 'O que foi a Inconfidência Mineira?',
                answer: 'Movimento separatista em Minas Gerais em 1789.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '24',
                question: 'Quando ocorreu a Proclamação da República?',
                answer: '15 de novembro de 1889.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '25',
                question: 'Quem foi Tiradentes?',
                answer: 'Joaquim José da Silva Xavier, mártir da Inconfidência Mineira.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '26',
                question: 'O que foi o período do Brasil Colônia?',
                answer: 'De 1500 a 1822, quando Brasil era colônia de Portugal.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '27',
                question: 'Quem foi Zumbi dos Palmares?',
                answer: 'Líder do Quilombo dos Palmares, símbolo da resistência negra.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '28',
                question: 'O que foi a Era Vargas?',
                answer: 'Período de governo de Getúlio Vargas (1930-1945 e 1951-1954).',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '29',
                question: 'Quando terminou a Ditadura Militar no Brasil?',
                answer: '1985, com a eleição de Tancredo Neves.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },
            {
                id: '30',
                question: 'O que foi a Revolução de 1930?',
                answer: 'Movimento que levou Getúlio Vargas ao poder, fim da República Velha.',
                category: 'historia',
                subject: 'historia',
                deckId: '3',
                createdAt: new Date().toISOString()
            },

            // CIENCIAS - 10 flashcards
            {
                id: '31',
                question: 'O que é fotossíntese?',
                answer: 'Processo pelo qual plantas convertem luz solar em energia química.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '32',
                question: 'Quais são os estados da matéria?',
                answer: 'Sólido, líquido, gasoso e plasma.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '33',
                question: 'O que é DNA?',
                answer: 'Ácido desoxirribonucleico, molécula que carrega informação genética.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '34',
                question: 'Como funciona a gravidade?',
                answer: 'Força de atração entre objetos com massa.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '35',
                question: 'O que são células?',
                answer: 'Unidade básica estrutural e funcional dos seres vivos.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '36',
                question: 'O que é a tabela periódica?',
                answer: 'Organização dos elementos químicos baseada em suas propriedades.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '37',
                question: 'O que é evolução?',
                answer: 'Processo de mudança nas espécies ao longo do tempo.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '38',
                question: 'Como funciona o sistema solar?',
                answer: 'Sol no centro, planetas orbitando devido à gravidade.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '39',
                question: 'O que é energia renovável?',
                answer: 'Energia de fontes naturais que se regeneram, como solar e eólica.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },
            {
                id: '40',
                question: 'O que é ecossistema?',
                answer: 'Comunidade de organismos e seu ambiente físico interagindo.',
                category: 'ciencias',
                subject: 'ciencias',
                deckId: '4',
                createdAt: new Date().toISOString()
            },

            // INGLES - 10 flashcards
            {
                id: '41',
                question: 'Como se diz "obrigado" em inglês?',
                answer: 'Thank you',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '42',
                question: 'Qual é a diferença entre "do" e "make"?',
                answer: '"Do" para atividades, "make" para criar ou produzir.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '43',
                question: 'Como conjugar o verbo "to be" no presente?',
                answer: 'I am, you are, he/she/it is, we are, they are.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '44',
                question: 'O que significa "however"?',
                answer: 'Contudo, no entanto.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '45',
                question: 'Como formar o plural em inglês?',
                answer: 'Geralmente adiciona-se "s", mas há exceções como "children".',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '46',
                question: 'Qual é a estrutura básica de uma frase em inglês?',
                answer: 'Sujeito + Verbo + Objeto',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '47',
                question: 'O que são "phrasal verbs"?',
                answer: 'Verbos compostos por verbo + preposição/advérbio com significado próprio.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '48',
                question: 'Como usar "a" e "an"?',
                answer: '"a" antes de consoantes, "an" antes de vogais.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '49',
                question: 'Qual a diferença entre "much" e "many"?',
                answer: '"much" para incontáveis, "many" para contáveis.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            },
            {
                id: '50',
                question: 'Como formar o passado simples?',
                answer: 'Verbos regulares: +ed. Irregulares: forma específica.',
                category: 'ingles',
                subject: 'ingles',
                deckId: '5',
                createdAt: new Date().toISOString()
            }
        ];
    }

    getInitialDecks() {
        return [
            {
                id: '1',
                name: 'Programação Web',
                description: 'Conceitos fundamentais de desenvolvimento web',
                color: '#4361ee',
                cardCount: 10,
                mastered: 0,
                subject: 'programacao',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Matemática Básica',
                description: 'Conceitos fundamentais de matemática',
                color: '#f72585',
                cardCount: 10,
                mastered: 0,
                subject: 'matematica',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                name: 'História do Brasil',
                description: 'Principais eventos da história brasileira',
                color: '#4cc9f0',
                cardCount: 10,
                mastered: 0,
                subject: 'historia',
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                name: 'Ciências Naturais',
                description: 'Biologia, química e física',
                color: '#7209b7',
                cardCount: 10,
                mastered: 0,
                subject: 'ciencias',
                createdAt: new Date().toISOString()
            },
            {
                id: '5',
                name: 'Inglês Básico',
                description: 'Vocabulário e gramática essenciais',
                color: '#ffba08',
                cardCount: 10,
                mastered: 0,
                subject: 'ingles',
                createdAt: new Date().toISOString()
            }
        ];
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
        this.loadFlashcards();
        this.loadDecks();
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

        if (strengthBar) {
            strengthBar.style.width = `${strength * 20}%`;
            strengthBar.style.background = color;
        }
        if (strengthValue) {
            strengthValue.textContent = text;
            strengthValue.style.color = color;
        }
    }

    checkPasswordMatch() {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const checkIcon = document.querySelector('.password-match .fa-check');
        const matchText = document.querySelector('.match-text');

        if (confirmPassword === '') {
            if (checkIcon) checkIcon.style.display = 'none';
            if (matchText) matchText.textContent = '';
            return;
        }

        if (password === confirmPassword) {
            if (checkIcon) checkIcon.style.display = 'inline';
            if (matchText) {
                matchText.textContent = 'Senhas coincidem';
                matchText.style.color = '#43aa8b';
            }
        } else {
            if (checkIcon) checkIcon.style.display = 'none';
            if (matchText) {
                matchText.textContent = 'Senhas não coincidem';
                matchText.style.color = '#f94144';
            }
        }
    }

    loadFlashcards() {
        const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
        const grid = document.getElementById('flashcardsGrid');
        
        if (!grid) return;
        
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
        
        // Carregar todos os flashcards inicialmente
        this.filterFlashcardsBySubject('todos');
    }

    filterFlashcardsBySubject(subject) {
        const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
        const grid = document.getElementById('flashcardsGrid');
        
        if (!grid) return;
        
        grid.innerHTML = '';
        
        let filteredFlashcards = flashcards;
        if (subject && subject !== 'todos') {
            filteredFlashcards = flashcards.filter(flashcard => flashcard.subject === subject);
        }
        
        if (filteredFlashcards.length === 0) {
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
        
        filteredFlashcards.forEach(flashcard => {
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

    searchFlashcards(query) {
        const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
        const grid = document.getElementById('flashcardsGrid');
        const subjectSelector = document.getElementById('subjectSelector');
        const selectedSubject = subjectSelector ? subjectSelector.value : 'todos';
        
        if (!grid) return;
        
        grid.innerHTML = '';
        
        let filteredFlashcards = flashcards.filter(flashcard => 
            flashcard.question.toLowerCase().includes(query.toLowerCase()) ||
            flashcard.answer.toLowerCase().includes(query.toLowerCase())
        );
        
        if (selectedSubject && selectedSubject !== 'todos') {
            filteredFlashcards = filteredFlashcards.filter(flashcard => flashcard.subject === selectedSubject);
        }
        
        if (filteredFlashcards.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>Nenhum flashcard encontrado</h3>
                    <p>Tente alterar os termos da busca ou o filtro de matéria.</p>
                </div>
            `;
            return;
        }
        
        filteredFlashcards.forEach(flashcard => {
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

    loadDecks() {
        const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
        const grid = document.getElementById('decksGrid');
        
        if (!grid) return;
        
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

    searchDecks(query) {
        const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
        const grid = document.getElementById('decksGrid');
        
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredDecks = decks.filter(deck => 
            deck.name.toLowerCase().includes(query.toLowerCase()) ||
            deck.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredDecks.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h3>Nenhum baralho encontrado</h3>
                    <p>Tente alterar os termos da busca.</p>
                </div>
            `;
            return;
        }
        
        filteredDecks.forEach(deck => {
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
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
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
        
        // Carregar dados específicos da seção
        if (sectionId === 'flashcards' && authSystem.currentUser) {
            authSystem.loadFlashcards();
        } else if (sectionId === 'decks' && authSystem.currentUser) {
            authSystem.loadDecks();
        }
    }
}

// Sistema de Flashcards
function showCreateFlashcardForm() {
    document.getElementById('createFlashcardForm').style.display = 'block';
}

function hideCreateFlashcardForm() {
    document.getElementById('createFlashcardForm').style.display = 'none';
    // Restaurar comportamento padrão do botão
    const createBtn = document.querySelector('#createFlashcardForm .btn-primary');
    if (createBtn) {
        createBtn.textContent = 'Criar Flashcard';
        createBtn.onclick = addNewFlashcard;
    }
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
        subject: category,
        deckId: null,
        createdAt: new Date().toISOString()
    };
    
    flashcards.push(newFlashcard);
    localStorage.setItem('flashstudy_flashcards', JSON.stringify(flashcards));
    
    hideCreateFlashcardForm();
    authSystem.loadFlashcards();
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
        
        // Configurar botões de ação
        const editBtn = document.getElementById('editFlashcardBtn');
        const deleteBtn = document.getElementById('deleteFlashcardBtn');
        
        if (editBtn) {
            editBtn.onclick = () => editFlashcard(flashcardId);
        }
        if (deleteBtn) {
            deleteBtn.onclick = () => deleteFlashcard(flashcardId);
        }
    }
}

function closeFlashcardViewer() {
    document.getElementById('flashcardViewer').style.display = 'none';
    document.getElementById('flashcardsGrid').style.display = 'grid';
}

function flipLargeCard(card) {
    card.classList.toggle('flipped');
}

function editFlashcard(flashcardId) {
    const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
    const flashcard = flashcards.find(f => f.id === flashcardId);
    
    if (flashcard) {
        // Preencher formulário com dados existentes
        document.getElementById('flashcardQuestion').value = flashcard.question;
        document.getElementById('flashcardAnswer').value = flashcard.answer;
        document.getElementById('flashcardCategory').value = flashcard.category;
        
        // Mostrar formulário
        showCreateFlashcardForm();
        
        // Alterar comportamento do botão para atualizar
        const createBtn = document.querySelector('#createFlashcardForm .btn-primary');
        if (createBtn) {
            createBtn.textContent = 'Atualizar Flashcard';
            createBtn.onclick = () => updateFlashcard(flashcardId);
        }
        
        closeFlashcardViewer();
    }
}

function updateFlashcard(flashcardId) {
    const question = document.getElementById('flashcardQuestion').value;
    const answer = document.getElementById('flashcardAnswer').value;
    const category = document.getElementById('flashcardCategory').value;
    
    if (!question || !answer || !category) {
        authSystem.showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
    const flashcardIndex = flashcards.findIndex(f => f.id === flashcardId);
    
    if (flashcardIndex !== -1) {
        flashcards[flashcardIndex] = {
            ...flashcards[flashcardIndex],
            question,
            answer,
            category,
            subject: category
        };
        
        localStorage.setItem('flashstudy_flashcards', JSON.stringify(flashcards));
        hideCreateFlashcardForm();
        authSystem.loadFlashcards();
        authSystem.showNotification('Flashcard atualizado com sucesso!', 'success');
    }
}

function deleteFlashcard(flashcardId) {
    if (confirm('Tem certeza que deseja excluir este flashcard?')) {
        const flashcards = JSON.parse(localStorage.getItem('flashstudy_flashcards')) || [];
        const updatedFlashcards = flashcards.filter(f => f.id !== flashcardId);
        
        localStorage.setItem('flashstudy_flashcards', JSON.stringify(updatedFlashcards));
        closeFlashcardViewer();
        authSystem.loadFlashcards();
        authSystem.showNotification('Flashcard excluído com sucesso!', 'success');
    }
}

// Sistema de Baralhos
function showCreateDeckForm() {
    document.getElementById('createDeckForm').style.display = 'block';
}

function hideCreateDeckForm() {
    document.getElementById('createDeckForm').style.display = 'none';
    // Restaurar comportamento padrão do botão
    const createBtn = document.querySelector('#createDeckForm .btn-primary');
    if (createBtn) {
        createBtn.textContent = 'Criar Baralho';
        createBtn.onclick = addNewDeck;
    }
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
        subject: 'geral',
        createdAt: new Date().toISOString()
    };
    
    decks.push(newDeck);
    localStorage.setItem('flashstudy_decks', JSON.stringify(decks));
    
    hideCreateDeckForm();
    authSystem.loadDecks();
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

function editDeck(deckId) {
    const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
    const deck = decks.find(d => d.id === deckId);
    
    if (deck) {
        // Preencher formulário com dados existentes
        document.getElementById('deckName').value = deck.name;
        document.getElementById('deckDescription').value = deck.description;
        
        // Selecionar cor correta
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === deck.color) {
                option.classList.add('active');
            }
        });
        
        // Mostrar formulário
        showCreateDeckForm();
        
        // Alterar comportamento do botão para atualizar
        const createBtn = document.querySelector('#createDeckForm .btn-primary');
        if (createBtn) {
            createBtn.textContent = 'Atualizar Baralho';
            createBtn.onclick = () => updateDeck(deckId);
        }
    }
}

function updateDeck(deckId) {
    const name = document.getElementById('deckName').value;
    const description = document.getElementById('deckDescription').value;
    const color = document.querySelector('.color-option.active')?.getAttribute('data-color') || '#4361ee';
    
    if (!name) {
        authSystem.showNotification('Por favor, informe o nome do baralho', 'error');
        return;
    }
    
    const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
    const deckIndex = decks.findIndex(d => d.id === deckId);
    
    if (deckIndex !== -1) {
        decks[deckIndex] = {
            ...decks[deckIndex],
            name,
            description,
            color
        };
        
        localStorage.setItem('flashstudy_decks', JSON.stringify(decks));
        hideCreateDeckForm();
        authSystem.loadDecks();
        authSystem.showNotification('Baralho atualizado com sucesso!', 'success');
    }
}

function deleteDeck(deckId) {
    if (confirm('Tem certeza que deseja excluir este baralho?')) {
        const decks = JSON.parse(localStorage.getItem('flashstudy_decks')) || [];
        const updatedDecks = decks.filter(d => d.id !== deckId);
        
        localStorage.setItem('flashstudy_decks', JSON.stringify(updatedDecks));
        authSystem.loadDecks();
        authSystem.showNotification('Baralho excluído com sucesso!', 'success');
    }
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
    
    if (userInfo && !userInfo.contains(e.target) && dropdown.classList.contains('show')) {
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
const notificationClose = document.querySelector('.notification-close');
if (notificationClose) {
    notificationClose.addEventListener('click', () => {
        document.getElementById('notification').classList.add('hidden');
    });
}

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        authSystem.closeModal();
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
});

// Botões do header
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        authSystem.openModal('login');
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        authSystem.openModal('signup');
    });
}

// Inicializar sistema
const authSystem = new AuthSystem();
setupNavigation();

// Carregar dados iniciais se o usuário estiver logado
if (authSystem.currentUser) {
    authSystem.loadUserData();
}