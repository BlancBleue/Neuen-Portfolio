window.onload = () => {
    // 1. Array of technology names (Used as keys for the icons)
    const myTags = [
        'Python', 'HTML5', 'CSS3', 'JavaScript', 
        'React', 'SQL', 'C++', 'Java', 
        'Git', 'Docker', 'Vercel', 'Next.js'
    ];

    // 2. Icon source mapping
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
        // Radius matches the CSS wireframe size for a 'connected' look
        radius: window.innerWidth < 700 ? 160 : 250, 
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true
    };

    // Initialize TagCloud with text tags
    TagCloud(container, myTags, options);

    // 3. THE FIX: Replace text tags with HTML (Icons + Labels)
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

/**
 * THEME SWITCHER
 * Swaps between 'dark' and 'light' data-themes
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}

/**
 * REAL-TIME CLOCK
 * Formats time for Bangalore (GMT +5:30)
 */
function updateTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    try {
        const timeStr = new Intl.DateTimeFormat('en-GB', options).format(new Date());
        const display = document.getElementById('time-display');
        if (display) {
            display.textContent = `${timeStr} +5:30 GMT`;
        }
    } catch (e) {
        console.error("Clock Update Failed:", e);
    }
}
setInterval(updateTime, 1000);
updateTime();

/**
 * HOBBY PHOTO SWAP
 * Changes the portrait image on hover of mindset keywords
 */
function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;

    // Map hobby keys to your local image filenames
    const images = {
        'coding': 'coding-me.jpg',
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };

    img.src = images[type] || images['default'];
}
