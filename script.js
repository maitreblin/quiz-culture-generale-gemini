// Questions de culture générale variées
const questions = [
    {
        question: "Quel est le plus grand océan du monde ?",
        answers: ["Océan Atlantique", "Océan Indien", "Océan Pacifique", "Océan Arctique"],
        correct: 2,
        explanation: "L'océan Pacifique est le plus grand océan du monde, couvrant environ 46% de la surface océanique de la planète."
    },
    {
        question: "Qui a peint la Mona Lisa ?",
        answers: ["Vincent van Gogh", "Léonard de Vinci", "Michel-Ange", "Pablo Picasso"],
        correct: 1,
        explanation: "La Mona Lisa a été peinte par Léonard de Vinci entre 1503 et 1519. C'est l'une des œuvres d'art les plus célèbres au monde."
    },
    {
        question: "Quelle est la capitale de l'Australie ?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
        explanation: "Canberra est la capitale de l'Australie, choisie comme compromis entre Sydney et Melbourne."
    },
    {
        question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
        answers: ["1967", "1969", "1971", "1973"],
        correct: 1,
        explanation: "Neil Armstrong a marché sur la Lune le 20 juillet 1969 lors de la mission Apollo 11."
    },
    {
        question: "Quel est l'élément chimique le plus abondant dans l'univers ?",
        answers: ["Oxygène", "Carbone", "Hydrogène", "Azote"],
        correct: 2,
        explanation: "L'hydrogène est l'élément le plus abondant dans l'univers, représentant environ 75% de la masse baryonique."
    },
    {
        question: "Quel pays a remporté le plus de Coupes du Monde de football ?",
        answers: ["Brésil", "Allemagne", "Argentine", "Italie"],
        correct: 0,
        explanation: "Le Brésil a remporté 5 Coupes du Monde de football (1958, 1962, 1970, 1994, 2002), plus que tout autre pays."
    },
    {
        question: "Quel est le plus long fleuve du monde ?",
        answers: ["Amazone", "Nil", "Yangtsé", "Mississippi"],
        correct: 1,
        explanation: "Le Nil est généralement considéré comme le plus long fleuve du monde avec environ 6,650 km."
    },
    {
        question: "Quel est le plus grand pays du monde par sa superficie ?",
        answers: ["Canada", "Chine", "États-Unis", "Russie"],
        correct: 3,
        explanation: "La Russie est le plus grand pays du monde avec une superficie d'environ 17,1 millions de km²."
    },
    {
        question: "Quel scientifique a développé la théorie de la relativité ?",
        answers: ["Isaac Newton", "Galilée", "Albert Einstein", "Stephen Hawking"],
        correct: 2,
        explanation: "Albert Einstein a développé la théorie de la relativité restreinte en 1905 et la relativité générale en 1915."
    },
    {
        question: "Quel est le plus haut sommet du monde ?",
        answers: ["K2", "Kangchenjunga", "Mont Everest", "Lhotse"],
        correct: 2,
        explanation: "Le Mont Everest est le plus haut sommet du monde avec une altitude de 8,848 mètres."
    }
];

// Variables d'état du quiz
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let selectedAnswer = null;
let answered = false;

// Éléments DOM
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const resultsContainer = document.getElementById('resultsContainer');
const scoreText = document.getElementById('scoreText');
const scorePercentage = document.getElementById('scorePercentage');
const resultsDetails = document.getElementById('resultsDetails');
const restartBtn = document.getElementById('restartBtn');

// Initialisation du quiz
function initQuiz() {
    showQuestion(currentQuestion);
    updateProgress();
}

// Afficher une question
function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionText.textContent = question.question;
    
    // Vider le conteneur des réponses
    answersContainer.innerHTML = '';
    
    // Créer les boutons de réponse
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.textContent = answer;
        answerBtn.addEventListener('click', () => selectAnswer(index));
        
        // Si la question a déjà été répondue, montrer la réponse
        if (userAnswers[questionIndex] !== undefined) {
            answerBtn.disabled = true;
            if (index === question.correct) {
                answerBtn.classList.add('correct');
            } else if (index === userAnswers[questionIndex]) {
                answerBtn.classList.add('incorrect');
            }
        }
        
        answersContainer.appendChild(answerBtn);
    });
    
    // Mettre à jour les boutons de navigation
    updateNavigationButtons();
    answered = userAnswers[questionIndex] !== undefined;
}

// Sélectionner une réponse
function selectAnswer(answerIndex) {
    if (answered) return;
    
    selectedAnswer = answerIndex;
    const question = questions[currentQuestion];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Marquer la réponse sélectionnée
    answerButtons.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === answerIndex) {
            btn.classList.add('selected');
        }
    });
    
    // Activer le bouton Suivant
    nextBtn.disabled = false;
}

// Valider la réponse et passer à la question suivante
function submitAnswer() {
    if (selectedAnswer === null) return;
    
    const question = questions[currentQuestion];
    userAnswers[currentQuestion] = selectedAnswer;
    
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Afficher les bonnes/mauvaises réponses
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    answered = true;
    
    // Si c'est la dernière question, afficher les résultats
    if (currentQuestion === questions.length - 1) {
        setTimeout(showResults, 1500);
    } else {
        nextBtn.textContent = 'Suivant';
    }
}

// Passer à la question suivante
function nextQuestion() {
    if (!answered) {
        submitAnswer();
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
        selectedAnswer = null;
        answered = false;
        nextBtn.textContent = 'Valider';
        nextBtn.disabled = true;
    }
}

// Revenir à la question précédente
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateProgress();
        selectedAnswer = userAnswers[currentQuestion];
        answered = userAnswers[currentQuestion] !== undefined;
        nextBtn.textContent = answered ? 'Suivant' : 'Valider';
        nextBtn.disabled = !answered;
    }
}

// Mettre à jour la barre de progression
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestion + 1} sur ${questions.length}`;
}

// Mettre à jour les boutons de navigation
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = !answered && selectedAnswer === null;
}

// Afficher les résultats finaux
function showResults() {
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    const percentage = Math.round((score / questions.length) * 100);
    scoreText.textContent = `${score}/${questions.length}`;
    scorePercentage.textContent = `${percentage}%`;
    
    // Créer le message de résultat
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent ! Vous avez une culture générale exceptionnelle ! 🏆';
    } else if (percentage >= 70) {
        message = 'Très bien ! Votre culture générale est solide ! 👏';
    } else if (percentage >= 50) {
        message = 'Bien ! Continuez à enrichir votre culture générale ! 📚';
    } else {
        message = 'Continuez à apprendre ! La culture générale s\'améliore avec la pratique. 💪';
    }
    
    // Afficher les détails des résultats
    resultsDetails.innerHTML = `
        <h3>Vos réponses :</h3>
        ${questions.map((question, index) => `
            <div style="margin-bottom: 15px; text-align: left;">
                <strong>Question ${index + 1}:</strong> ${question.question}<br>
                <span style="color: ${userAnswers[index] === question.correct ? '#2ed573' : '#ff4757'}">
                    Votre réponse: ${question.answers[userAnswers[index]]} ${userAnswers[index] === question.correct ? '✓' : '✗'}
                </span><br>
                ${userAnswers[index] !== question.correct ? `<span style="color: #2ed573;">Bonne réponse: ${question.answers[question.correct]}</span><br>` : ''}
                <small style="color: rgba(255,255,255,0.8);">${question.explanation}</small>
            </div>
        `).join('')}
        <p style="margin-top: 20px; font-size: 1.1rem; color: white;"><strong>${message}</strong></p>
    `;
    
    // Cacher les boutons de navigation
    document.querySelector('.quiz-footer').style.display = 'none';
}

// Recommencer le quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    selectedAnswer = null;
    answered = false;
    
    questionContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    document.querySelector('.quiz-footer').style.display = 'flex';
    
    nextBtn.textContent = 'Valider';
    nextBtn.disabled = true;
    
    showQuestion(currentQuestion);
    updateProgress();
}

// Gestionnaires d'événements
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialiser le quiz au chargement de la page
document.addEventListener('DOMContentLoaded', initQuiz);

// Ajouter des effets visuels supplémentaires
function addVisualEffects() {
    // Ajouter des particules d'arrière-plan (optionnel)
    const style = document.createElement('style');
    style.textContent = `
        .quiz-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: float 20s linear infinite;
            pointer-events: none;
        }
        
        @keyframes float {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Appeler l'effet visuel après le chargement
setTimeout(addVisualEffects, 1000);