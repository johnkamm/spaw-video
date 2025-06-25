// EmailJS-powered contact-popup.js

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

  // NEW: EmailJS form submission handler
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
      
      // Prepare template parameters for EmailJS
      const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Send email using EmailJS
      emailjs.send('service_98qpl0i', 'template_pxomllk', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          if (successMessage) successMessage.style.display = 'block';
          contactForm.reset();
          
          // Auto-close popup after 3 seconds
          setTimeout(function() {
            closeContactPopup();
          }, 3000);
        })
        .catch(function(error) {
          console.log('FAILED...', error);
          if (errorMessage) errorMessage.style.display = 'block';
        })
        .finally(function() {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
          }
        });
    });
  }
});