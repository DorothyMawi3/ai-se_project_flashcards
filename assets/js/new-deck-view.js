import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit-btn");
const textarea = newDeckForm.querySelector(".new-deck-view__textarea");

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeColor(color) {
  if (!color) return "#64d583";

  const hex = color.startsWith("#") ? color.slice(1) : color;

  if (!HEX_DIGITS.test(hex)) return "#64d583";

  return "#" + hex.toLowerCase();
}

export function disableSubmitBtn() {
  submitBtn.disabled = false;
}

newDeckForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const values = Object.fromEntries(formData);

  let jsonData;

  try {
    jsonData = JSON.parse(values["deck-json"]);
  } catch (error) {
    console.error("Invalid JSON:", error);
    return;
  }

  const deckName = jsonData.name || jsonData.title;
  const id = `${slugify(deckName)}-${Date.now()}`;
  const color = normalizeColor(values["deck-color"]);

  const deck = {
    id,
    title: deckName,
    name: deckName,
    color,
    cards: jsonData.cards,
  };

  decks.push(deck);

  textarea.value = "";
  submitBtn.disabled = true;

  window.location.hash = `deck/${id}`;
});