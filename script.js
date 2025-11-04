// Language switching functionality
let currentLang = 'en';

function toggleLanguage() {
    const langBtn = document.getElementById('langBtn');
    const enElements = document.querySelectorAll('.en');
    const cnElements = document.querySelectorAll('.cn');

    if (currentLang === 'en') {
        // Switch to Chinese
        enElements.forEach(el => el.style.display = 'none');
        cnElements.forEach(el => el.style.display = 'block');
        langBtn.textContent = 'English';
        document.documentElement.lang = 'zh-CN';
        currentLang = 'cn';
        localStorage.setItem('preferredLanguage', 'cn');
    } else {
        // Switch to English
        enElements.forEach(el => {
            if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
                el.style.display = 'block';
            } else {
                el.style.display = '';
            }
        });
        cnElements.forEach(el => el.style.display = 'none');
        langBtn.textContent = '中文';
        document.documentElement.lang = 'en';
        currentLang = 'en';
        localStorage.setItem('preferredLanguage', 'en');
    }
}

// Load preferred language on page load
document.addEventListener('DOMContentLoaded', () => {
    const preferredLang = localStorage.getItem('preferredLanguage');
    if (preferredLang === 'cn') {
        toggleLanguage();
    }

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effect for publication links
    document.querySelectorAll('.pub-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '6px';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Keyboard shortcut for language toggle (Alt + L)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'l') {
        toggleLanguage();
    }
});
