// --- 1. BACKGROUND AUDIO LAYER ---
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
        console.log("Audio target prepared.");
    }
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);


// --- 2. COUNTDOWN ---
const weddingDate = new Date("Sep 19, 2026 00:00:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60 * 60)) / 1000);

    updateText("days", days);
    updateText("hours", hours);
    updateText("minutes", minutes);
    updateText("seconds", seconds);
}, 1000);

function updateText(id, value) {
    let el = document.getElementById(id);
    if (!el) return;
    let formatted = value < 10 ? "0" + value : value;
    if (el.innerHTML != formatted) {
        el.innerHTML = formatted;
    }
}


// --- 3. ELEGANT PORTAL DISMISSAL ---
function openInvitation() {
    if (window.invitationOpened) return;
    window.invitationOpened = true;

    // Trigger elegant CSS transition fade out
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.classList.add('portal-open');
        setTimeout(() => { overlay.remove(); }, 1500);
    }

    // Unmute background music tracks smoothly
    try {
        if (playerReady && player && typeof player.unMute === 'function') {
            player.unMute();
            player.setVolume(100);
            player.playVideo();
        }
    } catch (audioErr) {
        console.warn("Audio Context Started cleanly.");
    }
}


// --- 4. EVENT LISTENERS ---
function bindEvents() {
    const fingerprintBtn = document.getElementById('fingerprint-btn');
    if (fingerprintBtn) {
        fingerprintBtn.addEventListener('click', openInvitation);
        fingerprintBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openInvitation();
        }, { passive: false });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindEvents);
} else {
    bindEvents();
}


// --- 5. BACKGROUND ENVIRONMENT ANIMATION ---
function createSingleFallingPetal() {
    const container = document.getElementById('petal-container');
    if (!container) return;

    if (container.children.length > 25) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');

    const startX = Math.random() * window.innerWidth;
    const size = (Math.random() * 12) + 12 + "px";

    petal.style.left = startX + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.animationDuration = ((Math.random() * 4) + 6) + "s";

    container.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 10000);
}

setInterval(() => {
    if (!document.getElementById('intro-overlay')) {
        createSingleFallingPetal();
    }
}, 800);
