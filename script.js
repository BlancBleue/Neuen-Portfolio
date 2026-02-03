/**
 * 1. DYNAMIC DOT BACKGROUND
 * Responsive canvas grid that reacts to mouse movement.
 */
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];
const mouse = { x: -1000, y: -1000 };

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDots();
};

window.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
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
    const dotColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';
    const activeColor = isLight ? '#6366f1' : '#8b5cf6';

    dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let size = dot.baseSize;

        if (dist < 120) {
            size = 4.5;
            ctx.fillStyle = activeColor;
        } else {
            ctx.fillStyle = dotColor;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateDots);
}

/**
 * 2. 3D LOGO SPHERE (STABILIZED)
 * Uses a delay to ensure the DOM is ready and force-displays <img> tags.
 */
function initLogoSphere() {
    const skills = [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' }
    ];

    const container = document.querySelector('.tagcloud');
    if (!container) return;

    // Slight delay to ensure CDN icons are fetched and DOM is painted
    setTimeout(() => {
        container.innerHTML = ""; // Clear "ghost" text
        
        const skillElements = skills.map(s => 
            `<img src="${s.icon}" alt="${s.name}" title="${s.name}" class="sphere-logo">`
        );

        const options = {
            radius: 250,
            maxSpeed: 'fast',
            initSpeed: 'normal',
            direction: 135,
            keep: true,
            useHTML: true
        };

        if (window.TagCloud) {
            TagCloud('.tagcloud', skillElements, options);
        }
    }, 600);
}

/**
 * 3. GLASS NAV INTERACTION
 * Moves the underline indicator across the curved nav block.
 */
function setupNavInteraction() {
    const navItems = document.querySelectorAll('.nav-item');
    const underline = document.querySelector('.nav-underline');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const { offsetLeft, offsetWidth } = e.target;
            underline.style.left = `${offsetLeft}px`;
            underline.style.width = `${offsetWidth}px`;
            underline.style.opacity = '1';
        });
    });

    const navContainer = document.querySelector('.nav-links');
    if (navContainer) {
        navContainer.addEventListener('mouseleave', () => {
            underline.style.opacity = '0';
        });
    }
}

/**
 * 4. HOBBY PORTRAIT SWAPPER
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
    }, 250);
}

/**
 * 5. CORE INITIALIZATION
 */
window.onload = () => {
    // Canvas Start
    window.onresize();
    animateDots();

    // Features Start
    initLogoSphere();
    setupNavInteraction();

    // Bangalore Time Update
    setInterval(() => {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-GB', { 
                timeZone: 'Asia/Kolkata', 
                hour12: false 
            });
            timeDisplay.innerText = `${time} IST`;
        }
    }, 1000);
};

// Theme Toggle Helper
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// AI Terminal Helper
function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    if (!input || !input.value) return;

    display.innerHTML = `<div class="bot-bubble">NEEL-AI: Scanning request... Protocol accepted. System optimized.</div>`;
    input.value = '';
}
