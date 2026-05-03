import { hexToString, removeColorClasses } from "./colorMap.js";

const deckViewSection = document.querySelector(".deck-view");
const deckViewTitle = document.querySelector(".deck-view__title");
const deckViewList = document.querySelector(".deck-view__list");
const practiceBtn = document.querySelector(".deck-view__practice-btn");
const cardTemplate = document.querySelector("#card-template");

function createCardEl(cardData, deckColor) {
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardText = cardEl.querySelector(".card__text");
  const flipBtn = cardEl.querySelector(".card__flip-btn");
  const deleteBtn = cardEl.querySelector(".card__delete-btn");

  let showingQuestion = true;

  cardText.textContent = cardData.question;

  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${deckColor}`);

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;

    if (showingQuestion) {
      cardText.textContent = cardData.question;
      cardEl.classList.remove("card_color_white");
      cardEl.classList.add(`card_color_${deckColor}`);
    } else {
      cardText.textContent = cardData.answer;
      cardEl.classList.add("card_color_white");
    }
  });

  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  return cardEl;
}

export function renderDeckView(deck) {
  deckViewList.innerHTML = "";
  deckViewTitle.textContent = deck.title;
  practiceBtn.href = `#carousel/${deck.id}`;

  const color = hexToString(deck.color);

  deck.cards.forEach((card) => {
    const cardEl = createCardEl(card, color);
    deckViewList.append(cardEl);
  });

  deckViewSection.style.display = "flex";
}