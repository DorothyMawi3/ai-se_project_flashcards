import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deckView.js";

const page = document.querySelector(".page");
const pageMainContent = document.querySelector(".page__main-content");
const decksSection = document.querySelector(".decks");
const deckViewSection = document.querySelector(".deck-view");
const newDeckViewSection = document.querySelector(".new-deck-view");
const decksList = document.querySelector(".decks__list");
const deckTemplate = document.querySelector("#deck-template");
const notFoundSection = document.querySelector(".not-found");
const carouselSection = document.querySelector(".carousel");
const newDeckBtn = document.querySelector("#home .decks__new-deck-btn");

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

  deckLink.href = `#deck/${deckData.id}`;

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

function hideAllViews() {
  decksSection.style.display = "none";
  deckViewSection.style.display = "none";
  newDeckViewSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
}

function showHomeView() {
  hideAllViews();
  decksSection.style.display = "flex";

  page.classList.remove("page_no-mobile-bar");
  pageMainContent.classList.remove("page__main-content_type_carousel");
}

function showDeckView(deck) {
  hideAllViews();
  deckViewSection.style.display = "flex";

  page.classList.remove("page_no-mobile-bar");
  pageMainContent.classList.remove("page__main-content_type_carousel");

  renderDeckView(deck);
}

function showNewDeckView() {
  hideAllViews();
  newDeckViewSection.style.display = "flex";

  page.classList.remove("page_no-mobile-bar");
  pageMainContent.classList.remove("page__main-content_type_carousel");
}

function showCarouselView(deck) {
  hideAllViews();

  page.classList.add("page_no-mobile-bar");
  pageMainContent.classList.add("page__main-content_type_carousel");

  renderCarouselView(deck);
}

function showNotFoundView() {
  hideAllViews();
  notFoundSection.style.display = "block";

  page.classList.add("page_no-mobile-bar");
  pageMainContent.classList.remove("page__main-content_type_carousel");
}

function handleRoute() {
  const hash = window.location.hash.slice(1);

  if (hash === "" || hash === "home" || hash === "about") {
    showHomeView();
    return;
  }

  if (hash === "new-deck" || hash === "new-deck-view") {
    showNewDeckView();
    return;
  }

  if (hash.startsWith("deck/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      showDeckView(deck);
    } else {
      showNotFoundView();
    }

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

newDeckBtn.addEventListener("click", () => {
  window.location.hash = "new-deck";
});

renderDecks();
handleRoute();

window.addEventListener("hashchange", handleRoute);