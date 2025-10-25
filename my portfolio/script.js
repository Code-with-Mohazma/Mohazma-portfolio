// Basic DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Update year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  menuBtn && menuBtn.addEventListener('click', () => {
    if (navList.style.display === 'flex') navList.style.display = '';
    else navList.style.display = 'flex';
  });

  // Gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const lbCaption = document.querySelector('.lightbox-caption');
  const lbClose = document.querySelector('.lightbox-close');

  function openLightbox(imgSrc, caption) {
    lbImg.src = imgSrc;
    lbCaption.textContent = caption || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    lbCaption.textContent = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.overlay h4')?.textContent || item.querySelector('img').alt;
    item.addEventListener('click', () => openLightbox(img.src, caption));
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(img.src, caption);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Simple contact form front-end validation (no backend)
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all fields.';
      formMsg.style.color = '#b91c1c';
      return;
    }
    // Basic email regex
    const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRE.test(email)) {
      formMsg.textContent = 'Please enter a valid email.';
      formMsg.style.color = '#b91c1c';
      return;
    }

    // If you have a backend, send via fetch() here.
    // For demo, we show success message and clear form.
    formMsg.textContent = 'Thanks — your message has been sent (demo).';
    formMsg.style.color = '#065f46';
    contactForm.reset();
  });
});
