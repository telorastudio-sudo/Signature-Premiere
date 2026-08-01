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

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

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
            counter.textContent = hasDecimal ? target.toFixed(1) : String(target);
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
  { src: 'images/gal1.webp', caption: 'Concert Night — Toronto' },
  { src: 'images/gal2.webp', caption: 'Live Performance — Mississauga' },
  { src: 'images/gal3.webp', caption: 'Cultural Festival — Vancouver' },
  { src: 'images/gal4.webp', caption: 'Concert Crowd — Toronto' },
  { src: 'images/gal5.webp', caption: 'Stage Show — Montreal' },
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
// 12b. GALLERY — Navigates to gallery.html (archive toggle removed)
// =========================================================================
// The "Full Photo Archive" expand/collapse has been replaced by a dedicated
// gallery.html page. No DOM manipulation needed here.



// =========================================================================
// 13. UNIVERSAL MODAL
// =========================================================================
// const modalOverlay = document.getElementById('modalOverlay');

// function openModal(title, subtitle) {
//   const titleEl = document.getElementById('modalTitle');
//   const subEl = document.getElementById('modalSub');
//   if (titleEl) titleEl.innerText = title;
//   if (subEl) subEl.innerText = subtitle;
//   modalOverlay.classList.add('active');
//   document.body.style.overflow = 'hidden';
// }

// function closeModal() {
//   modalOverlay.classList.remove('active');
//   document.body.style.overflow = 'auto';
//   // Reset form
//   const form = document.querySelector('.modal-content form');
//   if (form) {
//     form.reset();
//     form.querySelectorAll('input, textarea').forEach(el => {
//       el.value = '';
//     });
//   }
// }
// =========================================================================
// 13. UNIVERSAL MODAL
// =========================================================================
const modalOverlay = document.getElementById('modalOverlay');

function openModal(title, subtitle) {
  if (!modalOverlay) return;
  const titleEl = document.getElementById('modalTitle');
  const subEl = document.getElementById('modalSub');
  const subjectEl = document.getElementById('formSubject');

  if (titleEl) titleEl.innerText = title;
  if (subEl) subEl.innerText = subtitle;

  // Set the email subject for Web3Forms
  if (subjectEl) {
    subjectEl.value = `${title} - ${subtitle}`;
  }

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) {
    // Fallback: should not reach here now that all pages have modalOverlay
    const form = document.querySelector('form');
    if (form) {
      clearFormErrors(form);
      form.reset();
    }
    document.body.style.overflow = 'auto';
    return;
  }
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';

  // Reset the modal contact form and clear any validation errors
  const form = document.querySelector('.modal-content form');
  if (form) {
    clearFormErrors(form);
    form.reset();
    form.querySelectorAll('input:not([type="hidden"]), textarea').forEach(el => {
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
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// =========================================================================
// POSTER MODAL
// =========================================================================
const posterModal = document.getElementById('posterModal');

function openPosterModal() {
  if (!posterModal) return;
  posterModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePosterModal() {
  if (!posterModal) return;
  posterModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close Poster Modal on clicking outside the panel
window.addEventListener('click', (e) => {
  if (posterModal && e.target === posterModal) {
    closePosterModal();
  }
});

// Close Poster Modal on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && posterModal && posterModal.classList.contains('active')) {
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
// 15. FORM VALIDATION UTILITIES
// =========================================================================

/**
 * Clears all error states from a form.
 */
function clearFormErrors(form) {
  form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
  form.querySelectorAll('.error-msg').forEach(el => el.remove());
}

/**
 * Marks an input-group field as invalid with an inline error message.
 * Automatically removes the error when the user corrects the field.
 */
function setFieldError(field, message) {
  const group = field.closest('.input-group');
  if (!group) return;

  group.classList.add('field-error');

  if (!group.querySelector('.error-msg')) {
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.setAttribute('role', 'alert');
    msg.textContent = message;
    group.appendChild(msg);
  }

  // Auto-clear on correction
  const clear = () => {
    group.classList.remove('field-error');
    const errMsg = group.querySelector('.error-msg');
    if (errMsg) errMsg.remove();
    field.removeEventListener('input', clear);
    field.removeEventListener('change', clear);
  };
  field.addEventListener('input', clear);
  field.addEventListener('change', clear);
}

/**
 * Marks a radio-group container as invalid.
 * Automatically removes the error when any radio in the group is selected.
 */
function setRadioGroupError(radioGroupEl, message) {
  if (!radioGroupEl) return;
  radioGroupEl.classList.add('field-error');

  const parent = radioGroupEl.parentElement;
  if (parent && !parent.querySelector('.error-msg')) {
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.setAttribute('role', 'alert');
    msg.textContent = message;
    parent.appendChild(msg);
  }

  radioGroupEl.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      radioGroupEl.classList.remove('field-error');
      const errMsg = parent && parent.querySelector('.error-msg');
      if (errMsg) errMsg.remove();
    }, { once: true });
  });
}

/**
 * Validates all required fields in a form (text, email, tel, number, url,
 * textarea, select, radio groups). Skips checkboxes (handled separately).
 * @returns {boolean} true if all required fields are valid
 */
function validateForm(form) {
  clearFormErrors(form);
  let isValid = true;
  let firstErrorEl = null;

  const markFirst = (el) => { if (!firstErrorEl) firstErrorEl = el; };

  // 1. Required text / email / tel / number / url inputs and textareas
  form.querySelectorAll(
    'input[required]:not([type="radio"]):not([type="checkbox"]), textarea[required]'
  ).forEach(field => {
    const val = field.value.trim();
    if (!val) {
      setFieldError(field, 'This field is required.');
      isValid = false;
      markFirst(field);
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setFieldError(field, 'Please enter a valid email address.');
      isValid = false;
      markFirst(field);
    }
  });

  // 2. Required <select> elements
  form.querySelectorAll('select[required]').forEach(select => {
    if (!select.value) {
      setFieldError(select, 'Please select an option.');
      isValid = false;
      markFirst(select);
    }
  });

  // 3. Required radio groups — group by name, check at least one selected
  const radioGroups = {};
  form.querySelectorAll('input[type="radio"]').forEach(radio => {
    // Treat every radio group that has ANY radio with required as required
    if (!radioGroups[radio.name]) radioGroups[radio.name] = [];
    radioGroups[radio.name].push(radio);
  });

  Object.values(radioGroups).forEach(radios => {
    const isRequired = radios.some(r => r.hasAttribute('required'));
    if (!isRequired) return;
    const anyChecked = radios.some(r => r.checked);
    if (!anyChecked) {
      const groupEl = radios[0].closest('.radio-group');
      setRadioGroupError(groupEl, 'Please select an option.');
      isValid = false;
      markFirst(radios[0]);
    }
  });

  // Scroll to and focus first error
  if (firstErrorEl) {
    firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { try { firstErrorEl.focus(); } catch (_) {} }, 350);
  }

  return isValid;
}

// =========================================================================
// 15b. FORM SUBMISSION HANDLER
// =========================================================================
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;

  // ── Validate all required fields before touching the network ──
  if (!validateForm(form)) {
    showToast('Please fill in all required fields.', 'error');
    // Shake the submit button for tactile feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.classList.add('form-shake');
      submitBtn.addEventListener('animationend', () => submitBtn.classList.remove('form-shake'), { once: true });
    }
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;

  // Visual loading state
  btn.innerHTML = 'Sending <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
  btn.disabled = true;

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        btn.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Submitted!';
        btn.style.background = 'var(--color-cyan)';
        btn.style.color = '#000';

        showToast(
          'Thank you! Your application has been received. Our team will be in touch shortly.',
          'success'
        );

        setTimeout(() => {
          closeModal();
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 2500);
      } else {
        console.error('Web3Forms error:', data);
        const reason = data.message ? ` (${data.message})` : '';
        showToast(
          `Submission failed${reason}. Please try again or contact us on WhatsApp.`,
          'error'
        );
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }
    })
    .catch(err => {
      console.error('Form submission error:', err);
      showToast(
        'Network error. Please check your connection and try again, or reach us on WhatsApp.',
        'error'
      );
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    });
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

// =========================================================================
// 20. Hero Video Effect
// =========================================================================
// const video = document.querySelector(".hero-video");

// const fadeDuration = 0.8; // seconds
// let fading = false;

// video.addEventListener("timeupdate", () => {
//     if (!fading && video.duration - video.currentTime <= fadeDuration) {
//         fading = true;
//         video.style.opacity = "0.08";
//     }
// });

// video.addEventListener("ended", () => {
//     video.currentTime = 0;
//     video.play();

//     setTimeout(() => {
//         video.style.opacity = "0.28";
//         fading = false;
//     }, 100);
// });

// =========================================================================
// 20. SIGNATURE ASSISTANT — GUIDED CHAT WIDGET
// =========================================================================
(function () {
  const root = document.getElementById('sigChat');
  if (!root) return;

  const launcher = document.getElementById('sigChatLauncher');
  const panel = document.getElementById('sigChatPanel');
  const body = document.getElementById('sigChatBody');
  const badge = document.getElementById('sigChatBadge');
  const teaser = document.getElementById('sigChatTeaser');
  const teaserClose = document.getElementById('sigChatTeaserClose');
  const headerClose = document.getElementById('sigChatHeaderClose');
  const quickbar = document.getElementById('sigChatQuickbar');
  const form = document.getElementById('sigChatForm');
  const input = document.getElementById('sigChatInput');

  const SEEN_KEY = 'sigChatTeaserSeen';
  const CONTACT_LINKS = {
    call: 'tel:+17803947675',
    whatsapp: 'https://wa.me/17803947675',
    email: 'mailto:Sigevents.ca@gmail.com',
    instagram: 'https://www.instagram.com/signature_premier_events.inc?igsh=MThtcjRwZDU3NmR4Nw%3D%3D&utm_source=qr',
    facebook: 'https://www.facebook.com/share/1DFVsWZ91C/?mibextid=wwXIfr'
  };

  let hasGreeted = false;

  // ------------------------------------------------------------------
  // Conversation "script" — every branch is predefined, no AI involved
  // ------------------------------------------------------------------
  const MENU_OPTIONS = [
    { action: 'our-story', icon: 'fa-book-open', label: 'Our Story' },
    { action: 'events', icon: 'fa-ticket', label: 'Upcoming Events' },
    { action: 'get-involved', icon: 'fa-hands-holding-circle', label: 'Get Involved' },
    { action: 'contact', icon: 'fa-comment-dots', label: 'Contact Us' },
    { action: 'follow', icon: 'fa-share-nodes', label: 'Follow Us' }
  ];

  function menuOptionsBlock(extra) {
    return (extra || []).concat(MENU_OPTIONS.map(o => ({
      label: o.label, icon: o.icon, action: o.action
    })));
  }

  const BRANCHES = {

    greeting: {
      messages: [
        "<strong>Hello There! 👋</strong> Welcome to Signature Premier Events.",
        "I'm your guided assistant — pick an option below and I'll take it from there."
      ],
      options: () => menuOptionsBlock()
    },

    menu: {
      messages: ["Sure — here's what I can help with:"],
      options: () => menuOptionsBlock()
    },

    'our-story': {
      messages: [
        "We're <strong>Canada's premier event management and entertainment community</strong> — built for the Malayali diaspora, from Toronto to Vancouver.",
        "From concerts and dance competitions to award nights and cultural festivals, we handle everything: production, artist management, sponsorships, and audience experience — all rooted in Malayali culture and community."
      ],
      options: () => [
        { label: 'Read Full Story', icon: 'fa-arrow-up-right-from-square', action: 'goto-about', primary: true },
        { label: 'Meet Our Events', icon: 'fa-calendar-star', action: 'events' },
        { label: '⟵ Main Menu', icon: 'fa-list', action: 'menu' }
      ]
    },

    events: {
      messages: [
        "🎟️ <strong>Next up: Mallu Iconic Night</strong>",
        "📍 Evario Events Centre, 950 Parsons Rd SW, Edmonton, AB — our biggest concert night of the season, live on stage.",
        "We also run dance competitions, cultural festivals, and award nights throughout the year across Canada."
      ],
      options: () => [
        { label: 'Book Tickets', icon: 'fa-ticket', action: 'do-tickets', primary: true },
        { label: 'View Poster', icon: 'fa-image', action: 'do-poster' },
        { label: 'See Full Lineup', icon: 'fa-calendar-days', action: 'goto-events' },
        { label: '⟵ Main Menu', icon: 'fa-list', action: 'menu' }
      ]
    },

    'get-involved': {
      messages: [
        "Love it. There are a few ways to be part of Signature Premier Events:",
        "🙌 <strong>Volunteers</strong> — help us run the show behind the scenes.<br>🎤 <strong>Artists</strong> — singers, dancers, musicians, performers.<br>🤝 <strong>Sponsors</strong> — partner your brand with our community.<br>🎙️ <strong>Emcees</strong> — host our concerts and cultural programs."
      ],
      options: () => [
        { label: 'Volunteer', icon: 'fa-people-group', action: 'goto-volunteer' },
        { label: 'Perform as Artist', icon: 'fa-microphone-lines', action: 'goto-artist' },
        { label: 'Become a Sponsor', icon: 'fa-handshake', action: 'goto-sponsor' },
        { label: 'Apply as Emcee', icon: 'fa-microphone', action: 'goto-emcee' },
        { label: '⟵ Main Menu', icon: 'fa-list', action: 'menu' }
      ]
    },

    contact: {
      messages: [
        "Happy to connect you 💬 — here's the fastest way to reach the Signature Premier Events team:"
      ],
      options: () => [
        { label: 'WhatsApp Us', icon: 'fa-brands fa-whatsapp', action: 'do-whatsapp', primary: true },
        { label: 'Call Us', icon: 'fa-phone', action: 'do-call' },
        { label: 'Email Us', icon: 'fa-envelope', action: 'do-email' },
        { label: 'Send a Message', icon: 'fa-paper-plane', action: 'do-form' },
        { label: '⟵ Main Menu', icon: 'fa-list', action: 'menu' }
      ]
    },

    follow: {
      messages: [
        "Follow along for event announcements, artist reveals, and behind-the-scenes moments 🎉"
      ],
      options: () => [
        { label: 'Instagram', icon: 'fa-brands fa-instagram', action: 'do-instagram', primary: true },
        { label: 'Facebook', icon: 'fa-brands fa-facebook', action: 'do-facebook' },
        { label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', action: 'do-whatsapp' },
        { label: '⟵ Main Menu', icon: 'fa-list', action: 'menu' }
      ]
    },

    fallback: {
      messages: [
        "I'm a guided assistant, so I stick to a few key topics — I didn't quite catch that one.",
        "Here's what I can help with:"
      ],
      options: () => menuOptionsBlock()
    },

    thanks: {
      messages: ["You're very welcome! 🌟 Anything else I can help with?"],
      options: () => menuOptionsBlock()
    }
  };

  // Actions that perform something on the page rather than opening a branch
  const DIRECT_ACTIONS = {
    'goto-about': () => { closePanel(); scrollToId('about'); },
    'goto-events': () => { closePanel(); scrollToId('events'); },
    'goto-volunteer': () => { window.location.href = 'volunteer-registration.html'; },
    'goto-artist': () => { window.location.href = 'artist-registration.html'; },
    'goto-sponsor': () => { window.location.href = 'sponsor-registration.html'; },
    'goto-emcee': () => { window.location.href = 'emcee-application.html'; },
    'do-tickets': () => { closePanel(); if (typeof openModal === 'function') window.open('https://events.mazhathulli.ca/event/mallu-iconic-night-march-2027', '_blank', 'noopener'); },
    'do-poster': () => { closePanel(); if (typeof openPosterModal === 'function') openPosterModal(); },
    'do-form': () => { closePanel(); if (typeof openModal === 'function') openModal('Get In Touch', 'General Enquiry'); },
    'do-whatsapp': () => window.open(CONTACT_LINKS.whatsapp, '_blank', 'noopener'),
    'do-call': () => { window.location.href = CONTACT_LINKS.call; },
    'do-email': () => { window.location.href = CONTACT_LINKS.email; },
    'do-instagram': () => window.open(CONTACT_LINKS.instagram, '_blank', 'noopener'),
    'do-facebook': () => window.open(CONTACT_LINKS.facebook, '_blank', 'noopener')
  };

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 0;
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  }

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------
  function addBotMessage(html) {
    const row = document.createElement('div');
    row.className = 'sig-msg-row bot';
    row.innerHTML = `
      <div class="sig-msg-avatar"><i class="fa-solid fa-star"></i></div>
      <div class="sig-msg-bubble">${html}</div>
    `;
    body.appendChild(row);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'sig-msg-row user';
    row.innerHTML = '<div class="sig-msg-bubble"></div>';
    row.querySelector('.sig-msg-bubble').textContent = text;
    body.appendChild(row);
    scrollToBottom();
  }

  function addOptions(options) {
    if (!options || !options.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'sig-msg-options';
    options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sig-opt-btn' + (opt.primary ? ' sig-opt-primary' : '');
      const iconClass = opt.icon && opt.icon.indexOf('fa-') === 0 ? `fa-solid ${opt.icon}` : opt.icon;
      btn.innerHTML = `<i class="${iconClass}"></i> ${opt.label}`;
      btn.addEventListener('click', () => handleAction(opt.action, opt.label));
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    scrollToBottom();
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'sig-msg-row bot sig-typing';
    row.innerHTML = `
      <div class="sig-msg-avatar"><i class="fa-solid fa-star"></i></div>
      <div class="sig-msg-bubble">
        <span class="sig-typing-dot"></span><span class="sig-typing-dot"></span><span class="sig-typing-dot"></span>
      </div>
    `;
    body.appendChild(row);
    scrollToBottom();
    return row;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
  }

  function playBranch(key) {
    const branch = BRANCHES[key];
    if (!branch) return;
    const typingRow = showTyping();

    setTimeout(() => {
      typingRow.remove();
      branch.messages.forEach((msg, idx) => {
        setTimeout(() => {
          addBotMessage(msg);
          if (idx === branch.messages.length - 1) {
            addOptions(branch.options ? branch.options() : []);
          }
        }, idx * 260);
      });
    }, 550 + Math.random() * 300);
  }

  function handleAction(action, label) {
    if (label) addUserMessage(label);

    if (DIRECT_ACTIONS[action]) {
      // Give a tiny beat before firing the direct action so the tap feels acknowledged
      const typingRow = action.indexOf('goto-') === 0 || action.indexOf('do-') === 0 ? null : showTyping();
      DIRECT_ACTIONS[action]();
      if (typingRow) typingRow.remove();
      return;
    }

    if (BRANCHES[action]) {
      playBranch(action);
      return;
    }

    playBranch('fallback');
  }

  // ------------------------------------------------------------------
  // Free-text keyword matching (still fully rule-based, no AI)
  // ------------------------------------------------------------------
  const KEYWORD_MAP = [
    { pattern: /\b(hi|hello|hey|vanakkam|namaste)\b/i, branch: 'greeting' },
    { pattern: /\b(thank|thanks|thx)\b/i, branch: 'thanks' },
    { pattern: /\b(story|about|who are you|history|founded)\b/i, branch: 'our-story' },
    { pattern: /\b(event|ticket|concert|show|lineup|mallu iconic|when|date|venue)\b/i, branch: 'events' },
    { pattern: /\b(volunteer|artist|perform|sponsor|emcee|host|join|register|involve)\b/i, branch: 'get-involved' },
    { pattern: /\b(contact|call|email|whatsapp|reach|phone|number|message)\b/i, branch: 'contact' },
    { pattern: /\b(instagram|facebook|follow|social)\b/i, branch: 'follow' },
    { pattern: /\b(menu|options|help)\b/i, branch: 'menu' }
  ];

  function handleFreeText(text) {
    addUserMessage(text);
    const match = KEYWORD_MAP.find(k => k.pattern.test(text));
    playBranch(match ? match.branch : 'fallback');
  }

  // ------------------------------------------------------------------
  // Panel open / close
  // ------------------------------------------------------------------
  function openPanel() {
    root.classList.add('active');
    launcher.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    hideTeaser();
    hideBadge();
    if (!hasGreeted) {
      hasGreeted = true;
      playBranch('greeting');
    }
    setTimeout(() => input && input.focus(), 350);
  }

  function closePanel() {
    root.classList.remove('active');
    launcher.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  function togglePanel() {
    if (root.classList.contains('active')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  function hideTeaser() {
    if (teaser) teaser.classList.remove('visible');
  }

  function hideBadge() {
    if (badge) badge.classList.add('hidden');
  }

  // ------------------------------------------------------------------
  // Event bindings
  // ------------------------------------------------------------------
  launcher.addEventListener('click', togglePanel);
  headerClose.addEventListener('click', closePanel);

  if (teaserClose) {
    teaserClose.addEventListener('click', (e) => {
      e.stopPropagation();
      hideTeaser();
      try { localStorage.setItem(SEEN_KEY, '1'); } catch (err) {}
    });
  }

  if (teaser) {
    teaser.addEventListener('click', () => {
      openPanel();
    });
  }

  quickbar.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-action]');
    if (!chip) return;
    const action = chip.getAttribute('data-action');
    handleAction(action, action === 'menu' ? 'Menu' : chip.textContent.trim());
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleFreeText(text);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('active')) closePanel();
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target) && root.classList.contains('active') && window.innerWidth > 560) {
      // Click-outside-to-close only on desktop, so mobile full-screen taps inside don't misfire
    }
  });

  // Show the teaser bubble once per visitor, after a short delay
  let alreadySeen = false;
  try { alreadySeen = localStorage.getItem(SEEN_KEY) === '1'; } catch (err) {}

  if (!alreadySeen) {
    setTimeout(() => {
      if (!root.classList.contains('active') && teaser) {
        teaser.classList.add('visible');
      }
    }, 4200);

    setTimeout(() => {
      hideTeaser();
    }, 14000);
  } else {
    hideBadge();
  }
})();

// =========================================================================
// 21. ABOUT MODAL (Know More)
// =========================================================================
const aboutModalOverlay = document.getElementById('aboutModalOverlay');

function openAboutModal() {
  if (!aboutModalOverlay) return;
  aboutModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAboutModal() {
  if (!aboutModalOverlay) return;
  aboutModalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  const knowMoreBtn = document.getElementById('aboutKnowMoreBtn');
  const aboutModalClose = document.getElementById('aboutModalClose');

  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', openAboutModal);
  }

  if (aboutModalClose) {
    aboutModalClose.addEventListener('click', closeAboutModal);
  }
});

// Close About Modal on clicking outside the panel
window.addEventListener('click', (e) => {
  if (aboutModalOverlay && e.target === aboutModalOverlay) {
    closeAboutModal();
  }
});

// Close About Modal on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && aboutModalOverlay && aboutModalOverlay.classList.contains('active')) {
    closeAboutModal();
  }
});