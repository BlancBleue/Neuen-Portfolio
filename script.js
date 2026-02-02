const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

// Cycle Theme
themeToggle.onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    body.setAttribute('data-theme', themes[themeIndex]);
};

// Dot Background
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
    const t = body.getAttribute('data-theme');
    ctx.fillStyle = t === 'neutral' ? 'rgba(192, 132, 252, 0.4)' : t === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)';
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

window.onmousemove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };

// AI Search Box Logic
const askForm = document.getElementById('ask-form');
const aiResponse = document.getElementById('ai-response');
askForm.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('ask-input');
    if(!input.value) return;

    aiResponse.classList.remove('active');
    
    setTimeout(() => {
        aiResponse.textContent = "Neel Nikhil is a Fullstack Developer specializing in AI-driven interfaces and high-performance web systems.";
        aiResponse.classList.add('active');
    }, 400);
};

init(); render();
window.onresize = init;
