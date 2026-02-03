const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];
const spacing = 35; 
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

function toggleTheme() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function handleSearch(event) {
    event.preventDefault();
    const res = document.getElementById('ai-response');
    res.style.display = 'block';
    res.innerHTML = `✦ Neel is architecting in Bangalore. Expertise: Next.js & Product Strategy.`;
}

function showHobby(type) {
    const layer = document.getElementById('hobby-photo');
    layer.style.background = type === 'coding' ? 'rgba(34, 211, 238, 0.1)' : 'transparent';
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            dots.push({ x, y, baseX: x, baseY: y });
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)';

    dots.forEach(d => {
        let dx = mouse.x - d.x;
        let dy = mouse.y - d.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let force = (100 - dist) / 100; // Radius of 100px

        if (dist < 100) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2); // Grow dots near mouse
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(d.x, d.y, 0.8, 0, Math.PI * 2); // Small static dots
            ctx.fill();
        }
    });
    requestAnimationFrame(draw);
}

window.onresize = init;
init();
draw();
