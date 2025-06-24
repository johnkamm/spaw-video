// Production contact-popup.js - clean version without debug logging

// Global functions for onclick handlers
function openContactPopup() {
  const contactPopup = document.querySelector('.contact-popup');
  const contactOverlay = document.querySelector('.contact-popup-overlay');
  
  if (!contactPopup || !contactOverlay) return;
  
  // Open popup
  contactPopup.style.display = 'block';
  contactOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
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
  
  // Add escape key listener when popup opens
  document.addEventListener('keydown', escapeKeyHandler);
}

function closeContactPopup() {
  const contactPopup = document.querySelector('.contact-popup');
  const contactOverlay = document.querySelector('.contact-popup-overlay');
  
  if (!contactPopup || !contactOverlay) return;
  
  // Remove escape key listener when popup closes
  document.removeEventListener('keydown', escapeKeyHandler);
  
  // Add fade-out animation
  contactPopup.classList.remove('fade-in');
  contactOverlay.classList.remove('fade-in');
  contactPopup.classList.add('fade-out');
  contactOverlay.classList.add('fade-out');
  
  // Hide elements after animation completes
  setTimeout(function() {
    contactPopup.style.display = 'none';
    contactOverlay.style.display = 'none';
    document.body.style.overflow = '';
    contactPopup.classList.remove('fade-out');
    contactOverlay.classList.remove('fade-out');
    
    // Reset form and messages if they exist
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (contactForm) contactForm.reset();
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
  }, 300);
}

function escapeKeyHandler(e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    closeContactPopup();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Find all contact links by text content (for any remaining text-based triggers)
  const allLinks = document.querySelectorAll('a');
  const contactLinks = [];
  
  allLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    if (linkText === 'contact' && !link.hasAttribute('onclick')) {
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
  
  // Add event listeners to contact links that don't have onclick handlers
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openContactPopup();
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
      
      const submitButton = document.getElementById('submitButton');
      const successMessage = document.getElementById('successMessage');
      const errorMessage = document.getElementById('errorMessage');
      
      // Hide previous messages
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';
      
      // Disable submit button
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      
      // Check if this is a Formspree form (from your index.html)
      if (this.action && this.action.includes('formspree.io')) {
        // Use Formspree submission
        const formData = new FormData(this);
        fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }).then(function(response) {
          if (response.ok) {
            if (successMessage) successMessage.style.display = 'block';
            contactForm.reset();
          } else {
            throw new Error('Network response was not ok');
          }
        }).catch(function(error) {
          if (errorMessage) errorMessage.style.display = 'block';
        }).finally(function() {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
          }
        });
      } else {
        // Fallback - could add EmailJS here if needed
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        closeContactPopup();
        
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      }
    });
  }
});