import { loadCards } from "./cards.js"
import { renderCards, addCard } from "./ui.js"
import { startExam } from "./exam.js"

function saveCards(cards) {
  localStorage.setItem("frontendCards", JSON.stringify(cards))
}

export async function initApp() {

  let cards = JSON.parse(localStorage.getItem("frontendCards"))

  if (!cards) {
    cards = await loadCards()
  }

  const updateUI = () => {
    renderCards(cards, updateUI)
    saveCards(cards)
  }

  updateUI()

  document
    .getElementById("examBtn")
    .addEventListener("click", () => startExam(cards))

  document
    .getElementById("addBtn")
    .addEventListener("click", () => addCard(cards, updateUI))

}

document.getElementById("importBtn").addEventListener("click", () => {
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