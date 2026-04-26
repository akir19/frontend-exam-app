// =======================
// STATE
// =======================

let lists = JSON.parse(localStorage.getItem("examLists"))
let mistakes = []

if (!lists) {
  lists = {
    Frontend: [
      { question: "async/await", answer: "Работа с асинхронным кодом" },
      { question: "Event Loop", answer: "Механизм обработки задач в JS" }
    ],
    English: [
      { question: "apple", answer: "яблоко" },
      { question: "run", answer: "бежать" }
    ]
  }
  saveLists()
}

let currentList = localStorage.getItem("currentList") || Object.keys(lists)[0]
let cards = lists[currentList]

// =======================
// STORAGE
// =======================

function saveLists() {
  localStorage.setItem("examLists", JSON.stringify(lists))
}

function saveCurrentList() {
  localStorage.setItem("currentList", currentList)
}

// =======================
// LIST SWITCH
// =======================

function renderListSelect() {
  const select = document.getElementById("listSelect")
  select.innerHTML = ""

  Object.keys(lists).forEach(name => {
    const option = document.createElement("option")
    option.value = name
    option.textContent = name
    if (name === currentList) option.selected = true
    select.appendChild(option)
  })
}

document.getElementById("listSelect").onchange = (e) => {
  currentList = e.target.value
  cards = lists[currentList]
  saveCurrentList()
  updateUI()
}

// =======================
// UI
// =======================

function renderCards() {

  const container = document.getElementById("cardList")
  container.innerHTML = ""

  cards.forEach((card, index) => {

    const div = document.createElement("div")

    div.innerHTML = `
      <strong>${card.question}</strong>
      <div class="answer" style="display:none;">
        ${card.answer}
      </div>

      <button class="showBtn">Show</button>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `

    div.querySelector(".showBtn").onclick = () => {
      const answerEl = div.querySelector(".answer")
      answerEl.style.display =
        answerEl.style.display === "none" ? "block" : "none"
    }

    div.querySelector(".editBtn").onclick = () => {
      editCard(index)
    }

    div.querySelector(".deleteBtn").onclick = () => {
      deleteCard(index)
    }

    container.appendChild(div)
  })
}

function updateUI() {
  renderListSelect()
  renderCards()
  saveLists()

  document.getElementById("cardsCount").textContent =
    `Total cards: ${cards.length}`
}

function showCardsUI() {
  document.getElementById("cardList").style.display = "block"
  document.getElementById("cardsCount").style.display = "block"
}

function hideCardsUI() {
  document.getElementById("cardList").style.display = "none"
  document.getElementById("cardsCount").style.display = "none"
}

// =======================
// CRUD
// =======================

function addCard() {

  const question = prompt("Enter question")
  if (!question) return

  const answer = prompt("Enter answer")
  if (!answer) return

  cards.push({ question, answer })
  updateUI()
}

function editCard(index) {

  const newQuestion = prompt("Edit question", cards[index].question)
  if (!newQuestion) return

  const newAnswer = prompt("Edit answer", cards[index].answer)
  if (!newAnswer) return

  cards[index] = {
    question: newQuestion,
    answer: newAnswer
  }

  updateUI()
}

function deleteCard(index) {
  cards.splice(index, 1)
  updateUI()
}

// =======================
// EXAM
// =======================

let examCards = []
let currentIndex = 0
let correct = 0
let wrong = 0

function startExam() {

  mistakes = []

  hideCardsUI()

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
    <p id="questionText">${card.question}</p>

    <button id="showAnswerBtn">Show Answer</button>

    <div id="answerBlock" style="margin-top:10px;"></div>

    <div class="stats">
      Correct: ${correct} |
      Wrong: ${wrong} |
      Remaining: ${examCards.length - currentIndex}
    </div>

    <button id="mistakesBtn">Mistakes</button>
    <button id="exitBtn">Exit</button>
  `

  document.getElementById("showAnswerBtn").onclick = showAnswer
  document.getElementById("exitBtn").onclick = exitExam
  document.getElementById("mistakesBtn").onclick = showMistakes
}

function showAnswer() {

  const card = examCards[currentIndex]
  const answerBlock = document.getElementById("answerBlock")

  answerBlock.innerHTML = `
    <h3>Answer</h3>
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
    mistakes.push(examCards[currentIndex])
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
    <button id="finishBtn">Back</button>
  `

  document.getElementById("finishBtn").onclick = exitExam

  return
}

  showQuestion()
}

function exitExam() {
  document.getElementById("examContainer").innerHTML = ""
  showCardsUI()
}

function showMistakes() {

  const container = document.getElementById("examContainer")

  if (mistakes.length === 0) {
    container.innerHTML = `
      <h2>No mistakes 🎉</h2>
      <button id="backBtn">Back</button>
    `
  } else {
    container.innerHTML = `
      <h2>Mistakes (${mistakes.length})</h2>
      ${mistakes.map(card => `
        <div style="margin-bottom:10px;">
          <strong>${card.question}</strong>
          <div>${card.answer}</div>
        </div>
      `).join("")}

      <button id="backBtn">Back</button>
    `
  }

  document.getElementById("backBtn").onclick = showQuestion
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

// =======================
// IMPORT FROM FILE
// =======================

const fileInput = document.getElementById("fileInput")
// const fileName = file.name.replace(".json", "")

document.getElementById("importBtn").onclick = () => {
  fileInput.click()
}

fileInput.onchange = (event) => {

  const file = event.target.files[0]
  if (!file) return

  const fileName = file.name.replace(".json", "")

  const reader = new FileReader()

  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result)

      if (typeof data !== "object") throw new Error()

      // 🔥 берём ПЕРВЫЙ список из JSON
      const firstKey = Object.keys(data)[0]
      const importedCards = data[firstKey]

      if (!Array.isArray(importedCards)) throw new Error()

      // 🔥 логика по имени файла
      if (lists[fileName]) {
        const confirmReplace = confirm(`List "${fileName}" already exists. Replace it?`)
        if (!confirmReplace) return
      }

      lists[fileName] = importedCards

      currentList = fileName
      cards = lists[currentList]

      saveLists()
      saveCurrentList()
      updateUI()

      alert("Import successful!")

    } catch {
      alert("Invalid JSON file")
    }
  }

  reader.readAsText(file)
}

// =======================
// CREATE NEW LIST
// =======================

document.getElementById("newListBtn").onclick = () => {

  const name = prompt("Enter list name")
  if (!name) return

  if (lists[name]) {
    alert("List already exists")
    return
  }

  // создаём пустой список
  lists[name] = []

  // переключаемся на него
  currentList = name
  cards = lists[currentList]

  saveLists()
  saveCurrentList()
  updateUI()
}

// =======================
// EXPORT CURRENT LIST
// =======================

document.getElementById("exportBtn").onclick = () => {

  if (!cards.length) {
    alert("List is empty")
    return
  }

  // создаём объект только с текущим списком
  const data = {
    [currentList]: cards
  }

  const json = JSON.stringify(data, null, 2)

  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `${currentList}.json`
  a.click()

  URL.revokeObjectURL(url)
}

// =======================
// INIT
// =======================

document.getElementById("addBtn").onclick = addCard
document.getElementById("examBtn").onclick = startExam

updateUI()