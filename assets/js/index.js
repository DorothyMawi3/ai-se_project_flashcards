import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";

const pageMainContent = document.querySelector(".page__main-content");
const decksSection = document.querySelector(".decks");
const decksList = document.querySelector(".decks__list");
const deckTemplate = document.querySelector("#deck-template");
const notFoundSection = document.querySelector(".not-found");
const carouselSection = document.querySelector(".carousel");

function createDeckEl(deckData) {
  const deckEl = deckTemplate.content.querySelector(".deck").cloneNode(true);

  const deckTitle = deckEl.querySelector(".deck__title");
  const deckCount = deckEl.querySelector(".deck__count");
  const deckDeleteBtn = deckEl.querySelector(".deck__delete-btn");
  const deckLink = deckEl.querySelector(".deck__link");

  deckTitle.textContent = deckData.title;
  deckCount.textContent = `${deckData.cards.length} cards`;

  const color = hexToString(deckData.color);
  deckEl.classList.add(`deck_color_${color}`);

  deckLink.href = `#carousel/${deckData.id}`;

  deckDeleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(deckData) {
  const deckEl = createDeckEl(deckData);
  decksList.prepend(deckEl);
}

function renderDecks() {
  decksList.innerHTML = "";
  decks.forEach(renderDeckEl);
}

function showHomeView() {
  decksSection.style.display = "flex";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  pageMainContent.classList.remove("page__main-content_type_carousel");
}

function showNotFoundView() {
  decksSection.style.display = "none";
  notFoundSection.style.display = "block";
  carouselSection.style.display = "none";
  pageMainContent.classList.remove("page__main-content_type_carousel");
}

function showCarouselView(deck) {
  decksSection.style.display = "none";
  notFoundSection.style.display = "none";
  pageMainContent.classList.add("page__main-content_type_carousel");
  renderCarouselView(deck);
}

function handleRoute() {
  const hash = window.location.hash.slice(1);

  if (hash === "" || hash === "home" || hash === "about") {
    showHomeView();
    return;
  }

  if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      showCarouselView(deck);
    } else {
      showNotFoundView();
    }

    return;
  }

  showNotFoundView();
}

renderDecks();
handleRoute();

window.addEventListener("hashchange", handleRoute);