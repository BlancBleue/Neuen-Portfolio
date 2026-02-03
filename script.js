/**
 * 1. PERSISTENT THEME TOGGLE
 * Switches between Dark and Light mode and saves to local storage
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('neel-portfolio-theme', newTheme);
}

/**
 * 2. DYNAMIC HEADER & COLOR SHIFT
 * Adds a border and background blur as the user scrolls
 */
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/**
 * 3. AI TERMINAL (CURVED CHATBOX) LOGIC
 * Processes user queries and returns specialized responses
 */
function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    // Display user's question
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "align-self: flex-end; color: var(--txt); opacity: 0.5; font-size: 0.8rem; margin-bottom: 10px; text-align: right; width: 100%;";
    userDiv.innerText = `QUERY: ${input.value}`;
    display.appendChild(userDiv);

    // Response logic
    let response = "NEEL-AI: Analyzing request... Data suggests Neel is focused on high-performance Frontend Architectures.";
    
    if (query.includes('skill') || query.includes('tech')) {
        response = "NEEL-AI: Core stack localized. Primary: React, Next.js, Python. Secondary: Tailwind, MongoDB, AWS.";
    } else if (query.includes('location') || query.includes('bangalore')) {
        response = "NEEL-AI: Geolocation confirmed. Bangalore, India. 12.9716° N, 77.5946° E. Check the live IST clock.";
    } else if (query.includes('contact') || query.includes('hire')) {
        response = "NEEL-AI: Communication protocol ready. Use the 'Book a Call' trigger in the header.";
    }

    // Delayed response effect
    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = "bot-bubble";
        botBubble.innerText = response;
        display.appendChild(botBubble);
        
        // Keep the latest message in view
        display.scrollTop = display.scrollHeight;
    }, 450);

    input.value = '';
}

// Support for Enter Key on AI Input
document.getElementById('ai-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askAI();
});

/**
 * 4. REAL-TIME BANGALORE IST CLOCK
 */
function updateClock() {
    const clockElement = document.getElementById('time-display');
    if (clockElement) {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        clockElement.innerText = `${formatter.format(now)} IST`;
    }
}
setInterval(updateClock, 1000);

/**
 * 5. BENTO GRID PORTRAIT SWAPPER
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

    img.style.opacity = '0.3';
    setTimeout(() => {
        img.src = images[type] || images['default'];
        img.style.opacity = '1';
    }, 150);
}

/**
 * 6. 3D SKILLS SPHERE INITIALIZATION
 */
window.onload = () => {
    // Apply saved theme preference
    const savedTheme = localStorage.getItem('neel-portfolio-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    const myTags = [
        'JavaScript', 'Python', 'React', 'Next.js', 
        'MongoDB', 'Tailwind', 'Node.js', 'TypeScript', 
        'Figma', 'AWS', 'Docker', 'Git', 'Redux', 'SQL'
    ];
    
    const container = '.tagcloud';
    const options = {
        radius: 260, // Sits inside the 550px mesh-sphere
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
    };

    // Initialize the library
    if (typeof TagCloud !== 'undefined') {
        TagCloud(container, myTags, options);
    }

    updateClock(); // Start the IST clock immediately
};
