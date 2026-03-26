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

// --- 4. YOUTUBE MUSIC (OPTIMIZED FOR SPEED) ---
var player;
var playerReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: '6n9Cysnoxug',
        playerVars: {
            'autoplay': 1,       // Request autoplay (though browser may block)
            'controls': 0,
            'loop': 1,
            'mute': 1,           // START MUTED (This often bypasses autoplay blocks!)
            'playlist': '6n9Cysnoxug'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    // Pre-buffer the video
    event.target.playVideo(); 
}

const playMusic = function() {
    if (playerReady && player) {
        player.unMute(); // Unmute now that user has interacted
        player.setVolume(100);
        player.playVideo();
    }
};

// Listen for the very first touch/click to trigger sound immediately
window.addEventListener('click', playMusic, { once: true });
window.addEventListener('touchstart', playMusic, { once: true });
window.addEventListener('scroll', playMusic, { once: true }); // Adding scroll as a trigger

// 5. PETALS (Your Optimized Working Version)
function createPetal() {
    const container = document.getElementById('petal-container');
    if (!container) return;
    const petal = document.createElement('div');
    petal.classList.add('petal');
    const randomDepth = Math.random();
    let sizeMultiplier = 1;
    if (randomDepth < 0.2) { petal.classList.add('petal-dark'); } 
    else if (randomDepth < 0.4) { petal.classList.add('petal-large'); sizeMultiplier = 2.5; }
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
setInterval(createPetal, 800);
