document.addEventListener('DOMContentLoaded', function() {
  // Parallax effect on hero image
  const parallaxImage = document.querySelector('.parallax-image');
  if (parallaxImage) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      parallaxImage.style.transform = `translateY(${scrollY * 0.4}px)`;
    });
  }
  
  // Apply smooth scrolling for iOS-like experience
  const applyIOSSmooth = () => {
    // Smooth transitions for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .program-card, .team-card, .article-card, .gallery-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.classList.add('ios-touch');
      }, {passive: true});
      
      element.addEventListener('touchend', function() {
        this.classList.remove('ios-touch');
      }, {passive: true});
    });
    
    // Add transform transition to relevant cards
    const cards = document.querySelectorAll('.program-card, .team-card, .article-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02) translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
      });
    });
  };
  
  applyIOSSmooth();
  
  // Initialize gallery lightbox if gallery exists
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      const link = item.querySelector('.gallery-link');
      const image = item.querySelector('.gallery-image');
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const lightboxImage = document.createElement('img');
        lightboxImage.src = this.getAttribute('href');
        lightboxImage.alt = this.getAttribute('data-title');
        
        const lightboxClose = document.createElement('button');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';
        
        const lightboxTitle = document.createElement('div');
        lightboxTitle.className = 'lightbox-title';
        lightboxTitle.textContent = this.getAttribute('data-title');
        
        lightboxContent.appendChild(lightboxImage);
        lightboxContent.appendChild(lightboxClose);
        lightboxContent.appendChild(lightboxTitle);
        lightbox.appendChild(lightboxContent);
        
        document.body.appendChild(lightbox);
        document.body.classList.add('lightbox-open');
        
        // Apply iOS-like animation
        setTimeout(() => {
          lightbox.classList.add('active');
        }, 10);
        
        lightboxClose.addEventListener('click', () => {
          lightbox.classList.remove('active');
          setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.classList.remove('lightbox-open');
          }, 300);
        });
        
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
              document.body.removeChild(lightbox);
              document.body.classList.remove('lightbox-open');
            }, 300);
          }
        });
      });
    });
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .lightbox.active {
        opacity: 1;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
      }
      
      .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        border-radius: 5px;
      }
      
      .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        width: 30px;
        height: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
      }
      
      .lightbox-title {
        color: white;
        text-align: center;
        margin-top: 10px;
        font-size: 16px;
      }
      
      body.lightbox-open {
        overflow: hidden;
      }
    `;
    
    document.head.appendChild(style);
  }
});
