// --- 1. SAFE BACKGROUND LOADING OF THE YOUTUBE API ---
// This guarantees that the callback hook exists before the API runs, avoiding race crashes.
var player;
var playerReady = false;

window.onYouTubeIframeAPIReady = function() {
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
};

function onPlayerReady(event) {
    playerReady = true;
    try {
        event.target.playVideo();
    } catch(e) {
        console.log("Autoplay context blocked initialization step safely.");
    }
}

// Inject the script tag safely via JavaScript
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// --- 2. WEDDING DATE COUNTDOWN ---
const weddingDate = new Date("Sep 19, 2026 00:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60 * 60)) / 1000);

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


// --- 3. UN-CRASHABLE PORTAL REVEAL SYSTEM ---
function openInvitation() {
    if (window.invitationOpened) return;
    window.invitationOpened = true;

    // Isolate music playback within a try/catch loop so audio block errors never break the button response
    try {
        if (playerReady && player && typeof player.unMute === 'function') {
            player.unMute();
            player.setVolume(100);
            player.playVideo();
        }
    } catch (musicError) {
        console.warn("Audio processing caught safely, continuing transition:", musicError);
    }

    const sealBtn = document.getElementById('wax-seal');
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2 + 150;

    if (sealBtn) {
        const rect = sealBtn.getBoundingClientRect();
        originX = rect.left + (rect.width / 2);
        originY = rect.top + (rect.height / 2);
    }

    // Trigger visual petals
    triggerLushFountainStream(originX, originY, 300);

    // Trigger screen transition
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.classList.add('portal-open');
        setTimeout(() => {
            overlay.remove();
        }, 2200);
    }
}


// --- 4. HARDWARE INPUT BINDINGS ---
function initButtonBinding() {
    const sealBtn = document.getElementById('wax-seal');
    if (sealBtn) {
        sealBtn.addEventListener('click', openInvitation);
        sealBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openInvitation();
        }, { passive: false });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initButtonBinding);
} else {
    initButtonBinding();
}


// --- 5. LUSH PARTICLE FOUNTAIN ENGINE ---
function createFallingPetal() {
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
    
    const startX = Math.random() * window.innerWidth;
    const baseSize = (Math.random() * 15) + 15;
    const finalSize = (baseSize * sizeMultiplier) + "px";
    
    petal.style.left = startX + 'px';
    petal.style.width = finalSize;
    petal.style.height = finalSize;
    petal.style.animationDuration = ((Math.random() * 5) + 10) + "s, " + ((Math.random() * 2) + 3) + "s";
    
    container.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 10000);
}

function createStreamBurstPetal(originX, originY) {
    const container = document.getElementById('petal-container');
    if (!container) return;

    const petal = document.createElement('div');
    petal.classList.add('petal-burst');

    const randomDepth = Math.random();
    let sizeMultiplier = 1;

    if (randomDepth < 0.2) {
        petal.classList.add('petal-dark');
    } else if (randomDepth < 0.45) {
        petal.classList.add('petal-large');
        sizeMultiplier = 2.2;
    }

    const baseSize = (Math.random() * 12) + 14;
    const finalSize = (baseSize * sizeMultiplier) + 'px';
    petal.style.width = finalSize;
    petal.style.height = finalSize;

    petal.style.left = originX + 'px';
    petal.style.top = originY + 'px';

    const horizontalSpread = (Math.random() * window.innerWidth) - (window.innerWidth / 2);
    const upwardLift = -(window.innerHeight + 150); 
    
    const targetRotation = Math.random() * 1080 - 540; 
    const targetScale = (Math.random() * 0.7) + 0.7;

    petal.style.setProperty('--tx', `${horizontalSpread}px`);
    petal.style.setProperty('--ty', `${upwardLift}px`);
    petal.style.setProperty('--rot', `${targetRotation}deg`);
    petal.style.setProperty('--sc', `${targetScale}`);

    petal.style.animationDuration = ((Math.random() * 1.5) + 2.0) + "s";

    container.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 3500);
}

function triggerLushFountainStream(originX, originY, totalCount) {
    for (let i = 0; i < totalCount; i++) {
        setTimeout(() => {
            createStreamBurstPetal(originX, originY);
        }, Math.floor(Math.random() * 700));
    }
}

setInterval(() => {
    if (!document.getElementById('intro-overlay')) {
        createFallingPetal();
    }
}, 800);
