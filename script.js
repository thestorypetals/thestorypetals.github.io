// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION LOGIC ---

    const servicesButton = document.getElementById('services-button');
    const servicesDropdown = document.getElementById('services-dropdown');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    // Toggle the services dropdown visibility
    if (servicesButton && servicesDropdown) {
        servicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            servicesDropdown.classList.toggle('hidden');
        });
    }

    // Toggle the mobile menu visibility
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close the services dropdown if clicked outside
    window.addEventListener('click', (event) => {
        if (servicesDropdown && !servicesDropdown.classList.contains('hidden') && !servicesButton.contains(event.target)) {
            servicesDropdown.classList.add('hidden');
        }
    });

    // Add scrolled class to nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    });


    // --- LOADING SCREEN LOGIC ---

    // Hide body scrollbar initially
    document.body.style.overflow = 'hidden';

    // Use the Font Loading API to wait for custom fonts to be ready
    document.fonts.ready.then(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.querySelector('.main-content');
        const overlayContent = document.getElementById('overlay-content');
        document.body.style.overflow = 'scroll';
        if (loadingScreen && mainContent) {
            // Fade out loading screen
            loadingScreen.style.opacity = '0';
            // After fade out, hide it and restore scroll
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Matches transition duration

            // Fade in main content
            mainContent.style.opacity = '1';
        }

        // Fade in the hero text after a short delay
        if(overlayContent) {
            setTimeout(() => {
                overlayContent.classList.remove('opacity-0');
                overlayContent.classList.add('opacity-100');
            }, 500);
        }
    });
});
