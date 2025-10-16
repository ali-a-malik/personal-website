// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
darkModeToggle.setAttribute('aria-pressed', currentTheme === 'dark');

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    darkModeToggle.setAttribute('aria-pressed', newTheme === 'dark');
});

// Smooth Scrolling for anchor links
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

// Active Navigation Highlighting using IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            formStatus.className = 'success';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again or email me directly.';
        formStatus.className = 'error';
    }

    // Clear status message after 5 seconds
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = '';
    }, 5000);
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any active modals or reset focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }

    // Press 'D' to toggle dark mode (when not in input fields)
    if (e.key === 'd' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        darkModeToggle.click();
    }
});

// Lazy load images with Intersection Observer
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Add subtle animations on scroll for project cards
const projectCards = document.querySelectorAll('.project-card');
const skillPills = document.querySelectorAll('.pill');

const animateOnScrollOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animateOnScrollOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(card);
});

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Portfolio website loaded successfully!');
    console.log('Theme:', html.getAttribute('data-theme'));
});

