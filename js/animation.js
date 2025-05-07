// GSAP animation setup
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate hero section elements on load
        gsap.from('.hero-content h1', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-content p', { 
            duration: 1, 
            y: 30, 
            opacity: 0, 
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.3
        });
        
        gsap.from('.cta-buttons .btn', { 
            duration: 1, 
            y: 20, 
            opacity: 0, 
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.8
        });
        
        gsap.from('.hero-image', { 
            duration: 1.5, 
            x: 50, 
            opacity: 0, 
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Add floating animation to hero image
        gsap.to('.floating', {
            y: 15,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
        
        // Animate section titles when they come into view
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                y: 30,
                ease: 'power3.out'
            });
        });
        
        // Animate project cards when they come into view
        gsap.utils.toArray('.projects-grid').forEach(grid => {
            gsap.from(grid.children, {
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                duration: 0.6,
                opacity: 0,
                y: 30,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });
        
        // Animate skills progress bars
        gsap.utils.toArray('.skill-item').forEach(skill => {
            const progressFill = skill.querySelector('.progress-fill');
            const progress = skill.getAttribute('data-progress');
            
            gsap.fromTo(progressFill, 
                { width: '0%' },
                {
                    scrollTrigger: {
                        trigger: skill,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    width: `${progress}%`,
                    duration: 1.5,
                    ease: 'power3.out'
                }
            );
        });
        
        // Animate timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                opacity: 0,
                x: i % 2 === 0 ? -30 : 30,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
        
        // Animate contact form and info
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            opacity: 0,
            x: -30,
            ease: 'power3.out'
        });
        
        gsap.from('.contact-form-container', {
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            opacity: 0,
            x: 30,
            ease: 'power3.out',
            delay: 0.2
        });
    } else {
        console.warn('GSAP or ScrollTrigger is not loaded.');
    }
});

// Additional scroll animations for various elements
if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.batch('.fade-in', {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
        }),
        once: true
    });
} 