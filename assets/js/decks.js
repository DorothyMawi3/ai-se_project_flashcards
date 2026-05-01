export const decks = [
  {
    id: "basic-html-tags",
    title: "Basic HTML Tags",
    color: "#64d583",
    cards: [
      {
        question: "<body></body>",
        answer: "Contains the visible content of the webpage.",
      },
      {
        question: "<head></head>",
        answer: "Contains page information like title, metadata, and links.",
      },
      {
        question: "<a></a>",
        answer: "Creates a hyperlink.",
      },
    ],
  },
  {
    id: "git-commands",
    title: "Git Commands",
    color: "#91A8F9",
    cards: [
      {
        question: "git status",
        answer: "Shows the current state of the repository.",
      },
      {
        question: "git add .",
        answer: "Stages all changed files.",
      },
      {
        question: "git commit -m",
        answer: "Creates a commit with a message.",
      },
    ],
  },
  {
    id: "agile-development",
    title: "Agile Development Terminology",
    color: "#EE92D7",
    cards: [
      {
        question: "Sprint",
        answer: "A short development cycle.",
      },
      {
        question: "Scrum",
        answer: "An Agile framework for teamwork.",
      },
      {
        question: "Backlog",
        answer: "A list of tasks or features to complete.",
      },
    ],
  },
];

export function getDeckByID(id) {
  return decks.find((deck) => deck.id === id);
}