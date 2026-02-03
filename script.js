window.onload = () => {
    // 1. Define the tags as plain text first
    const myTags = [
        'Python', 'HTML5', 'CSS3', 'JavaScript', 
        'React', 'SQL', 'C', 'C++', 'Java', 
        'Git', 'Docker', 'Vercel'
    ];

    // 2. Map those names to their specific SVG icon URLs
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
        'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg'
    };

    const container = '.tagcloud';
    const options = {
        radius: window.innerWidth < 700 ? 150 : 250,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true
    };

    // Initialize the library with text
    TagCloud(container, myTags, options);

    // 3. THE FIX: Loop through the created items and swap text for <img>
    const elements = document.querySelectorAll('.tagcloud--item');
    elements.forEach(el => {
        const name = el.innerText.trim();
        if (iconMap[name]) {
            // Clear the text and inject the image
            el.innerHTML = `<img src="${iconMap[name]}" width="45" alt="${name}" title="${name}" style="pointer-events: none; filter: brightness(0.9);">`;
        }
    });
};

// --- THEME SWITCHER ---
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// --- REAL-TIME CLOCK (+5:30 GMT) ---
function updateTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    try {
        const timeString = new Intl.DateTimeFormat('en-GB', options).format(new Date());
        const display = document.getElementById('time-display');
        if (display) {
            display.textContent = `${timeString} +5:30 GMT`;
        }
    } catch (e) {
        console.error("Clock error:", e);
    }
}
setInterval(updateTime, 1000);
updateTime();

// --- PHOTO SWAP ---
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
