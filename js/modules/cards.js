export async function loadCards() {
  const response = await fetch("../data/cards.json")
  const cards = await response.json()
  return cards
}