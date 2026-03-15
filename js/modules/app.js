import { loadCards } from "./cards.js"
import { renderCards } from "./ui.js"
import { addCard } from "./ui.js"
import { startExam } from "./exam.js"

export async function initApp() {

  const cards = await loadCards()

  const updateUI = () => renderCards(cards)

  updateUI()

  document
    .getElementById("examBtn")
    .addEventListener("click", () => startExam(cards))

  document
    .getElementById("addBtn")
    .addEventListener("click", () => addCard(cards, updateUI))

}