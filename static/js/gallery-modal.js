document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery modal script loaded');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    console.log('Found gallery items:', galleryItems.length);
    console.log('Modal elements:', { imageModal, modalImage, modalClose, modalOverlay });
    
    // Exit if modal elements don't exist (not on gallery page)
    if (!imageModal || !modalImage || !modalClose) {
        console.log('Modal elements not found - not on gallery page');
        return;
    }
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        console.log('Adding click listener to item', index);
        item.addEventListener('click', function(e) {
            console.log('Gallery item clicked:', index);
            e.preventDefault();
            
            const imageSrc = this.dataset.image;
            const imageAlt = this.querySelector('img').alt;
            
            console.log('Image source:', imageSrc);
            console.log('Image alt:', imageAlt);
            console.log('Full URL will be:', window.location.origin + '/' + imageSrc);
            
            // Show modal immediately
            imageModal.style.display = 'block';
            imageModal.classList.add('show');
            imageModal.classList.remove('hide');
            
            // Try to load the image with detailed logging
            modalImage.onload = function() {
                console.log('✓ Image loaded successfully!');
                console.log('Image dimensions:', this.naturalWidth, 'x', this.naturalHeight);
            };
            
            modalImage.onerror = function() {
                console.error('✗ Failed to load image:', imageSrc);
                console.error('Full URL attempted:', this.src);
                // Show a placeholder or error message
                this.alt = 'Image failed to load: ' + imageSrc;
                this.style.backgroundColor = '#333';
                this.style.color = 'white';
                this.style.padding = '20px';
                this.style.textAlign = 'center';
            };
            
            // Set the image source
            modalImage.src = imageSrc;
            modalImage.alt = imageAlt;
            
            console.log('Modal should be visible now');
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        });
        
        // Also add cursor pointer style
        item.style.cursor = 'pointer';
    });
    
    // Close modal function
    function closeModal() {
        console.log('Closing modal');
        imageModal.classList.add('hide');
        imageModal.classList.remove('show');
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
        
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
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            console.log('Escape key pressed');
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking on the image itself
    if (modalImage) {
        modalImage.addEventListener('click', function(e) {
            console.log('Modal image clicked - preventing close');
            e.stopPropagation();
        });
    }
});