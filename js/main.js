// =======================
// STATE
// =======================

let cards = JSON.parse(localStorage.getItem("frontendCards"))

if (!cards) {
  cards = [
    { question: "async/await", answer: "Работа с асинхронным кодом" },
    { question: "Event Loop", answer: "Механизм обработки задач в JS" },
    { question: "Promise", answer: "Объект для асинхронных операций" }
  ]
  saveCards()
}

// =======================
// STORAGE
// =======================

function saveCards() {
  localStorage.setItem("frontendCards", JSON.stringify(cards))
}

// =======================
// UI
// =======================

function renderCards() {

  const container = document.getElementById("cardList")
  container.innerHTML = ""

  cards.forEach((card, index) => {

    const div = document.createElement("div")
    div.className = "card"

    div.innerHTML = `
      <div class="card-content">
        <strong>${card.question}</strong>
        <div class="answer" style="display:none; margin-top:5px;">
          ${card.answer}
        </div>
      </div>

      <div class="card-buttons">
        <button class="showBtn">Show</button>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `

    // 👁 показать / скрыть ответ
    div.querySelector(".showBtn").onclick = () => {
      const answerEl = div.querySelector(".answer")
      answerEl.style.display =
        answerEl.style.display === "none" ? "block" : "none"
    }

    // ✏️ edit
    div.querySelector(".editBtn").onclick = () => {
      editCard(index)
    }

    // 🗑 delete
    div.querySelector(".deleteBtn").onclick = () => {
      deleteCard(index)
    }

    container.appendChild(div)
  })
}

function editCard(index) {

  const newQuestion = prompt("Edit question", cards[index].question)
  if (!newQuestion) return

  const newAnswer = prompt("Edit answer", cards[index].answer)
  if (!newAnswer) return

  cards[index] = {
    question: newQuestion,
    answer: newAnswer.replace(/\\n/g, '\n')
  }

  updateUI()
}

function addCard() {

  const question = prompt("Enter question")
  if (!question) return

  const answer = prompt("Enter answer").replace(/\\n/g, '\n')
  if (!answer) return

  cards.push({ question, answer })
  updateUI()
}

function deleteCard(index) {
  cards.splice(index, 1)
  updateUI()
}

function updateUI() {
  renderCards()
  saveCards()

  document.getElementById("cardsCount").textContent =
    `Total cards: ${cards.length}`
}

// =======================
// EXAM
// =======================

let examCards = []
let currentIndex = 0
let correct = 0
let wrong = 0

function startExam() {

  examCards = shuffle([...cards])
  currentIndex = 0
  correct = 0
  wrong = 0

  showQuestion()
}

function showQuestion() {

  const container = document.getElementById("examContainer")
  const card = examCards[currentIndex]

  container.innerHTML = `
    <h2>Question</h2>
    <p>${card.question}</p>

    <button id="showAnswerBtn">Show Answer</button>

    <div class="stats">
      Correct: ${correct} |
      Wrong: ${wrong} |
      Remaining: ${examCards.length - currentIndex}
    </div>

    <button id="exitBtn">Exit</button>
  `

  document.getElementById("showAnswerBtn").onclick = showAnswer
  document.getElementById("exitBtn").onclick = exitExam
}

function showAnswer() {

  const container = document.getElementById("examContainer")
  const card = examCards[currentIndex]

  container.innerHTML = `
    <h2>Answer</h2>
    <p>${card.answer}</p>

    <button id="yesBtn">Yes</button>
    <button id="noBtn">No</button>
  `

  document.getElementById("yesBtn").onclick = () => {
    correct++
    nextCard()
  }

  document.getElementById("noBtn").onclick = () => {
    wrong++
    nextCard()
  }
}

function nextCard() {

  currentIndex++

  if (currentIndex >= examCards.length) {

    document.getElementById("examContainer").innerHTML = `
      <h2>Exam finished</h2>
      <p>Correct: ${correct}</p>
      <p>Wrong: ${wrong}</p>
    `
    return
  }

  showQuestion()
}

function exitExam() {
  document.getElementById("examContainer").innerHTML = ""
}

// =======================
// HELPERS
// =======================

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// =======================
// IMPORT
// =======================

document.getElementById("importBtn").onclick = () => {

  const json = prompt("Paste your JSON here")
  if (!json) return

  try {
    const data = JSON.parse(json)
    cards = data
    saveCards()
    updateUI()
  } catch {
    alert("Invalid JSON")
  }
}

// =======================
// INIT
// =======================

document.getElementById("addBtn").onclick = addCard
document.getElementById("examBtn").onclick = startExam

updateUI()