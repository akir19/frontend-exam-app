export function renderCards(cards) {

  const list = document.getElementById("cardList")

  list.innerHTML = ""

  cards.forEach((card, index) => {

    const div = document.createElement("div")

    div.textContent = `${index + 1}. ${card.question}`

    list.appendChild(div)

  })

}