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

// 4. MUSIC TRIGGER
const playMusic = function() {
    var audio = document.getElementById("myAudio");
    if (audio && audio.paused) { audio.play(); }
};
window.addEventListener('click', playMusic, { once: true });
window.addEventListener('touchstart', playMusic, { once: true });

// 5. PETALS
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
    setTimeout(() => { petal.remove(); }, 15000);
}
setInterval(createPetal, 500);
