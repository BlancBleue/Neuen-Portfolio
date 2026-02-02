const body = document.body;
const themeBtn = document.getElementById('theme-switcher');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

themeBtn.onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    body.setAttribute('data-theme', themes[themeIndex]);
};

// AI Search Logic
const askForm = document.getElementById('ask-form');
const askInput = document.getElementById('ask-input');
const responseShell = document.getElementById('ai-response');
const responseText = responseShell.querySelector('.response-text');
const typingIndicator = responseShell.querySelector('.typing-indicator');

askForm.onsubmit = (e) => {
    e.preventDefault();
    const query = askInput.value.trim();
    if(!query) return;

    responseShell.classList.add('active');
    responseText.textContent = "";
    typingIndicator.style.display = 'flex';

    setTimeout(() => {
        typingIndicator.style.display = 'none';
        responseText.textContent = `Processing "${query}"... Neel is currently architecting digital experiences in Bangalore. He specializes in high-performance fullstack apps.`;
        askInput.value = "";
    }, 1200);
};

// --- GRID DISPLACEMENT CANVAS ---
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height, dots = [];
const spacing = 45;
const mouse = { x: -1000, y: -1000 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            dots.push({ baseX: x, baseY: y, x: x, y: y });
        }
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    const theme = body.getAttribute('data-theme');
    ctx.fillStyle = theme === 'neutral' ? 'rgba(167,139,250,0.15)' : theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';

    dots.forEach(d => {
        const dx = mouse.x - d.baseX;
        const dy = mouse.y - d.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
            const force = (140 - dist) / 140;
            const angle = Math.atan2(dy, dx);
            d.x = d.baseX - Math.cos(angle) * force * 15;
            d.y = d.baseY - Math.sin(angle) * force * 15;
            ctx.beginPath(); ctx.arc(d.x, d.y, 1 + force * 2, 0, Math.PI * 2); ctx.fill();
        } else {
            d.x = d.baseX; d.y = d.baseY;
            ctx.beginPath(); ctx.arc(d.x, d.y, 0.8, 0, Math.PI * 2); ctx.fill();
        }
    });
    requestAnimationFrame(render);
}

window.onmousemove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
window.onresize = init;
init(); render();
