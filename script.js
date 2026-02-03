const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];
let mouse = { x: -1000, y: -1000 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    const spacing = 32;
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            dots.push({ x, y });
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    dots.forEach(d => {
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
            // RAISE EFFECT
            ctx.fillStyle = isDark ? '#22d3ee' : '#6366f1';
            ctx.beginPath(); ctx.arc(d.x, d.y, 2.8, 0, Math.PI * 2); ctx.fill();
        } else {
            // STATIC GRID
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
            ctx.beginPath(); ctx.arc(d.x, d.y, 1, 0, Math.PI * 2); ctx.fill();
        }
    });
    requestAnimationFrame(draw);
}

function updateTime() {
    const time = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const el = document.getElementById('time-display');
    if(el) el.textContent = time;
}

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

function showHobby(type) {
    const img = document.getElementById('main-photo');
    if(type === 'coding') img.style.filter = 'grayscale(0) brightness(1.1)';
    else if(type === 'chess') img.style.filter = 'sepia(0.5) hue-rotate(-30deg)';
    else img.style.filter = 'grayscale(1)';
}

setInterval(updateTime, 1000);
window.onresize = init;
init();
draw();
