// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION LOGIC ---

    const servicesButton = document.getElementById('services-button');
    const servicesDropdown = document.getElementById('services-dropdown');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    if (servicesButton && servicesDropdown) {
        servicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            servicesDropdown.classList.toggle('hidden');
        });
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the active class on the button for the animation
            mobileMenuButton.classList.toggle('is-active');
            // Toggle the menu visibility
            mobileMenu.classList.toggle('hidden');
        });
    }

    window.addEventListener('click', (event) => {
        if (servicesDropdown && !servicesDropdown.classList.contains('hidden') && !servicesButton.contains(event.target)) {
            servicesDropdown.classList.add('hidden');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    });

    // --- LOADING SCREEN & HERO ANIMATION LOGIC ---

    document.body.style.overflow = 'hidden';

    // Using Promise.all to wait for fonts and a minimum timeout
    // This prevents the loading screen from disappearing too quickly on fast connections
    Promise.all([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 1000)) // Minimum 1-second display
    ]).then(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.querySelector('.main-content');
        const overlayContent = document.getElementById('overlay-content');
        const progressRing = document.querySelector('.progress-ring');
        const videoOverlay = document.getElementById('video-overlay');
        const loadingLogo = document.getElementById('loading-logo');

        if (loadingScreen && mainContent && overlayContent && progressRing && videoOverlay) {
            // Start the transition
            // 1. Fade out the spinner and logo
            if(loadingLogo) loadingLogo.style.opacity = '0';
            progressRing.style.opacity = '0';

            // 2. Fade the loading screen background to transparent
            loadingScreen.style.backgroundColor = 'transparent';

            // 3. Simultaneously fade in the main content and hero overlay
            mainContent.style.opacity = '1';
            if (overlayContent) {
                overlayContent.style.opacity = '1';
            }


            // 4. After the transition, hide the loading screen and restore scroll
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = '';
            }, 800); // Corresponds to the transition duration in CSS

        } else {
            // Fallback if elements are missing
            if(loadingScreen) loadingScreen.style.display = 'none';
            if(mainContent) mainContent.style.opacity = '1';
            document.body.style.overflow = '';
        }
    });


    // --- SCROLL-TRIGGERED ANIMATION LOGIC ---

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: Stop observing after animation
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Seamless Instagram Gallery Logic ---
    const galleryTrack = document.querySelector('.scrolling-gallery-track');
    if (galleryTrack) {
        // Clone all items and append them to the track for a seamless loop
        const galleryItems = galleryTrack.querySelectorAll('div');
        galleryItems.forEach(item => {
            galleryTrack.appendChild(item.cloneNode(true));
        });
    }
});
