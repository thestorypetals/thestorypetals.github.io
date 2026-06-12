// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION LOGIC ---

    const servicesButton = document.getElementById('services-button');
    const servicesDropdown = document.getElementById('services-dropdown');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    if (servicesButton && servicesDropdown) {
        const closeServicesDropdown = () => {
            servicesDropdown.classList.remove('is-open');
            servicesButton.setAttribute('aria-expanded', 'false');

            window.setTimeout(() => {
                if (!servicesDropdown.classList.contains('is-open')) {
                    servicesDropdown.classList.add('hidden');
                }
            }, 220);
        };

        const openServicesDropdown = () => {
            servicesDropdown.classList.remove('hidden');
            servicesButton.setAttribute('aria-expanded', 'true');
            servicesDropdown.offsetHeight;

            window.requestAnimationFrame(() => {
                servicesDropdown.classList.add('is-open');
            });
        };

        servicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (servicesDropdown.classList.contains('hidden')) {
                openServicesDropdown();
            } else {
                closeServicesDropdown();
            }
        });

        window.addEventListener('click', (event) => {
            if (!servicesDropdown.classList.contains('hidden') && !servicesButton.contains(event.target) && !servicesDropdown.contains(event.target)) {
                closeServicesDropdown();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !servicesDropdown.classList.contains('hidden')) {
                closeServicesDropdown();
            }
        });
    }

    if (mobileMenuButton && mobileMenu) {
        // We are now controlling the menu with CSS classes, so remove the 'hidden' class
        // that Tailwind adds by default. Our new CSS will handle visibility.
        mobileMenu.classList.remove('hidden');

        mobileMenuButton.addEventListener('click', () => {
            // Toggle the animation for the hamburger button itself
            mobileMenuButton.classList.toggle('is-active');

            // Toggle our new 'is-open' class on the menu panel for the animation
            mobileMenu.classList.toggle('is-open');

            // To prevent the page from scrolling while the menu is open (good UX),
            // we toggle the overflow property on the body.
            const isMenuOpen = mobileMenu.classList.contains('is-open');
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = ''; // Reverts to the default stylesheet value
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    });

    // --- LOADING SCREEN & HERO ANIMATION LOGIC ---

    document.body.style.overflow = 'hidden';

    Promise.all([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.querySelector('.main-content');
        const overlayContent = document.getElementById('overlay-content');
        const progressRing = document.querySelector('.progress-ring');

        if (loadingScreen && mainContent && overlayContent && progressRing) {
            if(document.getElementById('loading-logo')) document.getElementById('loading-logo').style.opacity = '0';
            progressRing.style.opacity = '0';
            loadingScreen.style.backgroundColor = 'transparent';
            mainContent.style.opacity = '1';
            if (overlayContent) {
                overlayContent.style.opacity = '1';
            }

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // After loading, only restore scroll if the mobile menu isn't somehow already open.
                if (mobileMenu && !mobileMenu.classList.contains('is-open')) {
                    document.body.style.overflow = '';
                }
            }, 800);

        } else {
            // Fallback
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
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05 // Trigger when 5% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Seamless Instagram Gallery Logic ---
    const galleryTrack = document.querySelector('.scrolling-gallery-track');
    if (galleryTrack) {
        const galleryItems = galleryTrack.querySelectorAll('div');
        galleryItems.forEach(item => {
            galleryTrack.appendChild(item.cloneNode(true));
        });
    }

    // --- POLICIES PAGE: DEEP LINKING ---
    // Checks if URL has a hash (e.g., policies.html#refund-policy) and opens it
    if(window.location.hash) {
        const id = window.location.hash.substring(1); // Remove the '#'
        const element = document.getElementById(id);
        
        if (element) {
            // Slight delay to ensure layout is ready
            setTimeout(() => {
                togglePolicy(id);
                // Scroll to the button that controls this section
                const button = element.previousElementSibling;
                if(button) {
                    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
        }
    }

}); // END OF DOMContentLoaded


// --- GLOBAL FUNCTIONS (Must be outside DOMContentLoaded to work with onclick="") ---

function togglePolicy(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    if (!content) return; // Safety check if element doesn't exist

    // 1. Close other open sections (Accordion effect)
    document.querySelectorAll('.policy-content').forEach(div => {
        if (div.id !== id && div.classList.contains('open')) {
            div.style.maxHeight = null;
            div.classList.remove('open');
            const otherIcon = document.getElementById('icon-' + div.id);
            if(otherIcon) otherIcon.classList.remove('rotate-icon');
        }
    });

    // 2. Toggle the clicked section
    if (content.style.maxHeight) {
        // Close it
        content.style.maxHeight = null;
        content.classList.remove('open');
        icon.classList.remove('rotate-icon');
    } else {
        // Open it
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add('open');
        icon.classList.add('rotate-icon');
    }
}
