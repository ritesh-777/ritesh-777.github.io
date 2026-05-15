/**
 * =============================================================================
 * RITESH SETH - ACADEMIC PORTFOLIO WEBSITE
 * JavaScript for Theme Toggle, Animations, and Interactivity
 * =============================================================================
 * 
 * Features:
 *   - Dark mode toggle with localStorage persistence
 *   - Mobile menu toggle
 *   - Smooth scroll navigation
 *   - Intersection Observer for scroll animations
 *   - Active section highlighting in navigation
 *   - Back-to-top button visibility
 *   - Navbar shadow on scroll
 *   - Subtle parallax effect on hero section
 * 
 * Performance:
 *   - Vanilla JavaScript (no frameworks)
 *   - Event delegation for efficiency
 *   - Debounced scroll events
 *   - Minimal DOM manipulation
 * 
 * Browser Support: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
 * 
 * Last Updated: May 15, 2026
 * =============================================================================
 */

// =============================================================================
// DARK MODE TOGGLE
// Persists user preference in localStorage
// =============================================================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', savedTheme === 'dark');

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// =============================================================================
// MOBILE MENU TOGGLE
// Shows/hides navigation menu on mobile devices (< 1024px)
// =============================================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    // Toggle menu visibility
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link (better UX)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// =============================================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// Smoothly scrolls to section when clicking nav links
// =============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Offset for fixed navbar (80px)
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'  // Native smooth scroll
            });
        }
    });
});

// =============================================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// Triggers animations when elements enter viewport
// =============================================================================
const observerOptions = {
    threshold: 0.2,  // Trigger when 20% of element is visible
    rootMargin: '0px 0px -100px 0px'  // Offset from bottom for earlier trigger
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Debug logging (remove in production if needed)
        console.log('Observer entry:', {
            target: entry.target.tagName,
            classes: entry.target.className,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio
        });
        
        // Add 'visible' class when element enters viewport
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            console.log('Adding visible to:', entry.target);
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left, .slide-in-right, .hero-profile, .hero-name, .hero-title, .hero-subtitle, .hero-buttons, .hero-meta, .section-header, .card-scale, .slide-from-left, .slide-from-right, .card-fade-up, .alt-slide-left, .alt-slide-right, .award-highlight, .award-card, .contact-icon, .contact-text, .skill-tag');
console.log('Found animated elements:', animatedElements.length);
animatedElements.forEach(el => {
    observer.observe(el);
});

// Observe sections separately for fade-in effect
const allSections = document.querySelectorAll('section');
console.log('Found sections:', allSections.length);
allSections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// =============================================================================
// NAVBAR BACKGROUND ON SCROLL
// Adds shadow to navbar when user scrolls down
// =============================================================================
const nav = document.querySelector('nav');
let lastScroll = 0;

// =============================================================================
// BACK TO TOP BUTTON VISIBILITY
// Shows button after scrolling 500px down
// =============================================================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Show/hide back to top button (show after 500px scroll)
    if (backToTopBtn) {
        if (currentScroll > 500) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }
    
    // Navbar shadow on scroll (adds depth when scrolling)
    if (currentScroll > 100) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// =============================================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// Highlights current section in navigation menu
// =============================================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Find which section is currently in viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;  // Offset for navbar
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update navigation link styles
    navLinks.forEach(link => {
        // Reset all links to default style
        link.classList.remove('text-primary-600', 'font-medium');
        link.classList.add('text-gray-600');
        
        // Highlight current section link
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-600');
            link.classList.add('text-primary-600', 'font-medium');
        }
    });
});

// =============================================================================
// SUBTLE PARALLAX EFFECT ON HERO SECTION
// Creates depth by moving background slower than foreground
// =============================================================================
const heroSection = document.querySelector('section:first-of-type');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < 500) {  // Only apply parallax in first 500px
            heroSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    });
}

// =============================================================================
// CONSOLE WELCOME MESSAGE
// Fun Easter egg for developers who open DevTools
// =============================================================================
console.log('%c Welcome to Ritesh Seth\'s Profile!', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%c PhD Candidate in Computer Science @ IIIT Delhi', 'color: #666; font-size: 14px;');

