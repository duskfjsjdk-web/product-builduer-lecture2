const paletteContainer = document.querySelector('.palette-container');
const generateBtn = document.getElementById('generate-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDisplay = document.querySelector('.messages-display');


// --- DIAGNOSTICS START ---
console.log("Script starting...");
console.log("Does the message input exist?", messageInput);
console.log("Does the send button exist?", sendBtn);
console.log("Does the message display area exist?", messagesDisplay);
// --- DIAGNOSTICS END ---


const generateRandomColor = () => {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
};

const generatePalette = () => {
    const palette = [];
    for (let i = 0; i < 5; i++) {
        palette.push(generateRandomColor());
    }
    return palette;
};

const displayPalette = () => {
    const palette = generatePalette();
    paletteContainer.innerHTML = '';
    palette.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.style.backgroundColor = color;

        const colorHex = document.createElement('div');
        colorHex.classList.add('color-hex');
        colorHex.textContent = color;

        colorCard.appendChild(colorHex);
        paletteContainer.appendChild(colorCard);

        colorCard.addEventListener('click', () => {
            copyToClipboard(color);
        });
    });
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied ${text} to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

const sendMessage = () => {
    console.log("Attempting to send message..."); // Check if function is called
    const message = messageInput.value.trim();
    if (message) {
        console.log("Message has content:", message); // Check message content
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-item');
        messageElement.textContent = message;
        messagesDisplay.appendChild(messageElement);
        messageInput.value = '';
    } else {
        console.log("Message is empty. Nothing to send."); // Check if message is empty
    }
};

if (messageInput && sendBtn && messagesDisplay) {
    console.log("All elements found. Attaching event listeners.");
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    sendBtn.addEventListener('click', sendMessage);
} else {
    console.error("CRITICAL ERROR: One or more essential HTML elements were not found. The application cannot run correctly.");
}

if(generateBtn){
    generateBtn.addEventListener('click', displayPalette);
}


// Initial palette display
displayPalette();
