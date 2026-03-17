export function renderCards(cards, updateUI) {
  const container = document.getElementById("cardList")
  container.innerHTML = ""
  cards.forEach((card, index) => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
      <span>${card.question}</span>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `
    div
      .querySelector(".editBtn")
      .addEventListener("click", () => {
        editCard(cards, index, updateUI)
      })

    div
      .querySelector(".deleteBtn")
      .addEventListener("click", () => {
        deleteCard(cards, index, updateUI)
      })
    container.appendChild(div)
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

function deleteCard(cards, index, updateUI) {
  cards.splice(index, 1)
  updateUI()
}

function editCard(cards, index, updateUI) {
  const question = prompt("Edit question", cards[index].question)
  if (!question) return
  const answer = prompt("Edit answer", cards[index].answer)
  if (!answer) return
  cards[index] = {
    question,
    answer
  }
  updateUI()
}