/**
 * 1. DYNAMIC REACTIVE DOT ENGINE
 * Creates a canvas grid where dots grow and glow on mouse hover
 */
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];
const mouse = { x: null, y: null };

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDots();
};

window.onmousemove = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
};

function initDots() {
    dots = [];
    const spacing = 50; // Grid density
    for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
            dots.push({ x, y, baseSize: 1.5 });
        }
    }
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.body.getAttribute('data-theme') === 'light';
    const dotColor = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)';
    const activeColor = isLight ? '#6366f1' : '#8b5cf6'; // Accent colors

    dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let size = dot.baseSize;

        // The "Growth" effect
        if (distance < 150) {
            size = 4.5; // Grow the dot
            ctx.fillStyle = activeColor;
            ctx.shadowBlur = 10;
            ctx.shadowColor = activeColor;
        } else {
            ctx.fillStyle = dotColor;
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateDots);
}

/**
 * 2. 3D LOGO SPHERE INITIALIZATION
 */
function initLogoSphere() {
    const skills = [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' }
    ];

    const skillElements = skills.map(s => 
        `<div class="tagcloud--item"><img src="${s.icon}" alt="${s.name}" title="${s.name}"></div>`
    );

    const options = {
        radius: 260,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true,
        useHTML: true // Allows image rendering
    };

    if (typeof TagCloud !== 'undefined') {
        TagCloud('.tagcloud', skillElements, options);
    }
}

/**
 * 3. THEME & UTILITIES
 */
function toggleTheme() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('neel-portfolio-theme', newTheme);
}

function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;
    const images = {
        'coding': 'coding-me.jpg',
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = images[type] || images['default'];
        img.style.opacity = '1';
    }, 200);
}

function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    if (!input.value) return;
    
    display.innerHTML = `<div class="bot-bubble">NEEL-AI: Scanning request... Protocol accepted.</div>`;
    input.value = '';
}

/**
 * 4. STARTUP
 */
window.onload = () => {
    // Theme restore
    const saved = localStorage.getItem('neel-portfolio-theme');
    if (saved) document.body.setAttribute('data-theme', saved);

    window.onresize(); // Setup Canvas
    animateDots();     // Run Dot Engine
    initLogoSphere();  // Run Sphere

    // Bangalore Time Update
    setInterval(() => {
        const time = new Date().toLocaleTimeString('en-GB', { 
            timeZone: 'Asia/Kolkata', 
            hour12: false 
        });
        document.getElementById('time-display').innerText = time + " IST";
    }, 1000);
};
