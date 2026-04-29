// ── NAVEGACIÓN MÓVIL ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (mobileClose) {
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ── SCROLL SUAVE AL REGISTRO ──
document.querySelectorAll('[data-scroll]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(el.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── ANIMACIÓN AL HACER SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ── FORMULARIO DE REGISTRO ──
const registroForm = document.getElementById('registroForm');
if (registroForm) {
  registroForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = registroForm.querySelector('.btn-dark');
    const original = btn.textContent;
    btn.textContent = 'Procesando...';
    btn.disabled = true;

    // Simula envío — reemplazar con fetch a Supabase
    await new Promise(r => setTimeout(r, 1500));

    btn.textContent = '¡Bienvenida al Club!';
    btn.style.background = '#026359';

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  });
}

// ── BARRA DE PROGRESO (PERFIL) ──
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
  setTimeout(() => {
    progressFill.style.width = progressFill.dataset.progress + '%';
  }, 300);
}

// ── CONTADOR DE PUNTOS ANIMADO (PERFIL) ──
const ptsNumero = document.querySelector('.perfil-pts-numero');
if (ptsNumero) {
  const target = parseInt(ptsNumero.dataset.pts, 10);
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    ptsNumero.textContent = current.toLocaleString('es-AR');
    if (current >= target) clearInterval(interval);
  }, 20);
}
