window.onload = () => {
    /**
     * 1. 3D TAG CLOUD INITIALIZATION
     * Syncs with the .mesh-sphere in your CSS
     */
    const myTags = [
        'JavaScript', 'Python', 'React', 'Next.js', 
        'MongoDB', 'Tailwind', 'Node.js', 'TypeScript', 
        'GitHub', 'Figma', 'Docker', 'AWS', 'SQL', 'C++'
    ];
    
    const container = '.tagcloud';
    const options = {
        radius: 230,           // Radius in pixels
        maxSpeed: 'fast',      // Rotation speed
        initSpeed: 'fast',
        direction: 135,        // Initial direction 
        keep: true             // Keep rotating after mouse leaves
    };

    // Initialize the library
    TagCloud(container, myTags, options);
};

/**
 * 2. NEEL-AI CHATBOX LOGIC
 * Handles user input and provides "hacker-style" responses
 */
function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    const userText = input.value.trim();

    if (!userText) return;

    // Append User Message to display
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "align-self: flex-end; background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 12px 12px 0 12px; font-size: 0.85rem; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.1);";
    userDiv.innerText = userText;
    display.appendChild(userDiv);

    // AI logic response mapping
    let response = "I'm analyzing Neel's data... He is currently focused on high-performance Frontend Architectures.";
    const query = userText.toLowerCase();

    if (query.includes('skill') || query.includes('tech')) {
        response = "Neel is an expert in React, Next.js, and Python. He loves building geometric 3D UI like the one below.";
    } else if (query.includes('experience') || query.includes('work')) {
        response = "Neel has experience scaling 0-to-1 products and optimizing web performance for global users.";
    } else if (query.includes('contact') || query.includes('hire')) {
        response = "You can reach Neel via the 'Book a Call' button or find him on LinkedIn.";
    } else if (query.includes('bangalore') || query.includes('location')) {
        response = "Neel is based in Bangalore, India—the Silicon Valley of Asia. Check the coordinates in his bento grid!";
    }

    // Delayed "Bot Typing" Effect
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = "bot-bubble";
        botDiv.innerText = response;
        display.appendChild(botDiv);
        
        // Auto-scroll to bottom
        display.scrollTop = display.scrollHeight;
    }, 600);

    // Clear input
    input.value = '';
}

// Allow "Enter" key to send message
document.getElementById('ai-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askAI();
});

/**
 * 3. REAL-TIME BANGALORE CLOCK
 * Updates every second to match IST
 */
function updateClock() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        timeDisplay.innerText = formatter.format(now) + " IST";
    }
}
setInterval(updateClock, 1000);
updateClock();

/**
 * 4. BENTO GRID PORTRAIT SWAP
 * Swaps Neel's portrait when hovering over hobby keywords
 */
function showHobby(type) {
    const img = document.getElementById('main-photo');
    if (!img) return;

    // Mapping keys to image paths
    const images = {
        'coding': 'coding-neel.jpg',
        'chess': 'chess-neel.jpg',
        'snooker': 'snooker-neel.jpg',
        'default': 'me.jpg'
    };

    // Smooth transition: brief fade out/in (optional)
    img.style.opacity = '0.7';
    setTimeout(() => {
        img.src = images[type] || images['default'];
        img.style.opacity = '1';
    }, 100);
}
