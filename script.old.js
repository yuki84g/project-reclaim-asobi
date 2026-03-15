/* ============================================
   $ASBI LP — JavaScript
   Particles, Scroll Animations, Language Toggle
   ============================================ */

// ===================== PARTICLE CANVAS =====================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    // Mix of gold and pink
    this.color = Math.random() > 0.7
      ? `rgba(255, 64, 129, ${this.opacity})`
      : `rgba(255, 215, 0, ${this.opacity})`;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.001;
    if (this.y < 0 || this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.min(100, Math.floor(window.innerWidth / 12));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animFrame = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ===================== SCROLL FADE IN =====================
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ===================== LANGUAGE TOGGLE =====================
let currentLang = 'jp';
const langBtn = document.getElementById('langToggle');

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'jp' ? 'en' : 'jp';
  document.querySelectorAll('[data-jp][data-en]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });
  langBtn.textContent = currentLang === 'jp' ? 'EN / JP' : 'JP / EN';
  document.documentElement.lang = currentLang === 'jp' ? 'ja' : 'en';
});

// ===================== COPY FUNCTIONS =====================
function copyWallet() {
  const code = document.querySelector('#walletAddress code');
  navigator.clipboard.writeText(code.textContent).then(() => {
    const btn = document.querySelector('#walletAddress .copy-btn');
    const orig = btn.textContent;
    btn.textContent = '✓';
    setTimeout(() => btn.textContent = orig, 1500);
  });
}

function copyContract() {
  const code = document.getElementById('contractAddress');
  navigator.clipboard.writeText(code.textContent).then(() => {
    const btn = code.nextElementSibling;
    const orig = btn.textContent;
    btn.textContent = '✓';
    setTimeout(() => btn.textContent = orig, 1500);
  });
}

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
