const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

themeToggle.onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    body.setAttribute('data-theme', themes[themeIndex]);
};

// --- GRID DISPLACEMENT ---
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
    
    if (theme === 'neutral') ctx.fillStyle = 'rgba(167, 139, 250, 0.15)';
    else if (theme === 'light') ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    else ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';

    dots.forEach(d => {
        const dx = mouse.x - d.baseX;
        const dy = mouse.y - d.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 140) {
            const force = (140 - dist) / 140;
            const angle = Math.atan2(dy, dx);
            d.x = d.baseX - Math.cos(angle) * force * 12;
            d.y = d.baseY - Math.sin(angle) * force * 12;
            ctx.beginPath(); ctx.arc(d.x, d.y, 0.8 + force * 1.5, 0, Math.PI * 2); ctx.fill();
        } else {
            d.x = d.baseX; d.y = d.baseY;
            ctx.beginPath(); ctx.arc(d.x, d.y, 0.8, 0, Math.PI * 2); ctx.fill();
        }
    });
    requestAnimationFrame(render);
}

window.onmousemove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
window.onresize = init;

const askForm = document.getElementById('ask-form');
const aiResponse = document.getElementById('ai-response');
askForm.onsubmit = (e) => {
    e.preventDefault();
    aiResponse.classList.add('active');
    aiResponse.textContent = "Neel is crafting digital products in Bangalore.";
};

init(); render();
