/**
 * Neel Nikhil Portfolio - Core Logic
 * - 3D Logo Globe (TagCloud)
 * - Theme Switcher
 * - Coordinate-based Time
 * - RGB Hobby Image Swap
 */

window.onload = () => {
    // 1. INITIALIZE TECH GLOBE WITH LOGOS
    // We use DevIcon SVGs to ensure high quality and fast loading
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
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" title="Vercel">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" title="Git">',
        '<img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" title="Docker">'
    ];

    const container = '.tagcloud';
    const options = {
        radius: window.innerWidth < 700 ? 160 : 250, // Responsive sizing
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true,
        useHTML: true // Allows the <img> tags to render properly
    };

    // Initialize TagCloud only if the container exists
    if (document.querySelector(container)) {
        TagCloud(container, myTags, options);
    }
};

// --- 2. THEME SWITCHER ---
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// --- 3. BANGALORE REAL-TIME CLOCK (+5:30 GMT) ---
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
        console.error("Time update failed", e);
    }
}

// Update clock every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// --- 4. HOBBY PHOTO SWAP ---
/**
 * Switches the main portrait image based on hover.
 * The RGB effect is handled via CSS transitions on the filter property.
 */
function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;

    const images = {
        'coding': 'coding-me.jpg',
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };

    // Update the image source
    img.src = images[type] || images['default'];
}
