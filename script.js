// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile menu toggle - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenuOverlay.classList.toggle('hidden');
    }

    if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                mobileMenuOverlay.classList.add('hidden');
            });
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections and elements with animation classes
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe cards and other elements
document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary-600', 'font-medium');
        link.classList.add('text-gray-600');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-600');
            link.classList.add('text-primary-600', 'font-medium');
        }
    });
});

// Add subtle parallax effect to hero section
const heroSection = document.querySelector('section:first-of-type');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < 500) {
            heroSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    });
}

// Console welcome message
console.log('%c Welcome to Ritesh Seth\'s Profile!', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%c PhD Candidate in Computer Science @ IIIT Delhi', 'color: #666; font-size: 14px;');
