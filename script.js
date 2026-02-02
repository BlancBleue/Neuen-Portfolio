// THEME TOGGLE (visual only, dark default)
const toggle = document.querySelector(".theme-toggle");

// Optional: you can extend this later to real light mode
toggle.addEventListener("click", () => {
  // placeholder – keep dark for now
});

// ASK NEEL (fake AI)

const form = document.getElementById("ask-form");
const input = document.getElementById("ask-input");
const messages = document.getElementById("ask-messages");
const quickButtons = document.querySelectorAll(".ask-quick-links button");

function setCenterMessage(text) {
  messages.innerHTML = "";
  const div = document.createElement("div");
  div.className = "msg bot";
  div.innerHTML = `<p>${text}</p>`;
  messages.appendChild(div);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  input.value = "";
  setCenterMessage(
    "If I were answering this properly, I’d probably break it into smaller questions, test one tiny thing, and ship a small experiment. That’s how I handle most problems."
  );
});

quickButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const prompt = btn.getAttribute("data-prompt");
    setCenterMessage(prompt);
  });
});

// DOT GRID FOLLOWING MOUSE

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
  ctx.fillStyle = "rgba(255,255,255,0.18)";

  const spacing = 30;
  const offsetX = (mouseX - 0.5) * 40; // parallax
  const offsetY = (mouseY - 0.5) * 40;

  for (let x = -spacing; x < width + spacing; x += spacing) {
    for (let y = -spacing; y < height + spacing; y += spacing) {
      const dx = x + offsetX;
      const dy = y + offsetY;
      const alpha = 0.06 + 0.12 * Math.random();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(dx, dy, 1.2, 1.2);
    }
  }

  requestAnimationFrame(drawDots);
}
drawDots();
