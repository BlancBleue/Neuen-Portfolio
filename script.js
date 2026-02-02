// Theme Logic
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

askForm.onsubmit = (e) => {
    e.preventDefault();
    if (!askInput.value.trim()) return;
    
    responseShell.classList.add('active');
    responseText.textContent = "Thinking... Neel is a software engineer based in Bangalore, currently working on high-impact web products.";
    askInput.value = "";
};

// Canvas Logic (Optimized)
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height, dots = [];
const spacing = 50;
const mouse = { x: -1000, y: -1000 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            dots.push({ bx: x, by: y, x: x, y: y });
        }
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    const theme = body.getAttribute('data-theme');
    ctx.fillStyle = theme === 'neutral' ? 'rgba(167,139,250,0.2)' : theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';

    dots.forEach(d => {
        const dx = mouse.x - d.bx;
        const dy = mouse.y - d.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (150 - dist) / 150;
            d.x = d.bx - Math.cos(angle) * force * 15;
            d.y = d.by - Math.sin(angle) * force * 15;
            ctx.beginPath(); ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.beginPath(); ctx.arc(d.bx, d.by, 1, 0, Math.PI * 2); ctx.fill();
        }
    });
    requestAnimationFrame(render);
}

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('resize', init);
init(); render();
