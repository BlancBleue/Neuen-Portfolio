window.onload = () => {
    // 1. Initial tag list
    const myTags = ['Python', 'HTML5', 'CSS3', 'JavaScript', 'React', 'SQL', 'C++', 'Java', 'Git', 'Docker', 'Vercel', 'Next.js'];

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
        radius: window.innerWidth < 700 ? 150 : 250,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true
    };

    // Initialize the library
    TagCloud(container, myTags, options);

    // Replace text tags with formatted Icon + Label
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

// Global Utilities
function toggleTheme() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function updateTime() {
    const time = new Intl.DateTimeFormat('en-GB', { 
        timeZone: 'Asia/Kolkata', hour12: false, 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    }).format(new Date());
    const display = document.getElementById('time-display');
    if (display) display.textContent = `${time} +5:30 GMT`;
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
