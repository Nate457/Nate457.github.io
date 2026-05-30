/* ============================================================
   NATHAN JANIT PORTFOLIO — script.js
   ============================================================ */

/* ── CONSOLE EASTER EGG ─────────────────────────────────── */
console.log(
    '%c\n ███╗   ██╗ ██╗\n ████╗  ██║ ██║\n ██╔██╗ ██║ ██║\n ██║╚██╗██║ ██║\n ██║ ╚████║ ██║\n ╚═╝  ╚═══╝ ╚═╝\n',
    'color: #00d4ff; font-size: 10px; font-family: monospace;'
);
console.log(
    '%cHey developer 👋',
    'color: #00d4ff; font-size: 18px; font-weight: bold;'
);
console.log(
    '%cNathan Janit — Software Engineer\nnjanit@uwaterloo.ca | github.com/Nate457\n\nYou\'re clearly curious. I like that.\nLet\'s build something together.\n\nP.S. Try the Konami Code on the main page. ↑↑↓↓←→←→BA',
    'color: #94a3b8; font-size: 13px; line-height: 1.6;'
);

/* ── HELPERS ─────────────────────────────────────────────── */
function showToast(msg, duration = 3500) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), duration);
}

function showModal(icon, title, msg) {
    document.getElementById('ee-icon').textContent = icon;
    document.getElementById('ee-title').textContent = title;
    document.getElementById('ee-msg').textContent = msg;
    document.getElementById('ee-modal').classList.add('active');
}

function launchConfetti() {
    const colors = ['#00d4ff','#a855f7','#f59e0b','#10b981','#ef4444','#fff'];
    const container = document.getElementById('confetti-container');
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'confetti-piece';
            const size = 6 + Math.random() * 8;
            el.style.cssText = `
                left: ${Math.random() * 100}vw;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${1.5 + Math.random() * 2.5}s;
                animation-delay: ${Math.random() * 0.8}s;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            `;
            container.appendChild(el);
            setTimeout(() => el.remove(), 4000);
        }, i * 15);
    }
}

/* ── NAV SCROLL EFFECT ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE NAV TOGGLE ──────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── TYPEWRITER EFFECT ──────────────────────────────────── */
const phrases = [
    'Software Engineer.',
    'World Champion.',
    'ML / CV Engineer.',
    'Robotics Builder.',
    'Game Developer.',
    'Double Degree Student.',
];
let pIdx = 0, cIdx = 0, deleting = false;
const twEl = document.getElementById('typewriter');

function typewrite() {
    const word = phrases[pIdx];
    if (deleting) {
        twEl.textContent = word.substring(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
        setTimeout(typewrite, 45);
    } else {
        twEl.textContent = word.substring(0, cIdx + 1);
        cIdx++;
        if (cIdx === word.length) {
            deleting = true;
            setTimeout(typewrite, 2200);
        } else {
            setTimeout(typewrite, 85);
        }
    }
}
typewrite();

/* ── HERO CANVAS ANIMATION ──────────────────────────────── */
(function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const ctx    = canvas.getContext('2d');
    let w, h, particles;
    const CYAN   = '0,212,255';
    const PURPLE = '168,85,247';
    let mouse = { x: null, y: null };

    class Particle {
        constructor() { this.init(); }
        init() {
            this.x  = Math.random() * w;
            this.y  = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.r  = Math.random() * 2 + 0.8;
            this.baseAlpha = Math.random() * 0.4 + 0.15;
            this.alpha = this.baseAlpha;
            this.phase = Math.random() * Math.PI * 2;
            this.phaseSpeed = 0.015 + Math.random() * 0.015;
            this.color = Math.random() > 0.7 ? PURPLE : CYAN;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.phase += this.phaseSpeed;
            this.alpha = this.baseAlpha + Math.sin(this.phase) * 0.08;
            if (this.x < 0)  { this.x = 0;  this.vx =  Math.abs(this.vx); }
            if (this.x > w)  { this.x = w;  this.vx = -Math.abs(this.vx); }
            if (this.y < 0)  { this.y = 0;  this.vy =  Math.abs(this.vy); }
            if (this.y > h)  { this.y = h;  this.vy = -Math.abs(this.vy); }
            if (mouse.x !== null) {
                const dx = mouse.x - this.x, dy = mouse.y - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 180) {
                    this.vx += (dx / dist) * 0.018;
                    this.vy += (dy / dist) * 0.018;
                    const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
                    if (speed > 1.8) { this.vx = (this.vx/speed)*1.8; this.vy = (this.vy/speed)*1.8; }
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${this.color},0.4)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function resize() {
        w = canvas.width  = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        const count = Math.min(Math.floor((w * h) / 14000), 80);
        particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
        const MAX = 140;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < MAX) {
                    const a = (1 - d / MAX) * 0.25;
                    const col = particles[i].color;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${col},${a})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    let raf;
    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        raf = requestAnimationFrame(animate);
    }

    canvas.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = mouse.y = null; });

    window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); animate(); });
    resize();
    animate();
})();

/* ── INTERSECTION OBSERVER (scroll animations) ───────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos], .tl-item, .edu-card, .proj-card, .skill-group, .contact-inner').forEach(el => {
    observer.observe(el);
});

/* ── EASTER EGG 1: KONAMI CODE ───────────────────────────── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIdx = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[kIdx]) {
        kIdx++;
        if (kIdx === KONAMI.length) {
            kIdx = 0;
            launchConfetti();
            showModal(
                '🏆',
                'WORLD CHAMPION',
                'You found it! Nathan ranked #1 out of 100+ teams at the VEXU World Championship. Now you know the real cheat code.'
            );
        }
    } else {
        kIdx = (e.key === KONAMI[0]) ? 1 : 0;
    }
});

/* ── EASTER EGG 2: LOGO CLICK × 5 ───────────────────────── */
let logoClicks = 0, logoTimer = null;
document.getElementById('logo-click').addEventListener('click', (e) => {
    e.preventDefault();
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => { logoClicks = 0; }, 3000);
    if (logoClicks === 5) {
        logoClicks = 0;
        showModal(
            '🧮',
            '100% IN ADVANCED ALGEBRA',
            'You found it! MATH 145 (Advanced Level) — 100%. Just a regular Tuesday. njanit@uwaterloo.ca'
        );
    } else if (logoClicks >= 2) {
        showToast(`${5 - logoClicks} more clicks... 🤔`);
    }
});

/* ── EASTER EGG 3: SECRET WORDS ─────────────────────────── */
let keyBuffer = '';
const secretWords = {
    'vex': () => {
        launchConfetti();
        showToast('🏆 #1 in the world! Silver Owl Robotics. Never stop building.');
    },
    'watan': () => {
        showToast('🎲 Opening Watan game...');
        setTimeout(() => window.open('watan.html', '_blank'), 800);
    },
    'spooky': () => {
        const chars = ['🧶','🕷️','👻','🐱‍👤'];
        const ch = document.createElement('div');
        ch.className = 'spooky-char';
        ch.textContent = chars[Math.floor(Math.random() * chars.length)];
        document.body.appendChild(ch);
        setTimeout(() => ch.remove(), 4500);
        showToast('Spoolunking says hi! 🎮');
    },
    'hire': () => {
        showModal('💼', 'HIRE ME!', 'Excellent taste. njanit@uwaterloo.ca — let\'s build something great together.');
    },
    'nate': () => {
        showToast("👋 Hey! That's me. njanit@uwaterloo.ca");
    },
};
document.addEventListener('keypress', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-12);
    for (const [word, fn] of Object.entries(secretWords)) {
        if (keyBuffer.endsWith(word)) { fn(); keyBuffer = ''; break; }
    }
});

/* ── GPA HOVER TOOLTIP ───────────────────────────────────── */
const gpaEl = document.querySelector('.gpa-hover');
if (gpaEl) {
    gpaEl.addEventListener('mouseenter', () => {
        showToast('Psst: 100% in MATH 145 Advanced Algebra 🤫');
    });
}
