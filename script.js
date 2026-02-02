// THEME TOGGLE (neutral -> dark -> light)

const body = document.body;
const themeBtn = document.querySelector(".theme-toggle");
const themes = ["neutral", "dark", "light"];
let currentTheme = localStorage.getItem("neel-theme") || "neutral";

function applyTheme(theme) {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("neel-theme", theme);
}

applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
  const idx = themes.indexOf(currentTheme);
  const next = themes[(idx + 1) % themes.length];
  currentTheme = next;
  applyTheme(next);
});

// ASK NEEL CHAT

const form = document.getElementById("ask-form");
const input = document.getElementById("ask-input");
const messages = document.getElementById("ask-messages");
const quickButtons = document.querySelectorAll(".ask-quick-links button");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerHTML = `<p>${text}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function botReply(question) {
  const reply =
    "Good question. I’d break this into smaller parts, run a tiny experiment, and then iterate. That’s basically how I handle most problems, from code to exams.";
  addMessage(reply, "bot");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, "user");
  input.value = "";
  setTimeout(() => botReply(question), 500);
});

quickButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const prompt = btn.getAttribute("data-prompt");
    addMessage(prompt, "user");
    setTimeout(() => botReply(prompt), 400);
  });
});

// DOT GRID FOLLOWING MOUSE (grey in light, white in others)

const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let mouseX = 0.5;
let mouseY = 0.5;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / width;
  mouseY = e.clientY / height;
});

function drawDots() {
  ctx.clearRect(0, 0, width, height);

  const spacing = 32;
  const offsetX = (mouseX - 0.5) * 40;
  const offsetY = (mouseY - 0.5) * 40;

  const theme = body.getAttribute("data-theme");
  const isLight = theme === "light";

  for (let x = -spacing; x < width + spacing; x += spacing) {
    for (let y = -spacing; y < height + spacing; y += spacing) {
      const dx = x + offsetX;
      const dy = y + offsetY;

      // Stronger alpha + larger size so you can see them on light bg
      const alpha = isLight
        ? 0.18 + Math.random() * 0.08
        : 0.05 + Math.random() * 0.07;

      const color = isLight ? 120 : 255; // grey vs white
      ctx.fillStyle = `rgba(${color},${color},${color},${alpha})`;
      ctx.fillRect(dx, dy, isLight ? 1.6 : 1.2, isLight ? 1.6 : 1.2);
    }
  }

  requestAnimationFrame(drawDots);
}
drawDots();
