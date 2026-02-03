window.onload = () => {
    const myTags = ['Python', 'HTML5', 'CSS3', 'JavaScript', 'React', 'SQL', 'C++', 'Java', 'Git', 'Docker', 'Vercel', 'Next.js'];

    const iconMap = {
        'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
        'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    };

    const container = '.tagcloud';
    const options = {
        radius: window.innerWidth < 700 ? 160 : 250,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        keep: true
    };

    TagCloud(container, myTags, options);

    // Swap text for Icons
    const items = document.querySelectorAll('.tagcloud--item');
    items.forEach(el => {
        const text = el.innerText.trim();
        if (iconMap[text]) {
            el.innerHTML = `
                <div class="icon-box">
                    <img src="${iconMap[text]}" alt="${text}">
                    <span class="icon-name">${text}</span>
                </div>
            `;
        }
    });

    // --- WEB CONNECT LOGIC (Canvas) ---
    const globeWrapper = document.querySelector('.globe-wrapper');
    const canvas = document.createElement('canvas');
    canvas.id = 'web-canvas';
    globeWrapper.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = globeWrapper.offsetWidth;
        canvas.height = globeWrapper.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rect = canvas.getBoundingClientRect();
        const nodes = Array.from(document.querySelectorAll('.tagcloud--item img'));
        
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent');
        ctx.lineWidth = 0.5;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const b1 = nodes[i].getBoundingClientRect();
                const b2 = nodes[j].getBoundingClientRect();

                const x1 = b1.left + b1.width / 2 - rect.left;
                const y1 = b1.top + b1.height / 2 - rect.top;
                const x2 = b2.left + b2.width / 2 - rect.left;
                const y2 = b2.top + b2.height / 2 - rect.top;

                const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                // Only draw lines if they are somewhat close (the "Web" effect)
                if (dist < 200) {
                    ctx.globalAlpha = 1 - (dist / 200); // Fade lines based on distance
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawLines);
    }
    drawLines();
};

// Utilities
function toggleTheme() {
    document.body.setAttribute('data-theme', document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function updateTime() {
    const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
    const display = document.getElementById('time-display');
    if (display) display.textContent = `${time} +5:30 GMT`;
}
setInterval(updateTime, 1000);
updateTime();

function showHobby(type) {
    const img = document.getElementById('main-photo');
    const images = { 'coding': 'coding-me.jpg', 'chess': 'chess-me.jpg', 'snooker': 'snooker-me.jpg', 'default': 'me.jpg' };
    if (img) img.src = images[type] || images['default'];
}
