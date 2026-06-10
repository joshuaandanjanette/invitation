// 1. SET THE DATE
const weddingDate = new Date("Sep 19, 2026 00:00:00").getTime();

// 2. RUN COUNTDOWN
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

// --- 4. BREAK THE SEAL & TRIGGER DEFIANT BURST ---
function openInvitation(event) {
    // 1. Kick off the musical track unmuted
    if (playerReady && player) {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
    }

    // 2. Discover origin location of the seal click for precise particle explosion positioning
    const sealBtn = document.getElementById('wax-seal');
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2 + 150; // Approximated button rest location

    if (sealBtn) {
        const rect = sealBtn.getBoundingClientRect();
        originX = rect.left + (rect.width / 2);
        originY = rect.top + (rect.height / 2);
    }

    // 3. Detonate massive 125-particle explosive blast upward/outward
    triggerExplosiveBurst(originX, originY, 125);

    // 4. Smoothly collapse the introductory veil away
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.remove();
        }, 1400);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sealBtn = document.getElementById('wax-seal');
    if (sealBtn) {
        sealBtn.addEventListener('click', openInvitation);
    }
});

// --- 5. SYSTEM PARTICLE LOGIC ENGINE ---

// Core Ambient Flow (Downward Drop)
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

// High-Fidelity Non-Linear Shockwave Burst (Explodes Out and Sweeps Skyward)
function createBurstPetal(originX, originY) {
    const container = document.getElementById('petal-container');
    if (!container) return;

    const petal = document.createElement('div');
    petal.classList.add('petal-burst');

    const randomDepth = Math.random();
    let sizeMultiplier = 1;

    if (randomDepth < 0.25) {
        petal.classList.add('petal-dark');
    } else if (randomDepth < 0.5) {
        petal.classList.add('petal-large');
        sizeMultiplier = 2.2;
    }

    const baseSize = (Math.random() * 12) + 14;
    const finalSize = (baseSize * sizeMultiplier) + 'px';
    petal.style.width = finalSize;
    petal.style.height = finalSize;

    // Anchor baseline location safely at the exact seal location coordinate
    petal.style.left = originX + 'px';
    petal.style.top = originY + 'px';

    // MATHEMATICAL RADIAL physics calculations:
    // Generate full 360 radial angle, but warp the thrust heavily into negative Y space (Upward velocity)
    const angle = Math.random() * Math.PI * 2; 
    const blastForce = Math.random() * 350 + 150; // Radial power vector
    
    const targetX = Math.cos(angle) * blastForce * 1.5; 
    // Skyward vacuum suction vector (pulls them fiercely up past view line)
    const targetY = (Math.sin(angle) * blastForce) - (Math.random() * 600 + 500); 
    
    const targetRotation = Math.random() * 1440 - 720; // High frequency violent spins
    const targetScale = (Math.random() * 0.6) + 0.8;

    // Inject vector arrays natively straight into CSS parsing space
    petal.style.setProperty('--tx', `${targetX}px`);
    petal.style.setProperty('--ty', `${targetY}px`);
    petal.style.setProperty('--rot', `${targetRotation}deg`);
    petal.style.setProperty('--sc', `${targetScale}`);

    // Vary duration cycles slightly so shockwave feels textured instead of geometric
    petal.style.animationDuration = ((Math.random() * 1.2) + 1.6) + "s";

    container.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 2600);
}

// Dispatches a highly dense volume cluster instantaneously
function triggerExplosiveBurst(originX, originY, count) {
    for (let i = 0; i < count; i++) {
        // Micro-stagger distribution creates an organic shockwave blast pattern
        setTimeout(() => {
            createBurstPetal(originX, originY);
        }, Math.floor(Math.random() * 40));
    }
}

// Baseline trickle atmosphere loop
setInterval(() => {
    // Only cascade top falling petals when main mirror has cleared from space
    if (!document.getElementById('intro-overlay')) {
        createFallingPetal();
    }
}, 800);
