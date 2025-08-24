// Gallery carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery images array
    const galleryImages = [
        {
            src: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Delicious Chinese Dish 1"
        },
        {
            src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Delicious Chinese Dish 2"
        },
        {
            src: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Delicious Chinese Dish 3"
        },
        {
            src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Delicious Chinese Dish 4"
        },
        {
            src: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Delicious Chinese Dish 5"
        },
        {
            src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Delicious Chinese Dish 6"
        }
    ];

    let currentIndex = 0;
    const imageContainers = document.querySelectorAll('.image-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryDotsContainer = document.getElementById('galleryDots');

    // Function to create gallery dots
    function createGalleryDots() {
        galleryDotsContainer.innerHTML = '';
        for (let i = 0; i < galleryImages.length; i++) {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot';
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => goToSlide(i));
            galleryDotsContainer.appendChild(dot);
        }
    }

    // Function to update active dot
    function updateDots() {
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Function to go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateGallery();
        updateDots();
    }

    // Check if we're on mobile (for single image display)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Function to update gallery images
    function updateGallery() {
        if (isMobile()) {
            // Mobile: show only one image
            const img1 = imageContainers[0].querySelector('img');
            img1.src = galleryImages[currentIndex].src;
            img1.alt = galleryImages[currentIndex].alt;
        } else {
            // Desktop: show three images
            const img1 = imageContainers[0].querySelector('img');
            img1.src = galleryImages[currentIndex].src;
            img1.alt = galleryImages[currentIndex].alt;

            // Update second image
            const nextIndex = (currentIndex + 1) % galleryImages.length;
            const img2 = imageContainers[1].querySelector('img');
            img2.src = galleryImages[nextIndex].src;
            img2.alt = galleryImages[nextIndex].alt;

            // Update third image
            const thirdIndex = (currentIndex + 2) % galleryImages.length;
            const img3 = imageContainers[2].querySelector('img');
            img3.src = galleryImages[thirdIndex].src;
            img3.alt = galleryImages[thirdIndex].alt;
        }
        updateDots();
    }

    // Next button functionality
    nextBtn.addEventListener('click', function() {
        if (isMobile()) {
            // Mobile: move one image at a time
            currentIndex = (currentIndex + 1) % galleryImages.length;
        } else {
            // Desktop: move three images at a time
            currentIndex = (currentIndex + 3) % galleryImages.length;
        }
        updateGallery();
    });

    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        if (isMobile()) {
            // Mobile: move one image at a time
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        } else {
            // Desktop: move three images at a time
            currentIndex = (currentIndex - 3 + galleryImages.length) % galleryImages.length;
        }
        updateGallery();
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize gallery and dots
    createGalleryDots();
    updateGallery();

    // Auto-advance gallery every 5 seconds
    setInterval(function() {
        if (isMobile()) {
            // Mobile: advance one image at a time
            currentIndex = (currentIndex + 1) % galleryImages.length;
        } else {
            // Desktop: advance three images at a time
            currentIndex = (currentIndex + 3) % galleryImages.length;
        }
        updateGallery();
    }, 5000);

    // Handle window resize to update gallery behavior
    window.addEventListener('resize', function() {
        updateGallery();
    });

    // Touch/swipe gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const galleryImagesContainer = document.querySelector('.gallery-images');

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next image
            if (isMobile()) {
                currentIndex = (currentIndex + 1) % galleryImages.length;
                updateGallery();
            }
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous image
            if (isMobile()) {
                currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                updateGallery();
            }
        }
    }

    galleryImagesContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryImagesContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Prevent default touch behavior to avoid scrolling conflicts
    galleryImagesContainer.addEventListener('touchmove', function(e) {
        if (Math.abs(e.changedTouches[0].screenX - touchStartX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    // Add scroll effect to navbar
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});