window.onload = () => {
    // 1. THE TECH LOGOS 
    const myTags = [
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" title="Python">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" title="HTML5">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" title="CSS3">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" title="JavaScript">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" title="SQL">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" title="C">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" title="C++">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" title="Java">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" title="Git">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" title="Docker">'
    ];

    // 2. INITIALIZE TAGCLOUD
    const container = '.tagcloud';
    const options = {
        radius: window.innerWidth < 700 ? 150 : 250,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true,
        useHTML: true // This MUST be true to render images
    };

    // Initialize the globe
    try {
        TagCloud(container, myTags, options);
    } catch (err) {
        console.error("Globe failed to load:", err);
    }
};

// --- THEME SWITCHER ---
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}

// --- CLOCK LOGIC ---
function updateTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const timeString = formatter.format(new Date());
    const display = document.getElementById('time-display');
    if (display) {
        display.textContent = `${timeString} +5:30 GMT`;
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
