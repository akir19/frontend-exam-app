
let cards = []
let currentIndex = 0

let correct = 0
let wrong = 0

export function startExam(cardsData) {

  cards = shuffle(cardsData)
  currentIndex = 0

  correct = 0
  wrong = 0

  showQuestion()

}

function showQuestion() {

  const container = document.getElementById("examContainer")

  const card = cards[currentIndex]

  container.innerHTML = `
  
  <h2>Question</h2>
  <p>${card.question}</p>

  <button id="showAnswerBtn">Show Answer</button>

  <div class="stats">
    Correct: ${correct} |
    Wrong: ${wrong} |
    Remaining: ${cards.length - currentIndex}
  </div>

  <button id="exitBtn">Exit</button>

  `

  document
    .getElementById("showAnswerBtn")
    .addEventListener("click", showAnswer)

  document
    .getElementById("exitBtn")
    .addEventListener("click", exitExam)

}

function showAnswer() {

  const container = document.getElementById("examContainer")

  const card = cards[currentIndex]

  container.innerHTML = `

    <h2>Answer</h2>
    <p>${card.answer}</p>

    <div class="stats">
      Correct: ${correct} |
      Wrong: ${wrong} |
      Remaining: ${cards.length - currentIndex}
    </div>

    <button id="yesBtn">Yes</button>
    <button id="noBtn">No</button>
    <button id="resetBtn">Reset</button>

  `

  document
    .getElementById("yesBtn")
    .addEventListener("click", () => {

      correct++
      nextCard()

    })

  document
    .getElementById("noBtn")
    .addEventListener("click", () => {

      wrong++
      nextCard()

    })

  document
    .getElementById("resetBtn")
    .addEventListener("click", () => {

      if (!confirm("Restart exam?")) return

      currentIndex = 0
      correct = 0
      wrong = 0

      cards = shuffle(cards)

      showQuestion()

    })

}

function nextCard() {

  currentIndex++

  if (currentIndex >= cards.length) {

    document.getElementById("examContainer").innerHTML = `
    
    <h2>Exam finished</h2>

    <p>Correct: ${correct}</p>
    <p>Wrong: ${wrong}</p>

    `

    return

  }

  showQuestion()

}

function shuffle(array) {

  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1))

    ;[arr[i], arr[j]] = [arr[j], arr[i]]

  }

  return arr

}

function exitExam() {

  document.getElementById("examContainer").innerHTML = ""

}