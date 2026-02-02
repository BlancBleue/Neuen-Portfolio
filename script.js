/**
 * NEEL NIKHIL PORTFOLIO ENGINE
 * Hand-coded to beat the challenge.
 */

// --- 1. THEME CYCLE LOGIC ---
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

// Check for saved preference
const savedTheme = localStorage.getItem('neel-theme');
if (savedTheme && themes.includes(savedTheme)) {
    themeIndex = themes.indexOf(savedTheme);
    body.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    const newTheme = themes[themeIndex];
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('neel-theme', newTheme);
});

// --- 2. THE DOT CANVAS ---
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height, dots = [];
const mouse = { x: -1000, y: -1000 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    const count = Math.min(width / 15, 100); 
    for (let i = 0; i < count; i++) {
        dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 1
        });
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);

    // Get current theme color for dots
    const currentTheme = body.getAttribute('data-theme');
    let dotColor;
    if (currentTheme === 'neutral') dotColor = 'rgba(192, 132, 252, 0.4)'; // Purple
    else if (currentTheme === 'light') dotColor = 'rgba(0, 0, 0, 0.15)';   // Black
    else dotColor = 'rgba(255, 255, 255, 0.25)';                         // White

    ctx.fillStyle = dotColor;

    dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;

        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const scale = Math.max(0, 1 - dist / 150);
        const radius = d.r + scale * 4;

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(render);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// --- 3. AI CHAT DEMO ---
const askForm = document.getElementById('ask-form');
const askInput = document.getElementById('ask-input');
const askMessages = document.getElementById('ask-messages');

askForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = askInput.value.trim();
    if (!val) return;

    // Add User Bubble
    const uMsg = document.createElement('div');
    uMsg.className = 'msg user';
    uMsg.textContent = `> ${val}`;
    askMessages.appendChild(uMsg);
    askInput.value = '';

    // Simple delay for "AI" feel
    setTimeout(() => {
        const bMsg = document.createElement('div');
        bMsg.className = 'msg bot';
        bMsg.textContent = "Neel is an engineer building robust tools for the next generation of the web.";
        askMessages.appendChild(bMsg);
        askMessages.scrollTop = askMessages.scrollHeight;
    }, 600);
});

// Staggered Entrance (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }, i * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    observer.observe(card);
});

init();
render();
window.onresize = init;
