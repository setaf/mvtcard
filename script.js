const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainImage = document.getElementById('main-image');
const question = document.getElementById('question');
const heartsContainer = document.querySelector('.hearts-container');

// --- MESSAGES ---
const messages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Plsss? :( You're breaking my heart",
];

// --- SAD IMAGES ---
const sadGifs = [
    "sad1.gif",
    "sad2.gif",
    "sad3.gif",
    "sad4.gif",
    "sad5.gif"
];

// --- STATE VARIABLES ---
let yesFontSize = 1.5; 
let noScale = 1;
let gifIndex = 0; 
let messageIndex = 0;
let moveSpeed = 1; // Start speed 

// Set initial transition in JS so we can update it later
noBtn.style.transition = `all ${moveSpeed}s ease`;

// --- CORE FUNCTIONS ---

// 1. Swap Text and Image (Happens on Hover AND Click)
function updateContent() {
    messageIndex = (messageIndex + 1) % messages.length;
    noBtn.innerText = messages[messageIndex];
    
    mainImage.src = sadGifs[gifIndex];
    gifIndex = (gifIndex + 1) % sadGifs.length;
}

// 2. Move Button (Happens on Hover AND Click)
function moveButton() {
    const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
    const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(10, Math.floor(Math.random() * maxHeight));

    noBtn.style.position = 'fixed'; 
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// 3. Level Up (Happens ONLY on Click)
function makeHarder() {
    // A. Make Yes button BIGGER
    yesFontSize += 5; 
    yesBtn.style.fontSize = `${yesFontSize}rem`;

    // B. Make No button SMALLER
    noScale = noScale * 0.90; // Shrink by 10%
    if (noScale < 0.5) noScale = 0.5; // Min size limit
    noBtn.style.transform = `scale(${noScale})`;

    // C. Make No button FASTER
    moveSpeed = moveSpeed * 0.95; // Speed up by 5%
    noBtn.style.transition = `all ${moveSpeed}s ease`;
}

// --- EVENT LISTENERS ---

// HOVER: Run away + Change Text (But don't get faster)
noBtn.addEventListener('mouseover', () => {
    updateContent();
    moveButton();
});

// CLICK: Run away + Change Text + GET FASTER + SHRINK
noBtn.addEventListener('click', () => {
    makeHarder();
    updateContent();
    moveButton();
});

// YES BUTTON
yesBtn.addEventListener('click', () => {
    mainImage.src = 'success.gif'; 
    question.innerHTML = "Yay! See you on the 14th! ❤️";
    
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    setInterval(createHeart, 100);
});

// --- BACKGROUND HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; 
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    heart.style.fontSize = Math.random() * 20 + 10 + 'px'; 
    
    if (heartsContainer) {
        heartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }
}
setInterval(createHeart, 300);