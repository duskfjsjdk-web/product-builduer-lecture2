const paletteContainer = document.querySelector('.palette-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

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

if(generateBtn){
    generateBtn.addEventListener('click', displayPalette);
}

// Theme Toggle Logic
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    const theme = document.body.getAttribute('data-theme');
    if (theme === 'light') {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Dark Mode';
    }
});

// Initial palette display
displayPalette();
