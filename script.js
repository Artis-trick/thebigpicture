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
    bindi: [
        {
            question: "What does a red bindi traditionally signify in Hindu culture?",
            options: ["Beauty", "Marital Status", "Wealth", "Education"],
            answer: "Marital Status"
        },
        {
            question: "What is the main ingredient in traditional kumkum powder used for bindis?",
            options: ["Turmeric", "Henna", "Sandalwood", "Limestone"],
            answer: "Turmeric"
        },
        {
            question: "Which Bollywood actress popularized the larger, decorative bindi in the 1990s?",
            options: ["Madhuri Dixit", "Aishwarya Rai", "Sridevi", "Kajol"],
            answer: "Madhuri Dixit"
        }
    ],
    attar: [
        {
            question: "Which Indian city is known as the 'Perfume Capital'?",
            options: ["Mumbai", "Kannauj", "Delhi", "Varanasi"],
            answer: "Kannauj"
        },
        {
            question: "What is the primary base ingredient used in traditional Indian attars?",
            options: ["Water", "Coconut oil", "Sandalwood oil", "Olive oil"],
            answer: "Sandalwood oil"
        },
        {
            question: "Attar has been used in Indian culture for how many years?",
            options: ["1,000", "5,000", "10,000", "60,000"],
            answer: "60,000"
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
        },
        {
            question: "Which traditional Indian material is commonly used to make combs?",
            options: ["Ivory", "Wood", "Gold", "Clay"],
            answer: "Wood"
        },
        {
            question: "In many Indian households, it’s considered unlucky to do what with a comb at night?",
            options: ["Comb hair", "Wash it", "Place it on a table", "Lend it to others"],
            answer: "Comb hair"
        }
    ]
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
    nextQuestion();
}

// Load the next question or end the quiz
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

// Handle the answer selection and provide feedback
function selectAnswer(selected) {
    const correctAnswer = questions[selectedObject][currentQuestionIndex - 1].answer;
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
