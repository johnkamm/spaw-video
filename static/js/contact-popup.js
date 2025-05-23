// Production contact-popup.js - clean version without debug logging
document.addEventListener('DOMContentLoaded', function() {
  // Find all contact links by text content
  const allLinks = document.querySelectorAll('a');
  const contactLinks = [];
  
  allLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    if (linkText === 'contact') {
      contactLinks.push(link);
    }
  });
  
  const contactPopup = document.querySelector('.contact-popup');
  const contactOverlay = document.querySelector('.contact-popup-overlay');
  const closeButton = document.querySelector('.close-popup');
  const contactForm = document.getElementById('contact-form');
  
  // Exit if required elements don't exist
  if (!contactPopup || !contactOverlay) {
    return;
  }
  
  // Add event listeners to all contact links
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
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
      
      if (hamburgerMenu && navMenu && menuOverlay) {
        hamburgerMenu.classList.remove('open');
        navMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
      }
    });
  });
  
  // Close popup when clicking the close button
  if (closeButton) {
    closeButton.addEventListener('click', closeContactPopup);
  }
  
  // Close popup when clicking outside
  if (contactOverlay) {
    contactOverlay.addEventListener('click', closeContactPopup);
  }
  
  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Reset the form
      contactForm.reset();
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Close the popup
      closeContactPopup();
    });
  }
  
  function closeContactPopup() {
    if (!contactPopup || !contactOverlay) {
      return;
    }
    
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