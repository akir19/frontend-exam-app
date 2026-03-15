import { loadCards } from "./cards.js"
import { renderCards } from "./ui.js"
import { startExam } from "./exam.js"

export async function initApp() {

  const cards = await loadCards()

  renderCards(cards)

  document
    .getElementById("examBtn")
    .addEventListener("click", () => startExam(cards))

}