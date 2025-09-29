// Elementos do DOM
const homeElement = document.getElementById('home');
const quizElement = document.getElementById('quiz');
const endElement = document.getElementById('end');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const goHomeBtn = document.getElementById('go-home-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const questionImage = document.getElementById('question-image');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('final-score');
const finalMessage = document.getElementById('final-message');
const explanation = document.getElementById('explanation');
const explanationText = document.getElementById('explanation-text');

// Variáveis do quiz
let currentQuestionIndex = 0;
let score = 0;
let acceptingAnswers = true;

// Perguntas do quiz
const questions = [
    {
        question: "O que significa planejamento reprodutivo?",
        options: [
            { letter: "A", text: "Evitar filhos para sempre" },
            { letter: "B", text: "Escolher se quer ou não ter filhos e quando" },
            { letter: "C", text: "Garantir que todos tenham filhos cedo" },
            { letter: "D", text: "É apenas para casais casados" }
        ],
        answer: 1, // Índice da resposta correta (B)
        image: "images/iakMyCus3ayD.png",
        explanation: "O planejamento reprodutivo é um direito de todas as pessoas e ajuda a tomar decisões conscientes sobre ter ou não filhos e quando tê-los."
    },
    {
        question: "Qual dos métodos a seguir também ajuda a prevenir Infecções Sexualmente Transmissíveis (ISTs)?",
        options: [
            { letter: "A", text: "Anticoncepcional oral" },
            { letter: "B", text: "DIU" },
            { letter: "C", text: "Camisinha (masculina ou feminina)" },
            { letter: "D", text: "Injeção anticoncepcional" }
        ],
        answer: 2, // Índice da resposta correta (C)
        image: "images/sPtQWtBHuQvi.png",
        explanation: "A camisinha é o único método que oferece dupla proteção: contra gravidez não planejada e contra ISTs."
    },
    {
        question: "Verdadeiro ou falso: \"A camisinha pode ser usada junto com outros métodos contraceptivos.\"",
        options: [
            { letter: "A", text: "Verdadeiro" },
            { letter: "B", text: "Falso" }
        ],
        answer: 0, // Índice da resposta correta (Verdadeiro)
        image: "images/BFwqRFXH1UfI.jpg",
        explanation: "O uso combinado de métodos contraceptivos, como camisinha + pílula ou camisinha + DIU, aumenta a proteção contra gravidez não planejada e também contra ISTs."
    },
    {
        question: "Qual desses métodos é considerado definitivo?",
        options: [
            { letter: "A", text: "Pílula do dia seguinte" },
            { letter: "B", text: "Vasectomia" },
            { letter: "C", text: "Anticoncepcional oral" },
            { letter: "D", text: "DIU de cobre" }
        ],
        answer: 1, // Índice da resposta correta (B)
        image: "images/lsPRko1gM45N.jpg",
        explanation: "A vasectomia é um procedimento cirúrgico considerado definitivo, embora em alguns casos possa ser reversível. É importante ter certeza da decisão antes de realizá-lo."
    },
    {
        question: "O que a pílula do dia seguinte NÃO faz?",
        options: [
            { letter: "A", text: "Prevenir gravidez se usada corretamente" },
            { letter: "B", text: "Substituir o uso de anticoncepcionais regulares" },
            { letter: "C", text: "Prevenir ISTs" },
            { letter: "D", text: "Ser mais eficaz quanto antes for tomada" }
        ],
        answer: [1, 2], // Índices das respostas corretas (B e C)
        image: "images/BFwqRFXH1UfI.jpg",
        explanation: "A pílula do dia seguinte é um método de emergência e não deve substituir métodos contraceptivos regulares nem protege contra ISTs."
    },
    {
        question: "Por que é importante conversar sobre planejamento reprodutivo na adolescência?",
        options: [
            { letter: "A", text: "Para aprender a cuidar do corpo e da saúde" },
            { letter: "B", text: "Para prevenir gravidez não planejada" },
            { letter: "C", text: "Para evitar ISTs" },
            { letter: "D", text: "Todas as alternativas" }
        ],
        answer: 3, // Índice da resposta correta (D)
        image: "images/EuGQZve5GMDq.jpg",
        explanation: "Conversar sobre planejamento reprodutivo na adolescência é fundamental para promover decisões conscientes e responsáveis sobre a saúde sexual e reprodutiva, incluindo cuidados com o corpo, prevenção de gravidez não planejada e prevenção de ISTs."
    }
];

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
playAgainBtn.addEventListener('click', restartQuiz);
goHomeBtn.addEventListener('click', goHome);

// Funções
function startQuiz() {
    homeElement.classList.add('hide');
    quizElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    updateProgressBar();
    updateQuestionCounter();
    updateScoreDisplay();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    questionImage.src = question.image;
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = `
            <span class="option-letter">${option.letter}</span>
            <span class="option-text">${option.text}</span>
        `;
        
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(optionElement);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    nextBtn.classList.add('hide');
    explanation.classList.add('hide');
    acceptingAnswers = true;
}

function selectAnswer(e) {
    if (!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedOption = e.currentTarget;
    const selectedAnswer = parseInt(selectedOption.dataset.index);
    const currentQuestion = questions[currentQuestionIndex];
    
    let isCorrect = false;
    
    // Verificar se a resposta está correta
    if (Array.isArray(currentQuestion.answer)) {
        // Múltiplas respostas corretas (pergunta 5)
        if (currentQuestion.answer.includes(selectedAnswer)) {
            isCorrect = true;
        }
    } else {
        // Uma única resposta correta
        if (selectedAnswer === currentQuestion.answer) {
            isCorrect = true;
        }
    }
    
    // Marcar a opção selecionada como correta ou incorreta
    if (isCorrect) {
        selectedOption.classList.add('correct');
        incrementScore();
    } else {
        selectedOption.classList.add('incorrect');
        
        // Destacar a(s) resposta(s) correta(s)
        const options = document.querySelectorAll('.option');
        if (Array.isArray(currentQuestion.answer)) {
            currentQuestion.answer.forEach(answer => {
                options[answer].classList.add('correct');
            });
        } else {
            options[currentQuestion.answer].classList.add('correct');
        }
    }
    
    // Mostrar explicação
    explanationText.innerText = currentQuestion.explanation;
    explanation.classList.remove('hide');
    
    // Mostrar botão de próxima pergunta
    nextBtn.classList.remove('hide');
}

function incrementScore() {
    score++;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.innerText = `Pontuação: ${score}`;
}

function updateQuestionCounter() {
    questionCounter.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizElement.classList.add('hide');
    endElement.classList.remove('hide');
    
    finalScore.innerText = score;
    
    // Definir mensagem final com base na pontuação
    if (score === questions.length) {
        finalMessage.innerText = "Parabéns! Você acertou todas as perguntas! Você tem um excelente conhecimento sobre planejamento reprodutivo.";
    } else if (score >= questions.length * 0.7) {
        finalMessage.innerText = "Muito bom! Você tem um bom conhecimento sobre planejamento reprodutivo.";
    } else if (score >= questions.length * 0.5) {
        finalMessage.innerText = "Bom trabalho! Você tem conhecimento sobre planejamento reprodutivo, mas ainda pode aprender mais.";
    } else {
        finalMessage.innerText = "Você pode melhorar seu conhecimento sobre planejamento reprodutivo. Que tal tentar novamente?";
    }
}

function restartQuiz() {
    endElement.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
}

function goHome() {
    endElement.classList.add('hide');
    homeElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
}
