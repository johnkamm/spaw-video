// Enhanced contact-popup.js with better debugging and page-specific handling
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact popup script loaded');
  
  // Get elements
  const contactLinks = document.querySelectorAll('.nav-menu a[href="/contact"], .footer-link[href="/contact"]');
  const contactPopup = document.querySelector('.contact-popup');
  const contactOverlay = document.querySelector('.contact-popup-overlay');
  const closeButton = document.querySelector('.close-popup');
  const contactForm = document.getElementById('contact-form');
  
  console.log('Found contact links:', contactLinks.length);
  console.log('Contact popup element:', contactPopup);
  console.log('Contact overlay element:', contactOverlay);
  
  // Add event listeners to all contact links
  contactLinks.forEach((link, index) => {
      console.log(`Adding click listener to contact link ${index}:`, link);
      link.addEventListener('click', function(e) {
          console.log('Contact link clicked:', this);
          e.preventDefault();
          
          // Check if popup elements exist
          if (!contactPopup || !contactOverlay) {
              console.error('Contact popup elements not found');
              return;
          }
          
          // Open popup
          contactPopup.style.display = 'block';
          contactOverlay.style.display = 'block';
          
          // Add animation classes
          contactPopup.classList.add('fade-in');
          contactOverlay.classList.add('fade-in');
          
          console.log('Contact popup opened');
          
          // Close the hamburger menu if it's open
          const hamburgerMenu = document.querySelector('.hamburger-menu');
          const navMenu = document.querySelector('.nav-menu');
          const menuOverlay = document.querySelector('.menu-overlay');
          
          if (hamburgerMenu && navMenu && menuOverlay) {
              hamburgerMenu.classList.remove('open');
              navMenu.classList.remove('open');
              menuOverlay.classList.remove('open');
              console.log('Hamburger menu closed');
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
          
          console.log('Form submitted:', { name, email, subject, message });
          
          // Reset the form
          contactForm.reset();
          
          // Show a simple alert (you could replace this with a nicer notification)
          alert('Thank you for your message! We will get back to you soon.');
          
          // Close the popup
          closeContactPopup();
      });
  }
  
  function closeContactPopup() {
      console.log('Closing contact popup');
      
      if (!contactPopup || !contactOverlay) {
          console.error('Contact popup elements not found for closing');
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
          console.log('Contact popup hidden');
      }, 300);
  }
});