document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Toggle menu when hamburger is clicked
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('open');
        navMenu.classList.toggle('open');
        menuOverlay.classList.toggle('open');
    });
    
    // Close menu when overlay is clicked
    menuOverlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('open');
        navMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
    });
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close the menu
            hamburgerMenu.classList.remove('open');
            navMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
            
            // Handle jump links (links starting with #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});