const askForm = document.getElementById('ask-form');
const askInput = document.getElementById('ask-input');
const responseShell = document.getElementById('ai-response');
const responseText = responseShell.querySelector('.response-text');
const typingIndicator = responseShell.querySelector('.typing-indicator');

askForm.onsubmit = (e) => {
    e.preventDefault();
    const query = askInput.value.trim();
    if(!query) return;

    // Show shell and loader
    responseShell.classList.add('active');
    responseText.textContent = "";
    typingIndicator.style.display = 'flex';

    // Simulated "Processing"
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        responseText.textContent = `Thinking about "${query}"... Neel is currently Busy. He'll get back to you soon.`;
        askInput.value = "";
    }, 1200);
};
