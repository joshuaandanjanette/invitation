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

// 3. PULSE BRAIN (Triggers only when number changes)
function updateElement(id, value) {
    let el = document.getElementById(id);
    let formattedValue = value < 10 ? "0" + value : value; // Keeps boxes stable

    if (el.innerHTML != formattedValue) {
        el.innerHTML = formattedValue;
        el.classList.remove("pulse-tick");
        void el.offsetWidth; // Magic reset for CSS animation
        el.classList.add("pulse-tick");
    }
}

// 4. INVISIBLE MUSIC (Plays on first tap)
window.addEventListener('click', function() {
    var audio = document.getElementById("myAudio");
    if (audio.paused) { audio.play(); }
}, { once: true });

window.addEventListener('touchstart', function() {
    var audio = document.getElementById("myAudio");
    if (audio.paused) { audio.play(); }
}, { once: true });