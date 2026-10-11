/**
 * PORTFOLIO JAVASCRIPT - MAIN CONTROLLER
 * Autor: Mateo
 * Totalmente vanilla, sin dependencias externas ni compiladores requeridos.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollHeader();
  initScrollSpy();
  initSkillFilters();
  initProjectFilters();
  initCopyEmail();
  initContactForm();
  initBackToTop();
  initProjectModal();
});

/* ==========================================================================
   1. SISTEMA DE TEMA OSCURO / CLARO
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Comprobar preferencia guardada o preferencia del sistema operativo
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    // Si el sistema prefiere modo claro por defecto
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    showToast(newTheme === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado');
  });
}

/* ==========================================================================
   2. MENÚ MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. CABECERA AL HACER SCROLL
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   4. SCROLL SPY (Indicador de sección activa en la barra de navegación)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. FILTRO DE HABILIDADES
   ========================================================================== */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skills-tabs .tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. FILTRO DE PROYECTOS
   ========================================================================== */
function initProjectFilters() {
  const tabs = document.querySelectorAll('.projects-tabs .tab-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   7. COPIAR CORREO AL PORTAPAPELES
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('contact-email-text');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      showToast('📋 ¡Correo copiado al portapapeles!');
    } catch (err) {
      // Fallback si no tiene permisos de clipboard
      const tempInput = document.createElement('input');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast('📋 ¡Correo copiado!');
    }
  });
}

/* ==========================================================================
   8. FORMULARIO DE CONTACTO
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#user_name').value.trim();
    const email = form.querySelector('#user_email').value.trim();
    const subject = form.querySelector('#user_subject').value.trim();
    const message = form.querySelector('#user_message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Por favor completa los campos obligatorios.');
      return;
    }

    // Abre el cliente de correo del usuario con los datos pre-rellenados
    const mailtoRecipient = 'tu-correo@ejemplo.com'; // Sustituir por el correo real en HTML
    const mailtoSubject = encodeURIComponent(`[Portafolio] ${subject || 'Mensaje de ' + name}`);
    const mailtoBody = encodeURIComponent(`Hola Mateo,\n\nSoy ${name} (${email}).\n\nMensaje:\n${message}`);

    window.location.href = `mailto:${mailtoRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    showToast('✉️ Abriendo tu cliente de correo...');
    form.reset();
  });
}

/* ==========================================================================
   9. BOTÓN VOLVER ARRIBA
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. MODAL DE DETALLES DEL PROYECTO
   ========================================================================== */
function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const detailButtons = document.querySelectorAll('.btn-project-details');

  if (!modalOverlay || !modalClose) return;

  // Base de datos local de detalles para cada proyecto
  const projectsData = {
    '1': {
      title: 'Plataforma E-Commerce NextGen',
      category: 'Web App & Full Stack',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      description: 'Una solución de comercio electrónico moderna, altamente responsiva y optimizada para conversión. Cuenta con pasarela de pagos integrada, catálogo dinámico con filtros en tiempo real, autenticación JWT segura y panel de administración.',
      features: [
        'Carrito de compras persistente con sincronización local',
        'Integración con pasarela de pago Stripe Checkout',
        'Búsqueda instantánea con debouncing y filtrado por facetas',
        'Panel de administración para gestión de inventario y pedidos'
      ],
      liveUrl: 'https://github.com',
      codeUrl: 'https://github.com'
    },
    '2': {
      title: 'Dashboard Analítico SaaS',
      category: 'Frontend & Visualización',
      tags: ['TypeScript', 'Vue 3', 'Chart.js', 'Tailwind'],
      description: 'Panel interactivo para monitoreo de métricas empresariales en tiempo real. Proporciona visualizaciones de datos claras mediante gráficos dinámicos y reportes descargables en PDF y CSV.',
      features: [
        'Gráficos interactivos con zoom y tooltips personalizados',
        'Arquitectura modular basada en componentes desacoplados',
        'Soporte completo de modo oscuro y temas personalizados',
        'Carga diferida (lazy loading) para un rendimiento instantáneo'
      ],
      liveUrl: 'https://github.com',
      codeUrl: 'https://github.com'
    },
    '3': {
      title: 'API RESTful & Microservicios',
      category: 'Backend & Cloud',
      tags: ['Node.js', 'Express', 'MongoDB', 'Docker', 'JWT'],
      description: 'Arquitectura de servicios escalable con documentación Swagger interactiva, sistema robusto de autenticación, control de tasa (rate limiting) y despliegue automatizado con contenedores Docker.',
      features: [
        'Autenticación robusta con tokens de acceso y refresco',
        'Validación estricta de esquemas de datos con Zod',
        'Pruebas unitarias y de integración automatizadas',
        'Contenedores Docker listos para producción'
      ],
      liveUrl: 'https://github.com',
      codeUrl: 'https://github.com'
    },
    '4': {
      title: 'TaskFlow - Gestor de Proyectos',
      category: 'Productividad & Web App',
      tags: ['JavaScript', 'HTML5 Drag & Drop', 'LocalForage', 'CSS Grid'],
      description: 'Aplicación tipo tablero Kanban interactiva para la organización ágil de tareas personales y de equipo con soporte para trabajar 100% offline.',
      features: [
        'Tableros Kanban con arrastrar y soltar nativo muy fluido',
        'Persistencia de datos local sin necesidad de servidor',
        'Etiquetas personalizables y fechas límite con alertas visuales',
        'Exportación e importación de tableros en formato JSON'
      ],
      liveUrl: 'https://github.com',
      codeUrl: 'https://github.com'
    }
  };

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectsData[projectId];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-category').textContent = data.category;
        document.getElementById('modal-desc').textContent = data.description;
        
        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = data.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

        // Features list
        const featuresContainer = document.getElementById('modal-features');
        featuresContainer.innerHTML = data.features.map(f => `<li>✅ ${f}</li>`).join('');

        // Links
        const liveBtn = document.getElementById('modal-live-link');
        const codeBtn = document.getElementById('modal-code-link');
        if (liveBtn) liveBtn.href = data.liveUrl;
        if (codeBtn) codeBtn.href = data.codeUrl;

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   UTILIDAD: TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Trigger reflow
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
