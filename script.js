function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('ai-input');
    const res = document.getElementById('ai-response');
    if(input.value.trim() !== "") {
        res.style.display = 'block';
        res.innerHTML = `✦ Neel is currently architecting systems in Bangalore. Try asking about his Next.js projects!`;
        input.value = "";
    }
}

function showHobby(type) {
    const layer = document.getElementById('hobby-photo');
    const img = document.getElementById('main-photo');
    if(type === 'coding') { layer.style.background = 'rgba(34, 211, 238, 0.2)'; img.style.filter = 'grayscale(0)'; }
    else if(type === 'chess') { layer.style.background = 'rgba(244, 114, 182, 0.2)'; img.style.filter = 'sepia(0.5)'; }
    else { layer.style.background = 'transparent'; img.style.filter = 'grayscale(1)'; }
}

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
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        ctx.fill();
        d.y -= d.v;
        if(d.y < 0) d.y = canvas.height;
    });
    requestAnimationFrame(draw);
}

window.onresize = init;
init();
draw();
