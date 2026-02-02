// Theme Toggler
const themeBtn = document.getElementById('theme-btn');
themeBtn.onclick = () => {
    const current = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
};

// AI Search Submission
const aiForm = document.getElementById('ai-form');
const aiOutput = document.getElementById('ai-output');
const aiInput = document.getElementById('ai-input');

aiForm.onsubmit = (e) => {
    e.preventDefault();
    if (!aiInput.value.trim()) return;
    aiOutput.classList.add('active');
    aiOutput.innerHTML = `<p style="color:var(--accent);">Neel is based in Bangalore and specializes in high-performance Fullstack systems.</p>`;
    aiInput.value = "";
};

// Responsive Dot Background
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
        o: Math.random() * 0.5 + 0.2
    }));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const theme = document.body.getAttribute('data-theme');
    ctx.fillStyle = theme === 'light' ? '#000' : '#fff';
    
    dots.forEach(d => {
        ctx.globalAlpha = d.o;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        ctx.fill();
        d.y -= 0.3; // Very slow drift up
        if (d.y < 0) d.y = canvas.height;
    });
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init();
draw();
