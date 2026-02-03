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
    const spacing = 30;
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
            // "RAISE" EFFECT: Grow and change color
            ctx.fillStyle = isDark ? '#22d3ee' : '#6366f1';
            ctx.beginPath();
            ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // STATIC GRID
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(draw);
}

function toggleTheme() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

window.onresize = init;
init();
draw();
