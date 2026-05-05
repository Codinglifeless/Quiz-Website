const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyperlinks and Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language"],
        correct: 1
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        options: ["<a>url</a>", "<a href='url'>Text</a>", "<a url='url'>Text</a>"],
        correct: 1
    },
    {
        question: "Which tag is used to insert an image?",
        options: ["<image>", "<picture>", "<img>"],
        correct: 2
    },
    {
        question: "What is the smallest header in HTML by default?",
        options: ["<h6>", "<h1>", "<header>"],
        correct: 0
    },
    {
        question: "Which tag is used to create a numbered list?",
        options: ["<ul>", "<ol>", "<li>"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let selectedAnswer = -1;
let gameActive = false;

function startQuiz() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    gameActive = true;
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('question').textContent = q.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });

    selectedAnswer = -1;
    document.getElementById('next-btn').disabled = true;
    timeLeft = 15;
    updateTimerDisplay();
    updateProgress();

    // Start timer
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function selectAnswer(index) {
    if (!gameActive) return;

    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Select new answer
    document.querySelectorAll('.option')[index].classList.add('selected');
    selectedAnswer = index;
    document.getElementById('next-btn').disabled = false;
}

function updateTimer() {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        nextQuestion();
    }
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('timer').style.color =
        timeLeft <= 5 ? '#e53e3e' : timeLeft <= 10 ? '#ed8936' : '#38a169';
}

function nextQuestion() {
    clearInterval(timerInterval);

    // Check answer
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function endQuiz() {
    gameActive = false;
    clearInterval(timerInterval);

    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('score-section').style.display = 'block';

    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('final-score').textContent = `${score}/${quizData.length}`;

    let message = '';
    if (percentage >= 90) message = '👑 Outstanding! You\'re a genius!';
    else if (percentage >= 70) message = '🎉 Excellent work!';
    else if (percentage >= 50) message = '👍 Good job!';
    else if (percentage >= 30) message = '📚 Keep studying!';
    else message = '💪 Try again! You can do better!';

    document.getElementById('score-message').textContent = message;
}

function restartQuiz() {
    document.getElementById('score-section').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
}

function homePage() {
    window.location.href = "/index.html";
}