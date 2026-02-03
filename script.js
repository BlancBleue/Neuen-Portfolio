// --- 1. THEME TOGGLE ---
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
}

// --- 2. TIME & COORDINATE UPDATE ---
function updateTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const timeString = formatter.format(new Date());
    const display = document.getElementById('time-display');
    if (display) {
        display.textContent = `${timeString} +5:30 GMT`;
    }
}
setInterval(updateTime, 1000);
updateTime();

// --- 3. PHOTO SWAP (HOBBIES) ---
function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;
    
    const images = {
        'coding': 'coding-me.jpg',
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };
    
    // Smoothly swap the source
    img.src = images[type] || images['default'];
}

// --- 4. INTERACTIVE DOT GRID BACKGROUND ---
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];
let mouse = { x: -1000, y: -1000 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    // Creating a grid of dots every 32 pixels
    for (let x = 0; x < canvas.width; x += 32) {
        for (let y = 0; y < canvas.height; y += 32) {
            dots.push({ x, y });
        }
    }
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    dots.forEach(d => {
        let dist = Math.sqrt((mouse.x - d.x)**2 + (mouse.y - d.y)**2);
        
        if (dist < 100) {
            // Interactive "Raise" state
            ctx.fillStyle = isDark ? '#22d3ee' : '#4f46e5';
            ctx.beginPath();
            ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Idle state
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.arc(d.x, d.y, 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(drawDots);
}

// --- 5. INITIALIZE ON LOAD ---
window.onload = () => {
    // Initialize 3D Tech Globe
    const myTags = [
        'Python', 'HTML5', 'CSS', 'Vanilla JS', 'React', 'SQL', 
        'C', 'C+', 'C++', 'Java', 'Vercel', 'Git', 'Docker'
    ];

    const container = '.tagcloud';
    const options = {
        radius: window.innerWidth < 700 ? 150 : 280,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
    };

    // Only initialize if the element exists to avoid console errors
    if (document.querySelector(container)) {
        TagCloud(container, myTags, options);
    }
};

// Handle window resizing
window.onresize = initCanvas;

// Start the background animation
initCanvas();
drawDots();
