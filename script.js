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
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "THE TALE HAS BEGUN";
    }
}, 1000);

function updateElement(id, value) {
    let el = document.getElementById(id);
    if (!el) return;
    
    let formattedValue = value < 10 ? "0" + value : value;
    if (value < 0) formattedValue = "00";
    
    if (el.innerHTML != formattedValue) {
        el.innerHTML = formattedValue;
        el.classList.remove("pulse-tick");
        void el.offsetWidth; // Triggers reflow for heartbeat tick
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
            'autoplay': 0,        
            'controls': 0,
            'loop': 1,
            'mute': 0,            
            'playlist': '6n9Cysnoxug'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
}

// --- 4. OPEN INVITATION REVEAL (CINEMATIC TRANSITION) ---
function openInvitation(e) {
    // Stop mobile hybrid devices from running click handlers immediately after touchstart
    if (e) {
        if (e.type === 'touchstart') window.touchFired = true;
        if (e.type === 'click' && window.touchFired) return;
    }

    if (window.invitationOpened) return;
    window.invitationOpened = true;

    // Safety structural validation for YouTube object loading asynchronously
    if (playerReady && player && typeof player.playVideo === 'function') {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
    }

    const mirror = document.querySelector('.magic-mirror');
    if (mirror) mirror.classList.add('mirror-glow-out');

    const sealBtn = document.getElementById('wax-seal');
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2 + 150;

    if (sealBtn) {
        const rect = sealBtn.getBoundingClientRect();
        originX = rect.left + (rect.width / 2);
        originY = rect.top + (rect.height / 2);
    }

    triggerLushFountainStream(originX, originY, 300);

    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('fade-out');
            
            const mainContainer = document.querySelector('.container');
            if (mainContainer) mainContainer.classList.add('reveal-main');
            
            setTimeout(() => {
                overlay.remove();
            }, 1800); 
            
        }, 2200); 
    }
}

// --- HARDWARE INITIALIZATION ---
function initButtonBinding() {
    const sealBtn = document.getElementById('wax-seal');
    if (sealBtn) {
        sealBtn.addEventListener('click', openInvitation);
        sealBtn.addEventListener('touchstart', openInvitation, { passive: true });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initButtonBinding);
} else {
    initButtonBinding();
}

// --- 5. PARTICLE GENERATION ENGINE ---
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


/* ===========================================================
   INTRO MAGIC PARTICLES
=========================================================== */

/*============= function createIntroParticle(){

    const container = document.getElementById("intro-particles");

    if(!container) return;

    const p = document.createElement("div");

    p.className = "intro-particle";

    const size = Math.random()*8 + 4;

    p.style.width = size + "px";
    p.style.height = size + "px";

    p.style.left = Math.random()*100 + "%";
    p.style.top = (Math.random()*100) + "%";

    p.style.setProperty(
        "--drift",
        ((Math.random()*80)-40)+"px"
    );

    p.style.animationDuration =
        (4 + Math.random()*4)+"s";

    container.appendChild(p);

    setTimeout(()=>{
        p.remove();
    },8000);

}

const introParticleLoop = setInterval(()=>{

    if(document.getElementById("intro-overlay")){

        createIntroParticle();

    }else{

        clearInterval(introParticleLoop);

    } ========= */

function createIntroParticle(){

    const container = document.getElementById("intro-particles");

    if(!container) return;

    const p = document.createElement("div");

    p.style.position = "absolute";
    p.style.width = "20px";
    p.style.height = "20px";
    p.style.borderRadius = "50%";
    p.style.background = "red";

    p.style.left = Math.random()*window.innerWidth + "px";
    p.style.top = Math.random()*window.innerHeight + "px";

    container.appendChild(p);
}

},80);


console.log("SCRIPT IS RUNNING");
