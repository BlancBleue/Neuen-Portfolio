const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themes = ['dark', 'light', 'neutral'];
let themeIndex = 0;

themeToggle.onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    body.setAttribute('data-theme', themes[themeIndex]);
};

// --- GRID DISPLACEMENT ---
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width, height, dots = [];
const spacing = 35;
const mouse = { x: -1000, y: -1000 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            dots.push({ baseX: x, baseY: y, x: x, y: y });
        }
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    const theme = body.getAttribute('data-theme');
    ctx.fillStyle = theme === 'neutral' ? 'rgba(192, 132, 252, 0.4)' : theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';
    dots.forEach(d => {
        const dx = mouse.x - d.baseX;
        const dy = mouse.y - d.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
            const force = (180 - dist) / 180;
            const angle = Math.atan2(dy, dx);
            d.x = d.baseX - Math.cos(angle) * force * 20;
            d.y = d.baseY - Math.sin(angle) * force * 20;
            ctx.beginPath(); ctx.arc(d.x, d.y, 1.5 + force * 3, 0, Math.PI * 2); ctx.fill();
        } else {
            d.x = d.baseX; d.y = d.baseY;
            ctx.beginPath(); ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
    });
    requestAnimationFrame(render);
}

// --- LIVE MAP SETUP ---
function initMap() {
    const bangaloreCoords = [12.9716, 77.5946];
    const map = L.map('map', {
        center: bangaloreCoords,
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    
    // Add a custom marker/circle for your location
    L.circleMarker(bangaloreCoords, {
        radius: 8,
        fillColor: "#22d3ee",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);
}

window.onmousemove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
window.onresize = init;

const askForm = document.getElementById('ask-form');
const aiResponse = document.getElementById('ai-response');
askForm.onsubmit = (e) => {
    e.preventDefault();
    aiResponse.classList.add('active');
    aiResponse.textContent = "Neel is currently working on advanced UI systems in Bangalore.";
};

init(); render(); initMap();
