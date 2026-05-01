import { hexToString, removeColorClasses } from "./colorMap.js";

const carouselSection = document.querySelector(".carousel");
const carouselTitle = document.querySelector(".carousel__title");
const carouselCard = document.querySelector(".carousel__card");
const carouselCardText = document.querySelector(".carousel__card-text");
const leftBtn = document.querySelector(".carousel__btn_type_left");
const rightBtn = document.querySelector(".carousel__btn_type_right");
const flipBtn = document.querySelector(".carousel__btn_type_flip");

let currentDeck = null;
let currentIndex = 0;
let showingQuestion = true;

function getCarouselTitleString(deck) {
  return `${deck.title} · ${currentIndex + 1}/${deck.cards.length}`;
}

function updateDisplay() {
  const currentCard = currentDeck.cards[currentIndex];

  carouselTitle.textContent = getCarouselTitleString(currentDeck);

  if (showingQuestion) {
    carouselCardText.textContent = currentCard.question;
    carouselCard.classList.remove("carousel__card_color_white");
  } else {
    carouselCardText.textContent = currentCard.answer;
    carouselCard.classList.add("carousel__card_color_white");
  }

  leftBtn.classList.toggle("carousel__btn_disabled", currentIndex === 0);
  rightBtn.classList.toggle(
    "carousel__btn_disabled",
    currentIndex === currentDeck.cards.length - 1
  );
}

leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    showingQuestion = true;
    updateDisplay();
  }
});

rightBtn.addEventListener("click", () => {
  if (currentIndex < currentDeck.cards.length - 1) {
    currentIndex += 1;
    showingQuestion = true;
    updateDisplay();
  }
});

flipBtn.addEventListener("click", () => {
  showingQuestion = !showingQuestion;
  updateDisplay();
});

export function renderCarouselView(deck) {
  currentDeck = deck;
  currentIndex = 0;
  showingQuestion = true;

  removeColorClasses(carouselCard);

  const color = hexToString(deck.color);
  carouselCard.classList.add(`carousel__card_color_${color}`);

  carouselSection.style.display = "flex";

  updateDisplay();
}