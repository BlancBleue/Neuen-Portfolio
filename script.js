/**
 * NEEL NIKHIL - PORTFOLIO LOGIC
 * Features: Mouse-reactive dots, Theme switching, Chat UI, Scroll Reveal
 */

// 1. CANVAS DOTS SYSTEM
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height, dots = [];
const mouse = { x: -200, y: -200 };

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    const dotCount = Math.min(width / 10, 120); // Responsive density

    for (let i = 0; i < dotCount; i++) {
        dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.15)';

    dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;

        // Wrap around screen
        if (d.x < 0) d.x = width; if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height; if (d.y > height) d.y = 0;

        // Mouse reaction (Dots grow slightly near mouse)
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let radius = d.r;

        if (dist < 150) {
            radius = d.r + (1 - dist / 150) * 3;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

// 2. THEME SWITCHING
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('neel-theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('neel-theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

// 3. AI CHAT INTERFACE
const askForm = document.getElementById('ask-form');
const askInput = document.getElementById('ask-input');
const askMessages = document.getElementById('ask-messages');
const quickLinks = document.querySelectorAll('.ask-quick-links button');

function addMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}`;
    msgDiv.innerHTML = `<p>${text}</p>`;
    askMessages.appendChild(msgDiv);
    
    // Auto-scroll to bottom
    askMessages.scrollTo({ top: askMessages.scrollHeight, behavior: 'smooth' });
}

askForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = askInput.value.trim();
    if (!query) return;

    addMessage(query, 'user');
    askInput.value = '';

    // Fake AI Response logic
    setTimeout(() => {
        const responses = [
            "Neel is currently mastering React & AI integration.",
            "He lives in Bangalore and loves building frictionless tools.",
            "You can find his projects on GitHub or book a call via the header!",
            "Discipline over motivation—that's his core philosophy."
        ];
        const randomResp = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResp, 'bot');
    }, 800);
});

// Quick prompt buttons
quickLinks.forEach(btn => {
    btn.addEventListener('click', () => {
        askInput.value = btn.getAttribute('data-prompt');
        askInput.focus();
    });
});

// 4. SCROLL REVEAL (The "Paweł" Effect)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
    revealObserver.observe(card);
});

// Initialization
initCanvas();
animate();
window.addEventListener('resize', initCanvas);
