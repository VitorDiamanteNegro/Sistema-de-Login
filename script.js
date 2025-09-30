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
                // MATEMÁTICA (12 flashcards)
                {
                    id: 'math1',
                    question: 'Qual é a fórmula do Teorema de Pitágoras?',
                    answer: 'a² = b² + c², onde a é a hipotenusa e b e c são os catetos de um triângulo retângulo.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math2',
                    question: 'O que é uma equação do segundo grau?',
                    answer: 'É uma equação polinomial de grau 2, na forma ax² + bx + c = 0, onde a, b e c são coeficientes reais e a ≠ 0.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math3',
                    question: 'Como se calcula a área de um círculo?',
                    answer: 'A = π × r², onde π (pi) é aproximadamente 3.14159 e r é o raio do círculo.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math4',
                    question: 'O que são números primos?',
                    answer: 'São números naturais maiores que 1 que possuem apenas dois divisores: 1 e ele mesmo. Exemplos: 2, 3, 5, 7, 11, 13...',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math5',
                    question: 'Qual é a fórmula da soma dos ângulos internos de um polígono?',
                    answer: 'S = (n - 2) × 180°, onde n é o número de lados do polígono.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math6',
                    question: 'O que é o MMC (Mínimo Múltiplo Comum)?',
                    answer: 'É o menor número que é múltiplo comum de dois ou mais números.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math7',
                    question: 'Como se calcula o volume de um cubo?',
                    answer: 'V = a³, onde a é o comprimento da aresta do cubo.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math8',
                    question: 'O que é uma função quadrática?',
                    answer: 'É uma função polinomial de grau 2, representada por f(x) = ax² + bx + c, cujo gráfico é uma parábola.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math9',
                    question: 'Qual é a fórmula do logaritmo?',
                    answer: 'logₐb = c significa que aᶜ = b, onde a é a base, b é o logaritmando e c é o logaritmo.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math10',
                    question: 'O que é a razão áurea?',
                    answer: 'É uma constante irracional aproximadamente igual a 1.618, representada pela letra grega φ (phi).',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math11',
                    question: 'Como se calcula a probabilidade de um evento?',
                    answer: 'P(A) = número de casos favoráveis / número de casos possíveis.',
                    category: 'matematica',
                    deckId: '2'
                },
                {
                    id: 'math12',
                    question: 'O que é uma progressão aritmética?',
                    answer: 'É uma sequência numérica onde a diferença entre termos consecutivos é constante, chamada de razão.',
                    category: 'matematica',
                    deckId: '2'
                },

                // CIÊNCIAS (12 flashcards)
                {
                    id: 'science1',
                    question: 'O que é fotossíntese?',
                    answer: 'É o processo pelo qual as plantas convertem luz solar, água e dióxido de carbono em glicose e oxigênio.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science2',
                    question: 'Quais são os estados da matéria?',
                    answer: 'Sólido, líquido, gasoso e plasma. Cada um com características específicas de forma e volume.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science3',
                    question: 'O que é a lei da gravitação universal?',
                    answer: 'Formulação de Newton que descreve a atração gravitacional entre corpos com massa no universo.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science4',
                    question: 'Qual é a diferença entre elementos e compostos?',
                    answer: 'Elementos são substâncias puras formadas por um único tipo de átomo. Compostos são formados por dois ou mais elementos quimicamente combinados.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science5',
                    question: 'O que são células eucarióticas e procarióticas?',
                    answer: 'Eucarióticas possuem núcleo definido e organelas membranosas. Procarióticas não possuem núcleo definido nem organelas membranosas.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science6',
                    question: 'Qual é a função das mitocôndrias?',
                    answer: 'São organelas responsáveis pela produção de energia (ATP) através da respiração celular.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science7',
                    question: 'O que é o DNA?',
                    answer: 'Ácido desoxirribonucleico, molécula que carrega a informação genética em todos os seres vivos.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science8',
                    question: 'Quais são as três leis de Newton?',
                    answer: '1ª: Lei da Inércia; 2ª: F = m × a; 3ª: Ação e reação.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science9',
                    question: 'O que é a tabela periódica?',
                    answer: 'Organização dos elementos químicos baseada em seu número atômico, configuração eletrônica e propriedades periódicas.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science10',
                    question: 'Qual é a diferença entre clima e tempo?',
                    answer: 'Tempo são as condições atmosféricas em um momento específico. Clima é o padrão médio do tempo em uma região por longos períodos.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science11',
                    question: 'O que é evolução biológica?',
                    answer: 'Processo de mudança nas características hereditárias das populações ao longo das gerações.',
                    category: 'ciencias',
                    deckId: '3'
                },
                {
                    id: 'science12',
                    question: 'Quais são os tipos de energia?',
                    answer: 'Cinética, potencial, térmica, elétrica, química, nuclear, luminosa, sonora, entre outras.',
                    category: 'ciencias',
                    deckId: '3'
                },

                // HISTÓRIA (12 flashcards)
                {
                    id: 'history1',
                    question: 'Quando ocorreu a Proclamação da República no Brasil?',
                    answer: '15 de novembro de 1889, marcando o fim do Império e início da República.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history2',
                    question: 'O que foi a Revolução Francesa?',
                    answer: 'Movimento social e político ocorrido na França entre 1789-1799 que derrubou a monarquia absoluta.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history3',
                    question: 'Quem foram os principais líderes da Segunda Guerra Mundial?',
                    answer: 'Aliados: Churchill (UK), Roosevelt/Truman (EUA), Stalin (URSS). Eixo: Hitler (Alemanha), Mussolini (Itália), Hirohito (Japão).',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history4',
                    question: 'O que foi o Iluminismo?',
                    answer: 'Movimento intelectual do século XVIII que defendia a razão, a liberdade e o progresso da humanidade.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history5',
                    question: 'Quando começou e terminou a Primeira Guerra Mundial?',
                    answer: '1914-1918. Conflito global desencadeado pelo assassinato do arquiduque Francisco Ferdinando.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history6',
                    question: 'O que foi a Guerra Fria?',
                    answer: 'Conflito ideológico, político e econômico entre EUA (capitalismo) e URSS (comunismo) de 1947-1991.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history7',
                    question: 'Quem foi Getúlio Vargas?',
                    answer: 'Presidente do Brasil por 15 anos (1930-1945 e 1951-1954), conhecido como "pai dos pobres".',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history8',
                    question: 'O que foi o Renascimento?',
                    answer: 'Movimento cultural e artístico dos séculos XIV-XVI que marcou a transição da Idade Média para a Moderna.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history9',
                    question: 'Quando ocorreu a Abolição da Escravatura no Brasil?',
                    answer: '13 de maio de 1888, com a Lei Áurea assinada pela princesa Isabel.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history10',
                    question: 'O que foi o Imperialismo?',
                    answer: 'Expansão territorial e dominação de nações europeias sobre a África e Ásia no século XIX.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history11',
                    question: 'Quem foram os bandeirantes?',
                    answer: 'Exploradores portugueses e mestiços que expandiram o território brasileiro durante os séculos XVII e XVIII.',
                    category: 'historia',
                    deckId: '4'
                },
                {
                    id: 'history12',
                    question: 'O que foi a Inconfidência Mineira?',
                    answer: 'Movimento separatista ocorrido em Minas Gerais em 1789, liderado por Tiradentes contra o domínio português.',
                    category: 'historia',
                    deckId: '4'
                },

                // INGLÊS (12 flashcards)
                {
                    id: 'english1',
                    question: 'Qual é a diferença entre "there", "their" e "they\'re"?',
                    answer: 'There = lá/ali (lugar); Their = deles/delas (possessivo); They\'re = they are (contração).',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english2',
                    question: 'Como se forma o Present Perfect?',
                    answer: 'Sujeito + have/has + past participle. Ex: I have studied, She has worked.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english3',
                    question: 'Qual é a diferença entre "much" e "many"?',
                    answer: 'Much = usado com substantivos incontáveis; Many = usado com substantivos contáveis.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english4',
                    question: 'O que são "phrasal verbs"?',
                    answer: 'Verbos compostos por um verbo principal + partícula (preposição ou advérbio) que mudam o significado original.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english5',
                    question: 'Como se usa "used to"?',
                    answer: 'Expressa hábitos ou situações no passado que não ocorrem mais no presente.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english6',
                    question: 'Qual é a diferença entre "say" e "tell"?',
                    answer: 'Say = dizer algo (não requer objeto indireto); Tell = contar/dizer a alguém (requer objeto indireto).',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english7',
                    question: 'O que são "false friends"?',
                    answer: 'Palavras que se parecem com palavras em português mas têm significados diferentes. Ex: "actually" = na verdade, não "atualmente".',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english8',
                    question: 'Como se forma o Past Continuous?',
                    answer: 'Sujeito + was/were + verbo + -ing. Ex: I was studying when she called.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english9',
                    question: 'Qual é a diferença entre "make" e "do"?',
                    answer: 'Make = criar/produzir algo; Do = realizar/executar uma ação.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english10',
                    question: 'O que são "modal verbs"?',
                    answer: 'Verbos auxiliares que expressam possibilidade, obrigação, permissão ou capacidade. Ex: can, could, may, might, must, should.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english11',
                    question: 'Como se usa o Second Conditional?',
                    answer: 'If + past simple, would + base form. Usado para situações hipotéticas no presente/futuro.',
                    category: 'ingles',
                    deckId: '5'
                },
                {
                    id: 'english12',
                    question: 'Qual é a diferença entre "a" e "an"?',
                    answer: 'A = antes de sons consonantais; An = antes de sons vocálicos. Ex: a university, an hour.',
                    category: 'ingles',
                    deckId: '5'
                },

                // PROGRAMAÇÃO (12 flashcards)
                {
                    id: 'prog1',
                    question: 'O que é HTML?',
                    answer: 'HTML é uma linguagem de marcação utilizada para criar páginas web. Ela define a estrutura e o conteúdo de um site.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog2',
                    question: 'Qual é a diferença entre let, var e const em JavaScript?',
                    answer: 'var: escopo de função, pode ser redeclarada; let: escopo de bloco, não pode ser redeclarada; const: escopo de bloco, não pode ser reatribuída.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog3',
                    question: 'O que é CSS?',
                    answer: 'CSS é uma linguagem de estilo usada para descrever a apresentação de documentos HTML, incluindo cores, layout e fontes.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog4',
                    question: 'O que é um algoritmo?',
                    answer: 'É uma sequência finita de instruções bem definidas para resolver um problema ou executar uma tarefa.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog5',
                    question: 'Qual é a diferença entre front-end e back-end?',
                    answer: 'Front-end: parte visual que interage com o usuário; Back-end: lógica do servidor e banco de dados.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog6',
                    question: 'O que é Git?',
                    answer: 'Sistema de controle de versão distribuído usado para rastrear mudanças no código fonte durante o desenvolvimento de software.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog7',
                    question: 'O que é uma API?',
                    answer: 'Interface de Programação de Aplicações - conjunto de regras que permite que diferentes softwares se comuniquem entre si.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog8',
                    question: 'O que é SQL?',
                    answer: 'Structured Query Language - linguagem padrão para gerenciar e manipular bancos de dados relacionais.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog9',
                    question: 'O que é um framework?',
                    answer: 'Conjunto de ferramentas e bibliotecas que fornece uma estrutura para desenvolver aplicações de software.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog10',
                    question: 'O que é programação orientada a objetos?',
                    answer: 'Paradigma de programação baseado no conceito de "objetos", que podem conter dados e código.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog11',
                    question: 'O que é responsive design?',
                    answer: 'Abordagem de design web que faz sites se adaptarem a diferentes tamanhos de tela e dispositivos.',
                    category: 'programacao',
                    deckId: '1'
                },
                {
                    id: 'prog12',
                    question: 'O que é debugging?',
                    answer: 'Processo de encontrar e corrigir erros (bugs) em um programa de computador.',
                    category: 'programacao',
                    deckId: '1'
                }
            ];
            localStorage.setItem('flashstudy_flashcards', JSON.stringify(initialFlashcards));
        }

        if (!localStorage.getItem('flashstudy_decks')) {
            const initialDecks = [
                {
                    id: '1',
                    name: 'Programação Web',
                    description: 'Conceitos fundamentais de desenvolvimento web e programação',
                    color: '#4361ee',
                    cardCount: 12,
                    mastered: 0
                },
                {
                    id: '2',
                    name: 'Matemática',
                    description: 'Conceitos matemáticos fundamentais e avançados',
                    color: '#f72585',
                    cardCount: 12,
                    mastered: 0
                },
                {
                    id: '3',
                    name: 'Ciências',
                    description: 'Biologia, física, química e ciências naturais',
                    color: '#4cc9f0',
                    cardCount: 12,
                    mastered: 0
                },
                {
                    id: '4',
                    name: 'História',
                    description: 'História mundial e do Brasil',
                    color: '#7209b7',
                    cardCount: 12,
                    mastered: 0
                },
                {
                    id: '5',
                    name: 'Inglês',
                    description: 'Gramática, vocabulário e expressões em inglês',
                    color: '#ffba08',
                    cardCount: 12,
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
        `;O que é HTML?
Linguagem de marcação web

Teorema de Pitágoras
a² = b² + c²


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