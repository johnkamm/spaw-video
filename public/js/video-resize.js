document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('video');
  const videoContainer = document.querySelector('.video-container');
  
  function resizeVideo() {
    // Force full screen dimensions
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.objectFit = 'cover';
    
    // Ensure video is centered
    video.style.position = 'absolute';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)';
    
    // Make container full viewport
    videoContainer.style.width = '100%';
    videoContainer.style.height = '100%';
    
    // Force body and html to not scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  
  // Call immediately
  resizeVideo();
  
  // Call when video metadata is loaded
  video.addEventListener('loadedmetadata', resizeVideo);
  
  // Call on window resize
  window.addEventListener('resize', resizeVideo);
});