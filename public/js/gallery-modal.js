document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced gallery modal script loaded');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    let currentImageIndex = 0;
    let isModalOpen = false;
    
    console.log('Found gallery items:', galleryItems.length);
    console.log('Modal elements:', { imageModal, modalImage, modalClose, modalOverlay });
    
    // Exit if modal elements don't exist (not on gallery page)
    if (!imageModal || !modalImage || !modalClose) {
        console.log('Modal elements not found - not on gallery page');
        return;
    }
    
    // Create navigation arrows
    createNavigationArrows();
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        console.log('Adding click listener to item', index);
        item.addEventListener('click', function(e) {
            console.log('Gallery item clicked:', index);
            e.preventDefault();
            currentImageIndex = index;
            openModal(index);
        });
        
        // Also add cursor pointer style
        item.style.cursor = 'pointer';
    });
    
    function createNavigationArrows() {
        // Create previous arrow
        const prevArrow = document.createElement('button');
        prevArrow.className = 'modal-nav-arrow modal-prev-arrow';
        prevArrow.innerHTML = '&#8249;'; // Left chevron
        prevArrow.setAttribute('aria-label', 'Previous image');
        
        // Create next arrow
        const nextArrow = document.createElement('button');
        nextArrow.className = 'modal-nav-arrow modal-next-arrow';
        nextArrow.innerHTML = '&#8250;'; // Right chevron
        nextArrow.setAttribute('aria-label', 'Next image');
        
        // Add arrows to modal content
        const modalContent = document.querySelector('.modal-content');
        modalContent.appendChild(prevArrow);
        modalContent.appendChild(nextArrow);
        
        // Add event listeners
        prevArrow.addEventListener('click', function(e) {
            e.stopPropagation();
            showPreviousImage();
        });
        
        nextArrow.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }
    
    function openModal(index) {
        console.log('Opening modal for index:', index);
        currentImageIndex = index;
        isModalOpen = true;
        
        const imageSrc = galleryItems[index].dataset.image;
        const imageAlt = galleryItems[index].querySelector('img').alt;
        
        console.log('Image source:', imageSrc);
        console.log('Image alt:', imageAlt);
        
        // Show modal immediately
        imageModal.style.display = 'block';
        imageModal.classList.add('show');
        imageModal.classList.remove('hide');
        
        // Load the image
        loadImage(imageSrc, imageAlt);
        
        // Update arrow visibility
        updateArrowVisibility();
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    }
    
    function loadImage(src, alt) {
        modalImage.onload = function() {
            console.log('✓ Image loaded successfully!');
            console.log('Image dimensions:', this.naturalWidth, 'x', this.naturalHeight);
        };
        
        modalImage.onerror = function() {
            console.error('✗ Failed to load image:', src);
            console.error('Full URL attempted:', this.src);
            // Show a placeholder or error message
            this.alt = 'Image failed to load: ' + src;
            this.style.backgroundColor = '#333';
            this.style.color = 'white';
            this.style.padding = '20px';
            this.style.textAlign = 'center';
        };
        
        modalImage.src = src;
        modalImage.alt = alt;
    }
    
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const imageSrc = galleryItems[currentImageIndex].dataset.image;
            const imageAlt = galleryItems[currentImageIndex].querySelector('img').alt;
            loadImage(imageSrc, imageAlt);
            updateArrowVisibility();
        }
    }
    
    function showNextImage() {
        if (currentImageIndex < galleryItems.length - 1) {
            currentImageIndex++;
            const imageSrc = galleryItems[currentImageIndex].dataset.image;
            const imageAlt = galleryItems[currentImageIndex].querySelector('img').alt;
            loadImage(imageSrc, imageAlt);
            updateArrowVisibility();
        }
    }
    
    function updateArrowVisibility() {
        const prevArrow = document.querySelector('.modal-prev-arrow');
        const nextArrow = document.querySelector('.modal-next-arrow');
        
        if (prevArrow && nextArrow) {
            // Hide previous arrow on first image
            prevArrow.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
            prevArrow.style.cursor = currentImageIndex === 0 ? 'default' : 'pointer';
            
            // Hide next arrow on last image
            nextArrow.style.opacity = currentImageIndex === galleryItems.length - 1 ? '0.3' : '1';
            nextArrow.style.cursor = currentImageIndex === galleryItems.length - 1 ? 'default' : 'pointer';
        }
    }
    
    function handleKeyboardNavigation(e) {
        if (!isModalOpen) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentImageIndex > 0) {
                    showPreviousImage();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentImageIndex < galleryItems.length - 1) {
                    showNextImage();
                }
                break;
            case 'Escape':
                e.preventDefault();
                closeModal();
                break;
        }
    }
    
    // Close modal function
    function closeModal() {
        console.log('Closing modal');
        isModalOpen = false;
        imageModal.classList.add('hide');
        imageModal.classList.remove('show');
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
        
        // Remove keyboard navigation
        document.removeEventListener('keydown', handleKeyboardNavigation);
        
        // Hide modal after animation completes
        setTimeout(function() {
            imageModal.style.display = 'none';
            // Reset classes for next use
            imageModal.classList.remove('hide');
        }, 300);
    }
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            closeModal();
        });
    }
    
    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            console.log('Overlay clicked');
            closeModal();
        });
    }
    
    // Prevent modal from closing when clicking on the image itself or arrows
    if (modalImage) {
        modalImage.addEventListener('click', function(e) {
            console.log('Modal image clicked - preventing close');
            e.stopPropagation();
        });
    }
});