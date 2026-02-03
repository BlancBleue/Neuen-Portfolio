// 1. Theme Toggle Logic
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    
    // Optional: Save preference to localStorage
    localStorage.setItem('portfolio-theme', newTheme);
}

// 2. Hobby Photo Switcher 
// Matches your filenames: coding-me.jpg, chess-me.jpg, snooker-me.jpg
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
        // Apply image from the object
        hobbyLayer.style.backgroundImage = hobbyPhotos[type];
        
        // Ensure aesthetic alignment matches the CSS "Top-Aligned" look
        hobbyLayer.style.backgroundSize = "cover";
        hobbyLayer.style.backgroundPosition = "top center"; 
        
        // Cross-fade effect
        hobbyLayer.style.opacity = "1";
        mainPhoto.style.opacity = "0"; 
    }
}

// 3. AI Digital Twin Search (Typing Effect)
function handleSearch(event) {
    event.preventDefault();
    const input = document.getElementById('ai-input');
    const res = document.getElementById('ai-response');
    
    // Custom response from your "Digital Twin"
    const responseText = `✦ Neel is currently architecting systems in Bangalore. Try hovering over his "Mindset" card to see his hobbies!`;
    
    if(input.value.trim() !== "") {
        res.style.display = 'block';
        res.innerHTML = ""; // Reset box
        
        let i = 0;
        function typeWriter() {
            if (i < responseText.length) {
                res.innerHTML += responseText.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Typing speed in ms
            }
        }
        typeWriter();
        input.value = ""; // Clear search bar
    }
}

// 4. Background Canvas (Floating Dots Animation)
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let dots = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create 60 particles
    dots = Array.from({length: 60}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        velocity: Math.random() * 0.4 + 0.1
    }));
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
    
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move dots upward
        dot.y -= dot.velocity;
        
        // Reset dots to bottom when they leave the screen
        if (dot.y < 0) {
            dot.y = canvas.height;
            dot.x = Math.random() * canvas.width;
        }
    });
    
    requestAnimationFrame(animateDots);
}

// Handle resizing and initial load
window.addEventListener('resize', initCanvas);
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) document.body.setAttribute('data-theme', savedTheme);
    
    initCanvas();
    animateDots();
});
