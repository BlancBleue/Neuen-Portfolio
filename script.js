window.onload = () => {
    // 1. Array of technology names
    const myTags = [
        'Python', 'HTML5', 'CSS3', 'JavaScript', 
        'React', 'SQL', 'C', 'C++', 'Java', 
        'Git', 'Docker', 'Vercel', 'Next.js', 'Node.js'
    ];

    // 2. Map names to high-quality SVG Icons
    const iconMap = {
        'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
        'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
        'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    };

    const container = '.tagcloud';
    const options = {
        radius: window.innerWidth < 700 ? 160 : 260,
        maxSpeed: 'fast',
        initSpeed: 'normal',
        direction: 135,
        keep: true
    };

    // Initialize the library
    TagCloud(container, myTags, options);

    // 3. MANUAL INJECTION FIX: Replace text with Icon + Label
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
};

// --- CORE UTILITIES ---

function toggleTheme() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function updateTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', hour12: false, 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    const display = document.getElementById('time-display');
    if (display) display.textContent = `${timeStr} +5:30 GMT`;
}
setInterval(updateTime, 1000);
updateTime();

function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;
    const images = {
        'coding': 'coding-me.jpg',
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };
    img.src = images[type] || images['default'];
}
