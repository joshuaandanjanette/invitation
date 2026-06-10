// 1. SET THE DATE
const weddingDate = new Date("Sep 19, 2026 00:00:00").getTime();

// 2. RUN COUNTDOWN
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateElement("days", days);
    updateElement("hours", hours);
    updateElement("minutes", minutes);
    updateElement("seconds", seconds);

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "THE TALE HAS BEGUN";
    }
}, 1000);

function updateElement(id, value) {
    let el = document.getElementById(id);
    if(!el) return;
    let formattedValue = value < 10 ? "0" + value : value;
    if (el.innerHTML != formattedValue) {
        el.innerHTML = formattedValue;
        el.classList.remove("pulse-tick");
        void el.offsetWidth;
        el.classList.add("pulse-tick");
    }
}

// --- 3. YOUTUBE MUSIC CONTROLLER ---
var player;
var playerReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '6n9Cysnoxug',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'loop': 1,
            'mute': 1,
            'playlist': '6n9Cysnoxug'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    event.target.playVideo(); 
}

// --- 4. BREAK THE SEAL & OPEN INVITATION ---
function openInvitation() {
    // 1. Play & Unmute the audio track
    if (playerReady && player) {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
    }

    // 2. Trigger the magical rose petal storm mist
    triggerPetalBurst(45);

    // 3. Fade out the introductory overlay
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        
        // Clean up DOM after animation completes to maximize performance
        setTimeout(() => {
            overlay.remove();
        }, 1500);
    }
}

// Attach the interaction handler securely to the Wax Seal element
document.addEventListener("DOMContentLoaded", () => {
    const sealBtn = document.getElementById('wax-seal');
    if (sealBtn) {
        sealBtn.addEventListener('click', openInvitation);
    }
});

// --- 5. PETAL GENERATORS ---
function createPetal(isBurst = false) {
    const container = document.getElementById('petal-container');
    if (!container) return;
    
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    const randomDepth = Math.random();
    let sizeMultiplier = 1;
    
    if (randomDepth < 0.2) { 
        petal.classList.add('petal-dark'); 
    } else if (randomDepth < 0.4) { 
        petal.classList.add('petal-large'); 
        sizeMultiplier = 2.5; 
    }
    
    // Position differently based on standard gentle fall or rapid burst
    const startX = Math.random() * window.innerWidth;
    const baseSize = (Math.random() * 15) + 15;
    const finalSize = (baseSize * sizeMultiplier) + "px";
    
    petal.style.width = finalSize;
    petal.style.height = finalSize;
    
    if (isBurst) {
        // Center-focused layout during seal explosion
        petal.style.left = (window.innerWidth / 2) + (Math.random() * 200 - 100) + 'px';
        petal.style.top = (window.innerHeight / 2) + (Math.random() * 200 - 100) + 'px';
        petal.style.animationDuration = ((Math.random() * 3) + 4) + "s, " + ((Math.random() * 1) + 1) + "s";
    } else {
        // Standard atmospheric layout
        petal.style.left = startX + 'px';
        petal.style.top = '-100px';
        petal.style.animationDuration = ((Math.random() * 5) + 10) + "s, " + ((Math.random() * 2) + 3) + "s";
    }
    
    container.appendChild(petal);
    
    setTimeout(() => { 
        petal.remove(); 
    }, isBurst ? 5000 : 10000);
}

// Instantly generates a heavy density layer of flying petals on interaction
function triggerPetalBurst(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createPetal(true);
        }, i * 15); // Slight stagger effect so they flash outwards smoothly
    }
}

// Background atmospheric baseline loop
setInterval(() => {
    // Only generate trickle background petals if overlay is already opened/removed
    if (!document.getElementById('intro-overlay')) {
        createPetal(false);
    }
}, 800);
