document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.lazy-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px' });

  sections.forEach(section => observer.observe(section));
});