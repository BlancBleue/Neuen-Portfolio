/**
 * 1. THEME TOGGLE & PERSISTENCE
 * Handles switching between Dark and Light mode
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('selected-theme', newTheme);
}

/**
 * 2. DYNAMIC HEADER SCROLL LOGIC
 * Triggers the color shift and blur when the user scrolls
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
 * 3. NEEL-AI CHATBOX LOGIC
 * Manages user input and generates AI responses
 */
function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    // Display user query
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "align-self: flex-end; color: var(--txt); opacity: 0.6; font-size: 0.8rem; margin-bottom: 8px; text-align: right;";
    userDiv.innerText = `You: ${input.value}`;
    display.appendChild(userDiv);

    // AI logic response mapping
    let response = "Analyzing data... Neel is currently optimizing high-end web architectures.";
    
    if (query.includes('skill') || query.includes('tech')) {
        response = "Neel's core stack includes React, Next.js, and Python. He specializes in geometric UI/UX.";
    } else if (query.includes('location') || query.includes('bangalore')) {
        response = "He is based in Bangalore, India. Check the real-time clock and coordinates in the bento grid!";
    } else if (query.includes('contact') || query.includes('hire')) {
        response = "You can book a call with Neel using the button in the top right corner.";
    }

    // Delay response to simulate "thinking"
    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = "bot-bubble";
        botBubble.innerText = response;
        display.appendChild(botBubble);
        
        // Auto-scroll to the newest message
        display.scrollTop = display.scrollHeight;
    }, 500);

    input.value = '';
}

// Enable "Enter" key for AI input
document.getElementById('ai-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askAI();
});

/**
 * 4. BANGALORE REAL-TIME CLOCK (IST)
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
        const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
        clockElement.innerText = `${timeString} IST`;
    }
}
setInterval(updateClock, 1000);

/**
 * 5. BENTO GRID HOBBY INTERACTION
 */
function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;

    const images = {
        'coding': 'coding-portrait.jpg',
        'chess': 'chess-portrait.jpg',
        'default': 'me.jpg'
    };

    img.style.opacity = '0.4';
    setTimeout(() => {
        img.src = images[type] || images['default'];
        img.style.opacity = '1';
    }, 150);
}

/**
 * 6. 3D SPHERE INITIALIZATION (TAGCLOUD)
 */
window.onload = () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    const myTags = [
        'JavaScript', 'Python', 'React', 'Next.js', 
        'MongoDB', 'Tailwind', 'Node.js', 'TypeScript', 
        'Figma', 'AWS', 'Docker', 'Git', 'SQL', 'Redux'
    ];
    
    const container = '.tagcloud';
    const options = {
        radius: 240,            // Matches CSS mesh-sphere size
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
    };

    // Initialize TagCloud
    if (typeof TagCloud !== 'undefined') {
        TagCloud(container, myTags, options);
    }

    updateClock(); // Initial clock call
};
