const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

themeToggle.onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    body.setAttribute('data-theme', themes[themeIndex]);
};

// --- GRID DISPLACEMENT CANVAS ---
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let dots = [];
const spacing = 35; // The gap between dots
const mouse = { x: -1000, y: -1000 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    
    // Create a 2D Grid
    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            dots.push({ baseX: x, baseY: y, x: x, y: y });
        }
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    
    const theme = body.getAttribute('data-theme');
    let dotColor;
    if (theme === 'neutral') dotColor = 'rgba(192, 132, 252, 0.4)';
    else if (theme === 'light') dotColor = 'rgba(0, 0, 0, 0.1)';
    else dotColor = 'rgba(255, 255, 255, 0.15)';
    
    ctx.fillStyle = dotColor;

    dots.forEach(d => {
        const dx = mouse.x - d.baseX;
        const dy = mouse.y - d.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;
        
        // The Math: If mouse is close, push the dot away slightly
        if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            // Move dot away from mouse
            d.x = d.baseX - Math.cos(angle) * force * 20;
            d.y = d.baseY - Math.sin(angle) * force * 20;
            
            // Draw larger dot when close
            const size = 1.5 + force * 3;
            ctx.beginPath();
            ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Return to original position
            d.x = d.baseX;
            d.y = d.baseY;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    requestAnimationFrame(render);
}

window.onmousemove = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};

// AI Search Box Logic
const askForm = document.getElementById('ask-form');
const aiResponse = document.getElementById('ai-response');
askForm.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('ask-input');
    if(!input.value) return;
    aiResponse.classList.remove('active');
    setTimeout(() => {
        aiResponse.textContent = "Neel Nikhil is building high-fidelity web experiences in Bangalore.";
        aiResponse.classList.add('active');
    }, 400);
};

init();
render();
window.onresize = init;
