/**
 * 1. REACTIVE DOT ENGINE
 * Creates the interactive background that grows when the mouse is near.
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
    const dotColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)';
    const activeColor = isLight ? '#6366f1' : '#8b5cf6';

    dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let size = dot.baseSize;

        if (dist < 120) {
            size = 4.5; // The "Raise" effect
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
 * 2. 3D LOGO SPHERE (FIXED INJECTION)
 * Ensures <img> tags are correctly rendered in the sphere.
 */
function initLogoSphere() {
    const skills = [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'JS', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'TS', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { name: 'Mongo', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'Node', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' }
    ];

    // Wrap in standard format for TagCloud
    const skillElements = skills.map(s => 
        `<img src="${s.icon}" width="60" height="60" alt="${s.name}" class="sphere-logo">`
    );

    const options = {
        radius: 260,
        maxSpeed: 'fast',
        initSpeed: 'normal',
        direction: 135,
        keep: true,
        useHTML: true // CRITICAL: This allows the <img> tags to show
    };

    if (window.TagCloud) {
        TagCloud('.tagcloud', skillElements, options);
    }
}

/**
 * 3. NAV BLOCK INTERACTION
 * Moves the underline smoothly across the glassmorphic block.
 */
function setupNav() {
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

    document.querySelector('.nav-links').addEventListener('mouseleave', () => {
        underline.style.opacity = '0';
    });
}

/**
 * 4. UTILITIES (Theme, Time, AI, Hobbies)
 */
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
}

function showHobby(type) {
    const img = document.getElementById('main-photo');
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
    const display = document.getElementById('chat-display');
    const input = document.getElementById('ai-input');
    if (!input.value) return;

    display.innerHTML = `<div class="bot-bubble">NEEL-AI: Scanning request... User verified. Systems optimal.</div>`;
    input.value = '';
}

// INITIALIZE ALL SYSTEMS
window.onload = () => {
    window.onresize();
    animateDots();
    initLogoSphere();
    setupNav();
    
    // Bangalore Time Update
    setInterval(() => {
        const time = new Date().toLocaleTimeString('en-GB', { 
            timeZone: 'Asia/Kolkata', 
            hour12: false 
        });
        const display = document.getElementById('time-display');
        if (display) display.innerText = time + " IST";
    }, 1000);
};
