// Theme Toggle
const btn = document.getElementById('theme-btn');
btn.onclick = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
};

// AI Form
const form = document.getElementById('ai-form');
const input = document.getElementById('ai-input');
const res = document.getElementById('ai-response');

form.onsubmit = (e) => {
    e.preventDefault();
    if(!input.value) return;
    res.style.display = 'block';
    res.innerText = `Thinking... Neel Nikhil is currently taking on new projects in Bangalore. Focus: Fullstack & AI.`;
    input.value = '';
};

// Ultra-Light Background
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    for(let i=0; i<50; i++) {
        dots.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height });
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = document.body.getAttribute('data-theme') === 'light' ? '#000' : '#fff';
    dots.forEach(d => {
        ctx.globalAlpha = 0.2;
        ctx.beginPath(); ctx.arc(d.x, d.y, 1, 0, Math.PI*2); ctx.fill();
        d.y -= 0.2;
        if(d.y < 0) d.y = canvas.height;
    });
    requestAnimationFrame(draw);
}

window.onresize = init;
init(); draw();
