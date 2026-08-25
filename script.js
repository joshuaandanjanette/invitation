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


/* ===========================
   INTRO FLOATING LIGHTS
=========================== */

function createIntroParticle(){

    if(!document.getElementById("intro-overlay")) return;

    const container=document.getElementById("intro-particles");
    if(!container) return;

    const p=document.createElement("div");
    p.className="intro-particle";

    const size=Math.random()*4+2;

    p.style.width=size+"px";
    p.style.height=size+"px";

    p.style.left=Math.random()*100+"%";
    p.style.top=(60+Math.random()*40)+"%";

    p.style.setProperty("--drift",(Math.random()*120-60)+"px");

    p.style.animationDuration=(Math.random()*5+6)+"s";

    container.appendChild(p);

    setTimeout(()=>{
        p.remove();
    },12000);

}

setInterval(createIntroParticle,180);


/*==================================================
PORTRAIT ENGINE
==================================================*/

const portraitCanvas = document.getElementById("portrait-canvas");

const img1 = document.createElement("img");
img1.src = "backgogogo.png";
img1.className = "photo-1";

const img2 = document.createElement("img");
img2.src = "backgroundpro.png";
img2.className = "photo-2";

portraitCanvas.appendChild(img1);
portraitCanvas.appendChild(img2);

img2.style.opacity = "0";

let showingFirst = true;

const turbulence = document.getElementById("turbulence");
const displacement = document.getElementById("displacement");

function rippleTransition(){

    let frame = 0;

    const ripple = setInterval(()=>{

        frame++;

        const p = frame / 80;

        displacement.setAttribute(
            "scale",
            Math.sin(p * Math.PI) * 70
        );

        turbulence.setAttribute(
            "baseFrequency",
            (0.010 + Math.sin(p * Math.PI) * 0.015) +
            " " +
            (0.010 + Math.sin(p * Math.PI) * 0.015)
        );

        if(showingFirst){

            img1.style.opacity = 1 - p;
            img2.style.opacity = p;

        }else{

            img1.style.opacity = p;
            img2.style.opacity = 1 - p;

        }

        if(frame >= 80){

            clearInterval(ripple);

            displacement.setAttribute("scale","0");
            turbulence.setAttribute("baseFrequency","0.010 0.010");

            showingFirst = !showingFirst;

        }

    },16);

}

setInterval(rippleTransition,8000);




const magicDust = document.getElementById("magic-dust");

function createMagicOrbit(){

    if(!magicDust) return;

    const count = Math.floor(Math.random()*5)+4;

    for(let i=0;i<count;i++){

        const s=document.createElement("div");

        s.className="magic-spark";

        const angle=Math.random()*Math.PI*2;
        const radius=120+Math.random()*60;

        const x=Math.cos(angle)*radius;
        const y=Math.sin(angle)*radius;

        s.style.left="50%";
        s.style.top="50%";

        s.style.setProperty("--x",x+"px");
        s.style.setProperty("--y",y+"px");

        s.style.animationDelay=(i*0.08)+"s";

        magicDust.appendChild(s);

        setTimeout(()=>{

            s.remove();

        },2700);

    }

}


function scheduleMagicDust(){

    const delay = 12000 + Math.random() * 12000;

    setTimeout(() => {

        createMagicOrbit();

        scheduleMagicDust();

    }, delay);

}

scheduleMagicDust();


/*==================================================
ROYAL BUTTON MODAL
==================================================*/

const royalModal = document.getElementById("royalModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openRoyalModal(title, html){

    modalBody.innerHTML = `
        <h2>${title}</h2>
        ${html}
    `;

    royalModal.classList.add("show");

}

function closeRoyalModal(){

    royalModal.classList.remove("show");

}

closeModal.addEventListener("click", closeRoyalModal);

royalModal.addEventListener("click",(e)=>{

    if(e.target===royalModal){

        closeRoyalModal();

    }

});


/*==========================
ENTOURAGE
==========================*/

document.getElementById("entourageBtn").addEventListener("click",()=>{

    openRoyalModal(

        "ENTOURAGE",

        `

        <div class="entourage-list">

            <section class="entourage-section">
                <h3>OFFICIATING PRIEST</h3>
                <p>Fr. Francis B. Lucas</p>
            </section>

            <section class="entourage-section">
                <h3>PARENTS OF THE GROOM</h3>
                <p>Jerold T. Baylon</p>
                <p>Janet R. Baylon</p>
            </section>

            <section class="entourage-section">
                <h3>PARENTS OF THE BRIDE</h3>
                <p>Agustin T. Vargas</p>
                <p>Yollanda M. Vargas</p>
            </section>

            <div class="entourage-grid">

                <section class="entourage-section">
                    <h3>BEST MAN</h3>
                    <p>Regino Jose Merida</p>
                </section>

                <section class="entourage-section">
                    <h3>MAID OF HONOR</h3>
                    <p>Jeremiah Baylon</p>
                </section>

            </div>

            <div class="entourage-grid">

                <section class="entourage-section">
                    <h3>GROOMSMEN</h3>
                    <p>Jonathan Tremblay</p>
                    <p>John Joseph Baylon</p>
                    <p>Aaron Aguda</p>
                    <p>Renzo Mercado</p>
                    <p>John King Crisostomo</p>
                    <p>John Jerill Revellame</p>
                    <p>Gerald Cuballes</p>
                    <p>John Carlo Baylon</p>
                    <p>James Carlo Baylon</p>
                    <p>Grecson Tena</p>
                    <p>Vincent Moises</p>
                    <p>Fitz Gerald Moises</p>
                    <p>Russel Dela Cruz</p>
                    <p>Heaven Joshua Sena</p>
                    <p>John Lloyd Alteza</p>
                </section>

                <section class="entourage-section">
                    <h3>BRIDESMAIDS</h3>
                    <p>Jane Baylon</p>
                    <p>Ceejay Mari Villanueva</p>
                    <p>Jocel Ann Baylon</p>
                    <p>Jezza Mae Sunga</p>
                    <p>Mabeth Juntereal</p>
                    <p>Aira Juntereal</p>
                    <p>Joy Novi Pearl Moises</p>
                    <p>Rose Ann Peñamante</p>
                    <p>Reyamor Evangelista</p>
                    <p>Marian Joy Corpuz</p>
                    <p>Queenie Soriano</p>
                    <p>Cyrene Shane Caagbay</p>
                    <p>Jannah Moises</p>
                    <p>Kimberly Martell</p>
                    <p>Charlene Kaye Moises</p>
                </section>

            </div>

            <div class="entourage-grid">

                <section class="entourage-section">
                    <h3>RING BEARER</h3>
                    <p>Name</p>
                </section>

                <section class="entourage-section">
                    <h3>BIBLE BEARER</h3>
                    <p>Name</p>
                </section>

                <section class="entourage-section">
                    <h3>COIN BEARER</h3>
                    <p>Name</p>
                </section>

            </div>

            <section class="entourage-section">
                <h3>FLOWER GIRLS</h3>
                <p>Name</p>
                <p>Name</p>
                <p>Name</p>
            </section>

            <section class="entourage-section principal-sponsors">
                <h3>PRINCIPAL SPONSORS</h3>
                <p>Arriving shortly...</p>
                
            </section>

        </div>

        `

    );

});


/*==========================
GALLERY
==========================*/

document.getElementById("galleryBtn").addEventListener("click",()=>{

    openRoyalModal(

        "GALLERY",

        `
        <p>Coming Soon</p>
        `

    );

});


/*==========================
EXTRA
==========================*/

document.getElementById("extraBtn").addEventListener("click",()=>{

    openRoyalModal(

        "EXTRA",

        `
        <p>Coming Soon</p>
        `

    );

});
