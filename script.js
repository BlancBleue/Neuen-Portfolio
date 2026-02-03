// 1. Theme Toggle Logic
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// 2. Hobby Photo Switcher
// Make sure these filenames match your images exactly (case-sensitive!)
const hobbyPhotos = {
    'coding': 'url("coding-me.jpg")',
    'chess': 'url("chess-me.jpg")',
    'snooker': 'url("snooker-me.jpg")'
};

function showHobby(type) {
    const mainPhoto = document.getElementById('main-photo');
    const hobbyLayer = document.getElementById('hobby-photo');
    
    if (type === 'default') {
        hobbyLayer.style.opacity = "0";
        mainPhoto.style.opacity = "1";
    } else {
        if (hobbyPhotos[type]) {
            hobbyLayer.style.backgroundImage = hobbyPhotos[type];
            hobbyLayer.style.opacity = "1";
            mainPhoto.style.opacity = "0";
        }
    }
}

// 3. AI Search Bar Mock-up
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

// 4. Background Canvas Animation (The Floating Dots)
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

window.addEventListener('resize', init);
init();
draw();
const hobbyPhotos = {
    'coding': 'url("coding-me.jpg")',
    'chess': 'url("chess-me.jpg")',
    'snooker': 'url("snooker-me.jpg")'
};

function showHobby(type) {
    const mainPhoto = document.getElementById('main-photo');
    const hobbyLayer = document.getElementById('hobby-photo');
    
    if (type === 'default') {
        hobbyLayer.style.opacity = "0";
        mainPhoto.style.opacity = "1";
    } else {
        // Apply the styles directly to ensure the "Top-Aligned" aesthetic stays
        hobbyLayer.style.backgroundImage = hobbyPhotos[type];
        hobbyLayer.style.backgroundSize = "cover";
        hobbyLayer.style.backgroundPosition = "top center"; 
        hobbyLayer.style.opacity = "1";
        mainPhoto.style.opacity = "0"; 
    }
}

// Typing Effect for AI Search
function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('ai-input');
    const res = document.getElementById('ai-response');
    const text = `✦ Neel is architecting systems in Bangalore. Try asking about Snooker or Chess!`;
    
    if(input.value.trim() !== "") {
        res.style.display = 'block';
        res.innerHTML = "";
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                res.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        typeWriter();
        input.value = "";
    }
}
