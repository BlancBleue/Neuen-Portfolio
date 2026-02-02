// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const toggle = document.querySelector(".theme-toggle");
const body = document.body;

// Load saved theme
const saved = localStorage.getItem("theme");
if (saved === "light") {
  body.classList.remove("theme-dark");
  body.classList.add("theme-light");
}

toggle.addEventListener("click", () => {
  const isDark = body.classList.contains("theme-dark");
  body.classList.toggle("theme-dark", !isDark);
  body.classList.toggle("theme-light", isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

// Ask Neel fake AI
const form = document.getElementById("ask-form");
const input = document.getElementById("ask-input");
const messages = document.getElementById("ask-messages");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerHTML = `<p>${text}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  setTimeout(() => {
    const reply =
      "If I were answering this properly, I’d probably break it into smaller questions, test one tiny thing, and ship a small experiment. That’s how I handle most problems.";
    addMessage(reply, "bot");
  }, 500);
});
