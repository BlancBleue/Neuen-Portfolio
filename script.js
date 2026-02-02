// 1. Theme Toggle
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// 2. Hobby Hover Images
const hobbyImages = {
    'coding': 'url("coding-me.jpg")',
    'chess': 'url("chess-me.jpg")',
    'travel': 'url("travel-me.jpg")'
};

function showHobby(type) {
    const overlay = document.getElementById('hobby-img');
    const content = document.querySelector('.mindset-content');
    
    if (type === 'default') {
        overlay.style.opacity = "0";
        content.style.opacity = "1";
    } else {
        overlay.style.backgroundImage = hobbyImages[type];
        overlay.style.opacity = "1";
        content.style.opacity = "0.4"; // Dims text to show image better
    }
}

// 3. AI Search Bar
function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('ai-input');
    const res = document.getElementById('ai-response');
    if(input.value.trim() !== "") {
        res.style.display = 'block';
        res.innerHTML = `✦ Neel is architecting systems in Bangalore. Ask about his Next.js projects!`;
        input.value = "";
    }
}

// 4. Background Canvas
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = Array.from({length: 60}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 1.5 + 0.5,
        v: Math.random() * 0.4 + 0.1
    }));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
    dots.forEach(d => {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2); ctx.fill();
        d.y -= d.v; if(d.y < 0) d.y = canvas.height;
    });
    requestAnimationFrame(draw);
}

window.onresize = init;
init();
draw();
