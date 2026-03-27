import { renderCards, addCard } from "./ui.js"
import { startExam } from "./exam.js"

function saveCards(cards) {
  localStorage.setItem("frontendCards", JSON.stringify(cards))
}

export function initApp() {

  let cards = JSON.parse(localStorage.getItem("frontendCards"))

  // 👉 если в localStorage пусто — создаём стартовые карточки
  if (!cards) {
    cards = [
      { question: "async/await", answer: "Работа с асинхронным кодом через синтаксис async/await" },
      { question: "Event Loop", answer: "Механизм выполнения задач в JavaScript (очередь и стек)" },
      { question: "Promise", answer: "Объект для работы с асинхронными операциями" }
    ]

    saveCards(cards)
  }

  const updateUI = () => {
    renderCards(cards, updateUI)
    saveCards(cards)
  }

  updateUI()

  // ▶️ запуск экзамена
  document
    .getElementById("examBtn")
    .addEventListener("click", () => startExam(cards))

  // ➕ добавление карточки
  document
    .getElementById("addBtn")
    .addEventListener("click", () => addCard(cards, updateUI))

  // 📥 импорт JSON
  document
    .getElementById("importBtn")
    .addEventListener("click", () => {

      const json = prompt("Paste your JSON here")

      if (!json) return

      try {

        const data = JSON.parse(json)

        localStorage.setItem("frontendCards", JSON.stringify(data))

        location.reload()

      } catch (e) {

        alert("Invalid JSON")

      }

    })

}