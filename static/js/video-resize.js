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
    
    // Allow scrolling for content below hero
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
    
    // Only prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
  }
  
  // Call immediately
  resizeVideo();
  
  // Call when video metadata is loaded
  video.addEventListener('loadedmetadata', resizeVideo);
  
  // Call on window resize
  window.addEventListener('resize', resizeVideo);
});