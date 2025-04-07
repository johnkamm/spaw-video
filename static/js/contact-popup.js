document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const contactLink = document.querySelector('.nav-menu a[href="/contact"]');
    const contactPopup = document.querySelector('.contact-popup');
    const contactOverlay = document.querySelector('.contact-popup-overlay');
    const closeButton = document.querySelector('.close-popup');
    const contactForm = document.getElementById('contact-form');
    
    // Prevent default navigation for contact link
    contactLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Open popup
      contactPopup.style.display = 'block';
      contactOverlay.style.display = 'block';
      
      // Add animation classes
      contactPopup.classList.add('fade-in');
      contactOverlay.classList.add('fade-in');
      
      // Close the hamburger menu if it's open
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      const navMenu = document.querySelector('.nav-menu');
      const menuOverlay = document.querySelector('.menu-overlay');
      
      hamburgerMenu.classList.remove('open');
      navMenu.classList.remove('open');
      menuOverlay.classList.remove('open');
    });
    
    // Close popup when clicking the close button
    closeButton.addEventListener('click', closeContactPopup);
    
    // Close popup when clicking outside
    contactOverlay.addEventListener('click', closeContactPopup);
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // You would typically handle the form submission with AJAX here
      // For now, we'll just show a success message and close the popup
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      console.log('Form submitted:', { name, email, subject, message });
      
      // Reset the form
      contactForm.reset();
      
      // Show a simple alert (you could replace this with a nicer notification)
      alert('Thank you for your message! We will get back to you soon.');
      
      // Close the popup
      closeContactPopup();
    });
    
    function closeContactPopup() {
      // Add fade-out animation
      contactPopup.classList.remove('fade-in');
      contactOverlay.classList.remove('fade-in');
      contactPopup.classList.add('fade-out');
      contactOverlay.classList.add('fade-out');
      
      // Hide elements after animation completes
      setTimeout(function() {
        contactPopup.style.display = 'none';
        contactOverlay.style.display = 'none';
        contactPopup.classList.remove('fade-out');
        contactOverlay.classList.remove('fade-out');
      }, 300);
    }
  });