// Import translations and project data
import { translations, projectsDataTranslations } from './translations.js';
import { updateProjectsLanguage } from './projects.js';

// DOM Elements
const header = document.getElementById('header');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const skillItems = document.querySelectorAll('.skill-item');
const revealTexts = document.querySelectorAll('.reveal-text');

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Theme Toggle Functionality
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize theme based on saved preference or system preference
function initTheme() {
    if (isDarkMode || (localStorage.getItem('darkMode') === null && 
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        isDarkMode = true;
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        isDarkMode = false;
        localStorage.setItem('darkMode', 'false');
    }
}

initTheme();

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Language Toggle Functionality
let currentLang = localStorage.getItem('language') || 'fr';
let isEnglish = currentLang === 'en';

// Get element by translation key
function getElementByTransKey(key) {
    return document.querySelector(`[data-trans-key="${key}"]`);
}

// Update all translatable elements
function updatePageLanguage() {
    // Update the language toggle button
    langToggle.innerHTML = `<span>${currentLang.toUpperCase()}</span>`;
    
    // Update all elements with data-trans-key attribute
    document.querySelectorAll('[data-trans-key]').forEach(element => {
        const key = element.getAttribute('data-trans-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            // Check if the translation contains HTML (like spans with classes)
            if (translations[currentLang][key].includes('<')) {
                element.innerHTML = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // Update page language attribute
    document.documentElement.lang = currentLang;
    
    // Update projects
    updateProjectsLanguage(currentLang);
}

function initLanguage() {
    // Set initial language
    updatePageLanguage();
}

initLanguage();

langToggle.addEventListener('click', () => {
    // Toggle between 'fr' and 'en'
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    isEnglish = currentLang === 'en';
    localStorage.setItem('language', currentLang);
    
    // Update content
    updatePageLanguage();
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px var(--shadow-color)';
    } else {
        header.style.padding = '';
        header.style.boxShadow = '';
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill progress animation
function animateSkills() {
    skillItems.forEach(item => {
        const progress = item.getAttribute('data-progress');
        const progressFill = item.querySelector('.progress-fill');
        
        progressFill.style.width = `${progress}%`;
    });
}

// Reveal text animation for hero section
function revealHeroText() {
    revealTexts.forEach((text, index) => {
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 300 * index);
    });
}

// Scroll animations using Intersection Observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-item, .project-card, .testimonial-item, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // If it's a skill item, animate the progress bar
                if (entry.target.classList.contains('skill-item')) {
                    const progress = entry.target.getAttribute('data-progress');
                    const progressFill = entry.target.querySelector('.progress-fill');
                    progressFill.style.width = `${progress}%`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // We would add form validation and submission code here
        // For now, we're just handling the form submission visually
        
        // If using FormSubmit, the form will be submitted automatically
        // If using a custom endpoint, we would handle the submission with fetch
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    revealHeroText();
    animateOnScroll();
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 