export function renderCards(cards) {

  const list = document.getElementById("cardList")

  list.innerHTML = ""

  cards.forEach((card, index) => {

    const div = document.createElement("div")

    div.textContent = `${index + 1}. ${card.question}`

    list.appendChild(div)

  })

}

export function addCard(cards, updateUI) {

  const question = prompt("Enter question")

  if (!question) return

  const answer = prompt("Enter answer")

  if (!answer) return

  cards.push({
    question,
    answer
  })

  updateUI()

}