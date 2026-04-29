// ══════════════════════════════════════
// CLUB JAZMÍN — Conexión Supabase
// ══════════════════════════════════════

const SUPABASE_URL = 'https://qgsdqzqvrbkprbmehzcf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0RGb096UtD0AQYRtukuNwg_zmLf3nwF';

const db = {
  async insert(tabla, datos) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${tabla}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(datos)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || JSON.stringify(json));
    return json;
  },

  async select(tabla, filtros = '') {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${tabla}?${filtros}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || JSON.stringify(json));
    return json;
  }
};

// ── FORMULARIO DE REGISTRO → SUPABASE ──
const registroForm = document.getElementById('registroForm');
if (registroForm) {
  registroForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = registroForm.querySelector('.btn-dark');
    const originalText = btn.textContent;
    btn.textContent = 'Procesando...';
    btn.disabled = true;

    const dni    = document.getElementById('dni').value.trim().replace(/\./g, '');
    const nombre = document.getElementById('nombre').value.trim();
    const tel    = document.getElementById('telefono').value.trim();
    const email  = document.getElementById('email').value.trim() || null;
    const nacim  = document.getElementById('nacimiento').value || null;
    const piel   = document.getElementById('piel').value || null;
    const estilo = document.getElementById('estilo').value || null;

    if (!dni || dni.length < 7) {
      mostrarError(btn, 'DNI inválido', originalText); return;
    }

    try {
      const existentes = await db.select('clientas', `dni=eq.${dni}&select=id,nombre`);
      if (existentes.length > 0) {
        mostrarError(btn, `Ya existe una cuenta con ese DNI (${existentes[0].nombre})`, originalText); return;
      }

      const niveles = await db.select('niveles', 'nombre=eq.Inicial&select=id');
      const nivel_id = niveles[0]?.id || null;

      const nuevaClienta = await db.insert('clientas', {
        dni, nombre, telefono: tel, email,
        fecha_nacimiento: nacim, tipo_piel: piel,
        estilo_maquillaje: estilo, nivel_id, puntos_actuales: 200
      });

      await db.insert('movimientos_puntos', {
        clienta_id: nuevaClienta[0].id,
        tipo: 'ganado', origen: 'registro',
        puntos: 200, nota: 'Puntos de bienvenida al Club Jazmín'
      });

      btn.textContent = '¡Bienvenida al Club! 🌹';
      btn.style.background = '#026359';
      registroForm.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { btn.textContent = originalText; btn.disabled = false; btn.style.background = ''; }, 5000);

    } catch (err) {
      console.error(err);
      mostrarError(btn, 'Error al registrar. Intentá de nuevo.', originalText);
    }
  });
}

function mostrarError(btn, mensaje, originalText) {
  btn.textContent = mensaje;
  btn.style.background = '#c52c2e';
  btn.disabled = false;
  setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; }, 4000);
}

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
