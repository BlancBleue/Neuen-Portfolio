/**
 * 1. THEME TOGGLE LOGIC
 * Switches between 'dark' and 'light' modes
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    // Optional: Save preference to localStorage
    localStorage.setItem('portfolio-theme', newTheme);
}

/**
 * 2. HEADER SCROLL EFFECT
 * Adds 'scrolled' class to header to trigger CSS color/blur changes
 */
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/**
 * 3. NEEL-AI CHATBOX LOGIC
 * Handles user questions and generates responses
 */
function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    const val = input.value.trim();

    if (!val) return;

    // Show User Message
    const userMsg = document.createElement('div');
    userMsg.style.cssText = "align-self: flex-end; color: #fff; font-size: 0.85rem; margin-bottom: 8px; opacity: 0.8;";
    userMsg.innerText = `You: ${val}`;
    display.appendChild(userMsg);

    // AI Response Logic
    let response = "I'm Neel's AI twin. I'm currently analyzing that request...";
    const query = val.toLowerCase();

    if (query.includes('skill') || query.includes('tech')) {
        response = "Neel specializes in React, Next.js, and Python. He's a beast at Frontend Architecture.";
    } else if (query.includes('location') || query.includes('bangalore')) {
        response = "He's based in Bangalore, India—the 12.9716° N, 77.5946° E coordinates in the grid.";
    } else if (query.includes('experience')) {
        response = "Neel has a history of building scalable products from 0 to 1 with a focus on clean UI.";
    }

    // Delayed "Bot Typing" Effect
    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = "bot-bubble";
        botBubble.innerText = response;
        display.appendChild(botBubble);
        display.scrollTop = display.scrollHeight; // Auto-scroll
    }, 500);

    input.value = '';
}

// Allow "Enter" key for AI input
document.getElementById('ai-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askAI();
});

/**
 * 4. REAL-TIME BANGALORE CLOCK (IST)
 */
function updateTime() {
    const clock = document.getElementById('time-display');
    if (clock) {
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const now = new Intl.DateTimeFormat('en-GB', options).format(new Date());
        clock.innerText = `${now} IST`;
    }
}
setInterval(updateTime, 1000);

/**
 * 5. PHOTO SWAPPER (BENTO GRID)
 */
function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;

    const images = {
        'coding': 'coding-me.jpg', // Replace with your actual paths
        'chess': 'chess-me.jpg',
        'snooker': 'snooker-me.jpg',
        'default': 'me.jpg'
    };

    img.style.opacity = '0.5';
    setTimeout(() => {
        img.src = images[type] || images['default'];
        img.style.opacity = '1';
    }, 150);
}

/**
 * 6. 3D SPHERE INITIALIZATION
 */
window.onload = () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    const myTags = [
        'JavaScript', 'CSS', 'Python', 'React', 'Next.js', 
        'MongoDB', 'Tailwind', 'Git', 'TypeScript', 'Node.js', 
        'AWS', 'SQL', 'C++', 'Figma'
    ];
    
    const container = '.tagcloud';
    const options = {
        radius: 230,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
    };

    // Ensure TagCloud library is loaded via CDN in HTML
    if (typeof TagCloud !== 'undefined') {
        TagCloud(container, myTags, options);
    }

    updateTime(); // Initial clock call
};
