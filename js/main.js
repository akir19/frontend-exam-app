import { loadCards } from "./modules/cards.js"
import { renderCards } from "./modules/ui.js"
import { startExam } from "./modules/exam.js"

async function init() {

  const cards = await loadCards()

  renderCards(cards)

  document
    .getElementById("examBtn")
    .addEventListener("click", () => startExam(cards))

}

init()