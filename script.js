/**
 * Signature Premier Events — Canada Edition
 * Interactive Experience Engine
 * Features: Scroll progress, cursor glow, particles, countdown,
 *           artist carousel, testimonial carousel, lightbox,
 *           count-up stats, newsletter, form handler, etc.
 */

// =========================================================================
// 0. DOCUMENT READY WRAPPER
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initParticles();
  initCountdown();
  initCountUp();
  initTestimonialCarousel();
  initArtistDots();
  initMobileMenuLinks();
  initRevealAnimations();
});

// =========================================================================
// 1. NAVBAR SCROLL EFFECT
// =========================================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =========================================================================
// 2. SCROLL PROGRESS BAR
// =========================================================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  });
}


// =========================================================================
// 4. FLOATING MUSIC NOTE PARTICLES
// =========================================================================
function initParticles() {
  const container = document.getElementById('particleContainer');
  if (!container) return;

  const symbols = ['♩', '♪', '♫', '♬', '✦', '✧', '🎵', '🎶'];
  const colors = ['#00f0ff', '#ff0055', '#8a2be2', '#ffd700', '#00c853', '#ffffff'];

  for (let i = 0; i < 20; i++) {
    createParticle(container, symbols, colors);
  }
}

function createParticle(container, symbols, colors) {
  const particle = document.createElement('div');
  particle.className = 'music-particle';
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.color = colors[Math.floor(Math.random() * colors.length)];
  particle.style.left = Math.random() * 100 + '%';
  particle.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  particle.style.animationDuration = (15 + Math.random() * 25) + 's';
  particle.style.animationDelay = (Math.random() * 20) + 's';

  // Random horizontal drift
  const driftX = (Math.random() - 0.5) * 100;
  particle.style.setProperty('--drift-x', driftX + 'px');

  container.appendChild(particle);

  // Recycle particles
  particle.addEventListener('animationend', () => {
    particle.remove();
    createParticle(container, symbols, colors);
  });
}

// =========================================================================
// 5. MOBILE MENU TOGGLE
// =========================================================================
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
}

// Close mobile menu on link click
function initMobileMenuLinks() {
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      if (menu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// =========================================================================
// 6. SCROLL REVEAL ANIMATIONS (Per-Section Staggering)
// =========================================================================
function initRevealAnimations() {
  const sections = document.querySelectorAll('section, header');

  const revealOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const reveals = entry.target.querySelectorAll('.reveal');
        reveals.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('active');
          }, index * 100);
        });
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, revealOptions);

  sections.forEach(section => revealOnScroll.observe(section));
}

// =========================================================================
// 7. SMOOTH EVENT FILTER
// =========================================================================
function filterEvents(category, btnElement) {
  // Update active button
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const cards = document.querySelectorAll('.event-card');

  cards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.classList.remove('hidden');
      card.style.display = '';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';

      void card.offsetWidth;

      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';

      setTimeout(() => {
        card.style.display = 'none';
        card.classList.add('hidden');
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
      }, 300);
    }
  });
}

// =========================================================================
// 8. COUNTDOWN TIMER
// =========================================================================
function initCountdown() {
  // Set target date: Mar 7, 2027 (Mallu Iconic Night)
  const targetDate = new Date('2027-03-07T18:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      // Event has passed — show zeroes
      updateDisplay(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateDisplay(days, hours, minutes, seconds);
  }

  function updateDisplay(d, h, m, s) {
    const pad = (n) => String(n).padStart(2, '0');
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set('countdownDays', pad(d));
    set('countdownHours', pad(h));
    set('countdownMinutes', pad(m));
    set('countdownSeconds', pad(s));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// =========================================================================
// 9. COUNT-UP ANIMATION FOR STATS
// =========================================================================
function initCountUp() {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const hasDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();
        const startVal = 0;

        function animateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = startVal + (target - startVal) * eased;

          counter.textContent = hasDecimal ? current.toFixed(1) : Math.floor(current);

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            // Add + suffix for appropriate values
            counter.textContent = hasDecimal ? target.toFixed(1) : target;
            if (!hasDecimal && target >= 100) {
              // Already set to target
            }
          }
        }

        requestAnimationFrame(animateCount);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// =========================================================================
// 10. ARTIST SPOTLIGHT CAROUSEL
// =========================================================================
let artistIndex = 0;

function initArtistDots() {
  const track = document.getElementById('artistTrack');
  const dotsContainer = document.getElementById('artistDots');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.artist-card');
  if (!cards.length) return;

  // Create dots
  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to artist ${i + 1}`);
    dot.addEventListener('click', () => goToArtist(i));
    dotsContainer.appendChild(dot);
  }
}

function moveArtistSlide(direction) {
  const track = document.getElementById('artistTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.artist-card');
  const cardStyle = window.getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth;
  const gap = 20;

  const maxIndex = cards.length - 1;
  artistIndex += direction;

  if (artistIndex < 0) artistIndex = maxIndex;
  if (artistIndex > maxIndex) artistIndex = 0;

  const offset = -(artistIndex * (cardWidth + gap));
  track.style.transform = `translateX(${offset}px)`;

  // Update dots
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === artistIndex);
  });
}

function goToArtist(index) {
  const track = document.getElementById('artistTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.artist-card');
  const cardWidth = cards[0].offsetWidth;
  const gap = 20;

  artistIndex = index;
  const offset = -(artistIndex * (cardWidth + gap));
  track.style.transform = `translateX(${offset}px)`;

  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === artistIndex);
  });
}

// =========================================================================
// 11. TESTIMONIAL CAROUSEL (Auto-rotate)
// =========================================================================
let testimonialIndex = 0;
let testimonialInterval = null;

function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  // Create dots
  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToTestimonial(i));
    dotsContainer.appendChild(dot);
  }

  // Start auto-rotation
  startTestimonialAuto();

  // Pause on hover
  const carousel = document.getElementById('testimonialCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopTestimonialAuto);
    carousel.addEventListener('mouseleave', startTestimonialAuto);
  }
}

function moveTestimonial(direction) {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  testimonialIndex += direction;

  if (testimonialIndex < 0) testimonialIndex = cards.length - 1;
  if (testimonialIndex >= cards.length) testimonialIndex = 0;

  const offset = -(testimonialIndex * 100);
  track.style.transform = `translateX(${offset}%)`;

  const dots = document.querySelectorAll('.testimonial-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === testimonialIndex);
  });
}

function goToTestimonial(index) {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  testimonialIndex = index;
  const offset = -(testimonialIndex * 100);
  track.style.transform = `translateX(${offset}%)`;

  const dots = document.querySelectorAll('.testimonial-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === testimonialIndex);
  });

  // Reset auto-rotate timer
  stopTestimonialAuto();
  startTestimonialAuto();
}

function startTestimonialAuto() {
  if (testimonialInterval) return;
  testimonialInterval = setInterval(() => {
    moveTestimonial(1);
  }, 5000);
}

function stopTestimonialAuto() {
  if (testimonialInterval) {
    clearInterval(testimonialInterval);
    testimonialInterval = null;
  }
}

// =========================================================================
// 12. LIGHTBOX GALLERY
// =========================================================================
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80', caption: 'Concert Night — Toronto' },
  { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80', caption: 'Live Performance — Mississauga' },
  { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80', caption: 'Cultural Festival — Vancouver' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80', caption: 'Concert Crowd — Toronto' },
  { src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80', caption: 'Stage Show — Montreal' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80', caption: 'Festival Night — Calgary' }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  const overlay = document.getElementById('lightboxOverlay');
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  if (!overlay || !image) return;

  currentLightboxIndex = index;
  image.src = galleryImages[index].src;
  image.alt = galleryImages[index].caption;

  if (caption) {
    caption.textContent = galleryImages[index].caption;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Keyboard navigation
  document.addEventListener('keydown', handleLightboxKey);
}

function closeLightbox(e) {
  // Only close if clicking the background or close button
  if (e && e.target !== e.currentTarget && e.target.closest('.lightbox-content')) return;

  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', handleLightboxKey);
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;

  if (currentLightboxIndex < 0) currentLightboxIndex = galleryImages.length - 1;
  if (currentLightboxIndex >= galleryImages.length) currentLightboxIndex = 0;

  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  if (image) {
    image.src = galleryImages[currentLightboxIndex].src;
    image.alt = galleryImages[currentLightboxIndex].caption;
  }
  if (caption) {
    caption.textContent = galleryImages[currentLightboxIndex].caption;
  }
}

function handleLightboxKey(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
}

// =========================================================================
// 13. UNIVERSAL MODAL
// =========================================================================
const modalOverlay = document.getElementById('modalOverlay');

function openModal(title, subtitle) {
  const titleEl = document.getElementById('modalTitle');
  const subEl = document.getElementById('modalSub');
  if (titleEl) titleEl.innerText = title;
  if (subEl) subEl.innerText = subtitle;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  // Reset form
  const form = document.querySelector('.modal-content form');
  if (form) {
    form.reset();
    form.querySelectorAll('input, textarea').forEach(el => {
      el.value = '';
    });
  }
}

// Close Modal on clicking outside the panel
window.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Close modal on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// =========================================================================
// POSTER MODAL
// =========================================================================
const posterModal = document.getElementById('posterModal');

function openPosterModal() {
  posterModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePosterModal() {
  posterModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close Poster Modal on clicking outside the panel
window.addEventListener('click', (e) => {
  if (e.target === posterModal) {
    closePosterModal();
  }
});

// Close Poster Modal on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && posterModal.classList.contains('active')) {
    closePosterModal();
  }
});

// =========================================================================
// 14. TOAST NOTIFICATION SYSTEM
// =========================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) {
    console.warn('Toast container not found');
    return;
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: 'fa-solid fa-circle-check',
    error: 'fa-solid fa-circle-xmark',
    info: 'fa-solid fa-circle-info'
  };

  toast.innerHTML = `
    <i class="${icons[type] || icons.info} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Force reflow for animation
  void toast.offsetWidth;
  toast.classList.add('show');

  // Auto dismiss after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('dismiss');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 4500);
}

// =========================================================================
// 15. FORM SUBMISSION HANDLER
// =========================================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Visual feedback
  btn.innerHTML = 'Processing <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    btn.innerHTML = 'Submitted ✓';
    btn.style.background = '#00f0ff';
    btn.style.color = '#000';

    showToast('Thank you for connecting with Signature Events! Our team will review your details shortly.', 'success');

    setTimeout(() => {
      closeModal();
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 1200);
  }, 800);
}

// =========================================================================
// 16. NEWSLETTER SUBSCRIPTION
// =========================================================================
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  const btn = e.target.querySelector('button[type="submit"]');

  if (!input || !input.value.trim()) return;

  const email = input.value.trim();
  const originalBtnHtml = btn.innerHTML;

  // Visual feedback
  btn.innerHTML = 'Subscribing <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  // Simulate subscription
  setTimeout(() => {
    btn.innerHTML = 'Subscribed! <i class="fa-solid fa-check"></i>';
    btn.style.background = '#00f0ff';
    btn.style.color = '#000';

    showToast(`You're in! Welcome to the Signature Events community. We'll keep you posted on all upcoming Mallu events. 🎉`, 'success');

    input.value = '';

    setTimeout(() => {
      btn.innerHTML = originalBtnHtml;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 2000);
  }, 1000);
}

// =========================================================================
// 17. SCROLL TO TOP BUTTON
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// =========================================================================
// 18. IMAGE ERROR FALLBACK
// =========================================================================
function handleImgError(img) {
  img.classList.add('img-error');
  const fallback = img.nextElementSibling;
  if (fallback && fallback.classList.contains('img-fallback')) {
    fallback.style.display = 'flex';
  }
  const parent = img.closest('.event-image');
  if (parent) {
    parent.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
  }
}

// =========================================================================
// 19. SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
});