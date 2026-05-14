import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit-btn");
const textarea = newDeckForm.querySelector(".new-deck-view__textarea");

const errorModal = document.querySelector("#error-modal");
const closeBtn = errorModal.querySelector(".modal__close-btn");
const errorMessage = errorModal.querySelector(".modal__error");

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

function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }

  return name;
}

function showError(message) {
  errorMessage.textContent = message;
  errorModal.classList.add("modal_visible");
}

function closeErrorModal() {
  errorModal.classList.remove("modal_visible");
  errorMessage.textContent = "";
}

export function disableSubmitBtn() {
  submitBtn.disabled = false;
}

closeBtn.addEventListener("click", closeErrorModal);

textarea.addEventListener("input", () => {
  submitBtn.disabled = textarea.value.trim() === "";
});

newDeckForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const values = Object.fromEntries(formData);

  const jsonData = parseJSON(values["deck-json"]);

  if (!jsonData) {
    showError("Please enter valid JSON.");
    return;
  }

  const deckName = validateName(jsonData.name || jsonData.title);

  if (!deckName) {
    showError("The deck must have a name between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError("The deck must include a cards field, and cards must be an array.");
    return;
  }

  const colorValue = normalizeColor(values["deck-color"]);

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError(
      "The color in the JSON does not match the selected color. Please choose the same color or remove the color field from the JSON."
    );
    return;
  }

  const id = `${slugify(deckName)}-${Date.now()}`;

  const deck = {
    id,
    title: deckName,
    name: deckName,
    color: colorValue,
    cards: jsonData.cards,
  };

  decks.push(deck);

  textarea.value = "";
  submitBtn.disabled = true;

  window.location.hash = `deck/${id}`;
});