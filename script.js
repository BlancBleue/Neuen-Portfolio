/**
 * 1. DYNAMIC REACTIVE DOT ENGINE
 * Renders a canvas-based grid that reacts to mouse proximity
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
    const spacing = 50; 
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
    const activeColor = isLight ? '#6366f1' : '#8b5cf6'; 

    dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let size = dot.baseSize;

        // "Raise" and "Glow" effect
        if (distance < 130) {
            size = 4.5; 
            ctx.fillStyle = activeColor;
            ctx.globalAlpha = 1.0;
        } else {
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = 0.6;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateDots);
}

/**
 * 2. 3D LOGO SPHERE INITIALIZATION
 * Force-injects <img> tags into the TagCloud
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

    // Wrap icons in div to ensure HTML rendering
    const skillElements = skills.map(s => 
        `<div class="tagcloud--item" data-name="${s.name}"><img src="${s.icon}" alt="${s.name}"></div>`
    );

    const options = {
        radius: 260,
        maxSpeed: 'fast',
        initSpeed: 'normal',
        direction: 135,
        keep: true,
        useHTML: true // This is the switch that fixes text vs images
    };

    if (typeof TagCloud !== 'undefined') {
        TagCloud('.tagcloud', skillElements, options);
    }
}

/**
 * 3. HOBBY PORTRAIT SWAPPER
 */
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

/**
 * 4. THEME & AI UTILS
 */
function toggleTheme() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
}

function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    if (!input.value) return;
    
    display.innerHTML = `<div class="bot-bubble">NEEL-AI: Scanning request... User verified. Systems optimal.</div>`;
    input.value = '';
}

/**
 * 5. INITIALIZATION ON LOAD
 */
window.onload = () => {
    window.onresize(); 
    animateDots();     
    initLogoSphere();  

    // Bangalore IST Clock
    setInterval(() => {
        const time = new Date().toLocaleTimeString('en-GB', { 
            timeZone: 'Asia/Kolkata', 
            hour12: false 
        });
        document.getElementById('time-display').innerText = time + " IST";
    }, 1000);
};
