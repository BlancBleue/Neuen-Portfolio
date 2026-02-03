function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('ai-input');
    const res = document.getElementById('ai-response');
    if(input.value.trim() !== "") {
        res.style.display = 'block';
        res.innerHTML = `✦ Neel is currently architecting systems in Bangalore. Try asking about his Next.js projects!`;
        input.value = "";
    }
}

function showHobby(type) {
    const img = document.getElementById('main-photo');
    
    // Define the images for each state
    const images = {
        'coding': 'coding-me.jpg',
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };

    // Update the image source based on the type, fallback to default
    img.src = images[type] || images['default'];

    // Ensure it stays grayscale
    img.style.filter = 'grayscale(1)';
    
    // Optional: Add a slight brightness boost on hover to show interaction
    if (type !== 'default') {
        img.style.filter = 'grayscale(1) brightness(1.1)';
    }
}

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
        v: Math.random() * 0.4 + 0.1
    }));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
    dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        ctx.fill();
        d.y -= d.v;
        if(d.y < 0) d.y = canvas.height;
    });
    requestAnimationFrame(draw);
}

window.onresize = init;
init();
draw();
