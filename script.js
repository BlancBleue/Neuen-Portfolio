// THEME TOGGLE
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');

const themes = ['neutral', 'dark', 'light'];
let themeIndex = 0;

function setTheme(index) {
  const theme = themes[index];
  body.setAttribute('data-theme', theme);
  localStorage.setItem('neel-theme', theme);
}

const savedTheme = localStorage.getItem('neel-theme');
if (savedTheme && themes.includes(savedTheme)) {
  themeIndex = themes.indexOf(savedTheme);
  setTheme(themeIndex);
} else {
  setTheme(themeIndex);
}

themeToggle.addEventListener('click', () => {
  themeIndex = (themeIndex + 1) % themes.length;
  setTheme(themeIndex);
});

// ASK NEEL – simple fake replies
const askForm = document.getElementById('ask-form');
const askInput = document.getElementById('ask-input');
const askMessages = document.getElementById('ask-messages');
const quickButtons = document.querySelectorAll('.ask-quick-links button');

function addMessage(text, who) {
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.innerHTML = `<p>${text}</p>`;
  askMessages.appendChild(div);
  askMessages.scrollTop = askMessages.scrollHeight;
}

quickButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.dataset.prompt;
    askInput.value = prompt;
    askInput.focus();
  });
});

askForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = askInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  askInput.value = '';

  setTimeout(() => {
    addMessage("This is a static front‑end demo reply. Wire this to your backend/AI later.", 'bot');
  }, 500);
});

// DOT CANVAS BACKGROUND (mouse motion + theme-aware colors)
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const dots = [];
const DOT_COUNT = 80;

for (let i = 0; i < DOT_COUNT; i++) {
  dots.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 1 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15
  });
}

let mouse = { x: width / 2, y: height / 2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

function render() {
  const theme = body.getAttribute('data-theme');
  
  // Theme-based dot colors
  let dotColor;
  if (theme === 'neutral') {
    dotColor = 'rgba(34, 211, 238, 0.6)'; // cyan
  } else if (theme === 'dark') {
    dotColor = 'rgba(99, 102, 241, 0.55)'; // indigo
  } else { // light
    dotColor = 'rgba(79, 70, 229, 0.65)'; // blue
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = dotColor;

  dots.forEach(d => {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > width) d.vx *= -1;
    if (d.y < 0 || d.y > height) d.vy *= -1;

    const dx = d.x - mouse.x;
    const dy = d.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;
    const scale = 1 - Math.min(dist / maxDist, 1);

    const radius = d.r + scale * 2;
    ctx.beginPath();
    ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(render);
}

render();
