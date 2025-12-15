document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const featuredServices = document.querySelector('.featured-services');
    
    // Scroll to featured services when arrow is clicked
    scrollArrow.addEventListener('click', function() {
      featuredServices.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Hide arrow when user scrolls down
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        scrollArrow.style.opacity = '0';
        // Disable pointer events when invisible
        setTimeout(() => {
          scrollArrow.style.pointerEvents = 'none';
        }, 300);
      } else {
        scrollArrow.style.opacity = '1';
        scrollArrow.style.pointerEvents = 'auto';
      }
    });
  });