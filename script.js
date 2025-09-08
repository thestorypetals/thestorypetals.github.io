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

    document.fonts.ready.then(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.querySelector('.main-content');
        const overlayContent = document.getElementById('overlay-content');
        const progressRing = document.querySelector('.progress-ring');
        const videoOverlay = document.getElementById('video-overlay');
        const loadingLogo = document.getElementById('loading-logo'); // ADDED

        if (loadingScreen && mainContent && overlayContent && progressRing && videoOverlay) {
            // Start the transition
            // 1. Fade out the spinner and logo
            if(loadingLogo) loadingLogo.style.opacity = '0'; // ADDED
            progressRing.style.opacity = '0';

            // 2. Fade the loading screen background to transparent
            loadingScreen.style.backgroundColor = 'transparent';

            // 3. Simultaneously fade in the main content and hero overlay
            mainContent.style.opacity = '1';
            overlayContent.style.opacity = '1';

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
});
