const questions = {
    cycle: [
        {
            question: "In which decade were cycles a common mode of transport in Indian towns?",
            options: ["1970s", "1980s", "1990s", "2000s"],
            answer: "1980s"
        },
        {
            question: "What type of bicycles were especially popular for daily use in Indian rural areas?",
            options: ["Road bikes", "Mountain bikes", "Gearless cycles", "Electric bikes"],
            answer: "Gearless cycles"
        },
        {
            question: "Which famous Indian bicycle brand was founded in the early 20th century?",
            options: ["Hero", "Atlas", "BSA", "Raleigh"],
            answer: "Atlas"
        }
    ],
    // Other categories...
};

let currentQuestionIndex = 0;
let score = 0;
let selectedObject = '';

// Display loading screen initially
function loadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("game-container").style.display = "block";
    }, 2000);
}

// Start the quiz for a selected object
function startQuiz(object) {
    selectedObject = object;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score-container").style.display = "none";
    document.getElementById("object-selection").style.display = "none";
    document.getElementById("creators-button").style.display = "none"; // Hide creators button during quiz
    document.getElementById("question-container").style.display = "block";
    document.getElementById("next-button").style.display = "none"; // Hide Next button initially
    nextQuestion();
}

// Load the next question or end the quiz
function nextQuestion() {
    // Hide the "Next" button while loading the question
    document.getElementById("next-button").style.display = "none";
    
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
    } else {
        endGame();
    }
}

// Handle the answer selection and provide feedback
function selectAnswer(selected) {
    const correctAnswer = questions[selectedObject][currentQuestionIndex].answer;
    if (selected === correctAnswer) {
        score++;
    }
    
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "green"; // Highlight correct answer
        } else {
            button.style.backgroundColor = "red"; // Highlight incorrect answers
        }
    });
    
    // Show the "Next" button after selecting an answer
    document.getElementById("next-button").style.display = "block";
    currentQuestionIndex++;
}

// End the game and show the score
function endGame() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("score").innerText = score;
    document.getElementById("score-container").style.display = "block";
}

// Restart the quiz for the selected object
function restartGame() {
    startQuiz(selectedObject);
}

// Navigate back to the selection menu
function backToSelection() {
    document.getElementById("score-container").style.display = "none";
    document.getElementById("object-selection").style.display = "block";
    document.getElementById("creators-button").style.display = "block"; // Show creators button again
    currentQuestionIndex = 0;
    score = 0; // Reset score
}

// Show the creators information
function showCreators() {
    document.getElementById("object-selection").style.display = "none";
    document.getElementById("creators-container").style.display = "block";
}

// Return to the main selection menu
function backToMain() {
    document.getElementById("creators-container").style.display = "none";
    document.getElementById("object-selection").style.display = "block";
}

// Start the loading screen initially
loadingScreen();
