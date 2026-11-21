/* ============================================
   CHÙA HỒNG ĐỨC - Main JavaScript
   chuahongduc.online
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initActiveMenu();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initLightbox();
  initReadMore();
  initContactForm();
});

/* --- Sticky Header with scroll effect --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu Toggle --- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* --- Highlight Active Menu based on URL --- */
function initActiveMenu() {
  let currentPath = window.location.pathname.split('/').pop();
  if (!currentPath || currentPath === '') {
    currentPath = 'index.html';
  }
  
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    // If the path contains the link href, or both are home page
    if (href && (currentPath.indexOf(href) !== -1 || (currentPath === 'index.html' && href === 'index.html') || (currentPath.startsWith('tin-tuc-') && href === 'tin-tuc.html') || (currentPath.startsWith('phap-thoai-') && href === 'phap-thoai.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --- Smooth Scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#' || id === '') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* --- Lightbox for Gallery --- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}

/* --- Read More Toggle for News & Dharma Cards --- */
function initReadMore() {
  // 1. News Cards
  document.querySelectorAll('.news-card').forEach(card => {
    const excerpt = card.querySelector('.news-excerpt');
    const full = card.querySelector('.news-full');
    const btn = card.querySelector('.read-more-btn');
    
    // Only register toggle listeners if the card is meant for inline expansion
    if (excerpt && full && btn) {
      const triggers = card.querySelectorAll('.card-img, h3, .read-more-btn');
      triggers.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const isExpanded = btn.classList.contains('expanded');

          if (isExpanded) {
            full.style.display = 'none';
            excerpt.style.display = '';
            btn.classList.remove('expanded');
            btn.childNodes[0].textContent = 'Đọc thêm ';
          } else {
            excerpt.style.display = 'none';
            full.style.display = 'block';
            btn.classList.add('expanded');
            btn.childNodes[0].textContent = 'Thu gọn ';
          }
        });
      });
    }
  });

  // 2. Dharma Cards
  document.querySelectorAll('.dharma-card').forEach(card => {
    const excerpt = card.querySelector('.dharma-excerpt');
    const full = card.querySelector('.dharma-full');
    const btn = card.querySelector('.read-more-btn');

    // Only register toggle listeners if the card is meant for inline expansion
    if (excerpt && full && btn) {
      const triggers = card.querySelectorAll('.card-thumb, h3, .read-more-btn');
      triggers.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const isExpanded = btn.classList.contains('expanded');

          if (isExpanded) {
            full.style.display = 'none';
            excerpt.style.display = '';
            btn.classList.remove('expanded');
            btn.childNodes[0].textContent = 'Đọc thêm ';
          } else {
            excerpt.style.display = 'none';
            full.style.display = 'block';
            btn.classList.add('expanded');
            btn.childNodes[0].textContent = 'Thu gọn ';
          }
        });
      });
    }
  });
}
