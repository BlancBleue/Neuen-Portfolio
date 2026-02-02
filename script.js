const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

// Theme Cycling
themeToggle.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    body.setAttribute('data-theme', themes[themeIndex]);
});

// Canvas Setup
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height, dots = [];
const mouse = { x: -1000, y: -1000 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    for (let i = 0; i < 100; i++) {
        dots.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: 1.5 });
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    const theme = body.getAttribute('data-theme');
    ctx.fillStyle = theme === 'neutral' ? 'rgba(192, 132, 252, 0.4)' : theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.25)';

    dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;
        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const s = dist < 150 ? d.r + (1 - dist/150) * 4 : d.r;
        ctx.beginPath(); ctx.arc(d.x, d.y, s, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(render);
}

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

// AI Chat
const askForm = document.getElementById('ask-form');
const askMessages = document.getElementById('ask-messages');
askForm.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('ask-input');
    if(!input.value) return;
    const msg = document.createElement('div');
    msg.className = 'msg user';
    msg.textContent = `> ${input.value}`;
    askMessages.appendChild(msg);
    input.value = '';
    setTimeout(() => {
        const bot = document.createElement('div');
        bot.className = 'msg bot';
        bot.textContent = "Neel builds high-end digital experiences.";
        askMessages.appendChild(bot);
        askMessages.scrollTop = askMessages.scrollHeight;
    }, 600);
};

init(); render();
window.onresize = init;
