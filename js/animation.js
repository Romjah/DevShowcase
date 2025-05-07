// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin if GSAP is loaded
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTl.from('.hero-content h1', { y: 50, opacity: 0, duration: 1 });
        heroTl.from('.hero-content .subtitle', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5');
        heroTl.from('.hero-content .description', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5');
        heroTl.from('.hero-content .cta-buttons', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5');
        
        // Reveal text animation class
        gsap.utils.toArray('.reveal-text').forEach(text => {
            gsap.from(text, {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        // Project card animations
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
    }
    
    // Skills progress animation - works with or without GSAP
    const animateSkillBars = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        };
        
        const animateProgress = () => {
            skillItems.forEach(item => {
                if (isInViewport(item) && !item.classList.contains('animated')) {
                    const progressBar = item.querySelector('.progress-fill');
                    const progressValue = item.getAttribute('data-progress');
                    
                    if (progressBar) {
                        progressBar.style.width = `${progressValue}%`;
                        item.classList.add('animated');
                    }
                }
            });
        };
        
        // Initial check
        animateProgress();
        
        // Check on scroll
        window.addEventListener('scroll', animateProgress);
    };
    
    // Initialize skill bars animation
    animateSkillBars();
    
    // Timeline animations without GSAP fallback
    const animateTimelineItems = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        };
        
        const animateItems = () => {
            timelineItems.forEach((item, index) => {
                if (isInViewport(item) && !item.classList.contains('animated')) {
                    setTimeout(() => {
                        item.classList.add('fade-in', 'animated');
                    }, index * 200);
                }
            });
        };
        
        // Initial check
        animateItems();
        
        // Check on scroll
        window.addEventListener('scroll', animateItems);
    };
    
    // Initialize timeline items animation
    animateTimelineItems();
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