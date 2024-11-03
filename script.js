const questions = {
    cycle: [
        {
            question: "In which decade were cycles a common mode of transport in Indian towns?",
            options: ["1970s", "1980s", "1990s", "2000s"],
            answer: "1980s"
        }
    ],
    bindi: [
        {
            question: "What does a red bindi traditionally signify in Hindu culture?",
            options: ["Beauty", "Marital Status", "Wealth", "Education"],
            answer: "Marital Status"
        }
    ],
    attar: [
        {
            question: "Which Indian city is known as the 'Perfume Capital'?",
            options: ["Mumbai", "Kannauj", "Delhi", "Varanasi"],
            answer: "Kannauj"
        }
    ],
    comb: [
        {
            question: "Why is the comb (Kanga) considered sacred in Sikhism?",
            options: [
                "For grooming hair",
                "As a symbol of cleanliness",
                "As a fashion accessory",
                "To ward off evil spirits"
            ],
            answer: "As a symbol of cleanliness"
        }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let selectedObject = '';

function loadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("game-container").style.display = "block";
    }, 2000);
}

function startQuiz(object) {
    selectedObject = object;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score-container").style.display = "none";
    document.getElementById("object-selection").style.display = "none";
    document.getElementById("creators-button").style.display = "none"; // Hide creators button during quiz
    document.getElementById("question-container").style.display = "block";
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions[selectedObject].length) {
        const currentQuestion = questions[selectedObject][currentQuestionIndex];
        document.getElementById("question").innerText = currentQuestion.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => selectAnswer(option);
            optionsContainer.appendChild(button);
        });
        currentQuestionIndex++;
    } else {
        endGame();
    }
}

function selectAnswer(selected) {
    const correctAnswer = questions[selectedObject][currentQuestionIndex - 1].answer;
    if (selected === correctAnswer) {
        score++;
    }
    document.getElementById("next-button").style.display = "block";
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "green"; // Correct answer
        } else {
            button.style.backgroundColor = "red"; // Wrong answer
        }
    });
}

function endGame() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("score").innerText = score;
    document.getElementById("score-container").style.display = "block";
}

function restartGame() {
    startQuiz(selectedObject);
}

function backToSelection() {
    document.getElementById("score-container").style.display = "none";
    document.getElementById("object-selection").style.display = "block";
    document.getElementById("creators-button").style.display = "block"; // Show creators button again
    currentQuestionIndex = 0;
    score = 0; // Reset score
}

function showCreators() {
    document.getElementById("object-selection").style.display = "none";
    document.getElementById("question-container").style.display = "none";
    document.getElementById("score-container").style.display = "none";
    document.getElementById("creators-container").style.display = "block"; // Show creators
}

function backToMain() {
    document.getElementById("creators-container").style.display = "none";
    document.getElementById("object-selection").style.display = "block"; // Back to selection
}

// Start the loading screen
loadingScreen();
