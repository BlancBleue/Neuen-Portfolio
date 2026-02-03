/**
 * 1. PERSISTENT THEME TOGGLE
 * Switches between Dark and Light mode and saves preference
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
 * Adds the 'scrolled' class when page is moved
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
 * 3. AI TERMINAL LOGIC
 * Processes user queries with customized responses
 */
function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('chat-display');
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    // Show User Query
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "align-self: flex-end; color: var(--txt); opacity: 0.5; font-size: 0.8rem; margin-bottom: 10px; text-align: right; width: 100%;";
    userDiv.innerText = `QUERY: ${input.value}`;
    display.appendChild(userDiv);

    // AI logic response mapping
    let response = "NEEL-AI: Analyzing... Neel is currently specialized in high-performance React architectures.";
    
    if (query.includes('skill') || query.includes('tech')) {
        response = "NEEL-AI: Tech stack verified: React, Next.js, Python, and TypeScript.";
    } else if (query.includes('location') || query.includes('bangalore')) {
        response = "NEEL-AI: Current coordinates: 12.9716° N, 77.5
        
