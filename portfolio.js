// ==========================================
// PORTFOLIO WPL - JavaScript Functionality
// HTML/CSS/JS + React Background
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVIGATION FUNCTIONALITY
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==========================================
    // SCROLL SPY & NAVBAR EFFECTS
    // ==========================================
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Navbar scroll effect
    function updateNavbarBackground() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(250, 240, 230, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(37, 37, 37, 0.15)';
        } else {
            navbar.style.background = 'rgba(250, 240, 230, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(37, 37, 37, 0.1)';
        }
    }
    
    // Throttled scroll event
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                updateNavbarBackground();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // ==========================================
    // TYPED TEXT ANIMATION
    // ==========================================
    
    if (typeof Typed !== 'undefined') {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: [
                    'Student Web Development',
                    'Creative Designer', 
                    'Frontend Developer',
                    'UI/UX Enthusiast'
                ],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }
    
    // ==========================================
    // SKILLS ANIMATION
    // ==========================================
    
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillsSection = document.getElementById('skills');
    
    function animateSkillBars() {
        if (skillsSection) {
            const skillsSectionTop = skillsSection.offsetTop;
            const skillsSectionHeight = skillsSection.offsetHeight;
            const scrollPosition = window.pageYOffset + window.innerHeight;
            
            if (scrollPosition > skillsSectionTop + 100) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    }, index * 200);
                });
                
                // Remove event listener after animation
                window.removeEventListener('scroll', animateSkillBars);
            }
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    
    // ==========================================
    // PORTFOLIO FILTER
    // ==========================================
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ==========================================
    // CONTACT FORM
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc2626';
                    field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                    isValid = false;
                } else {
                    field.style.borderColor = 'var(--color-medium)';
                    field.style.boxShadow = 'none';
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Bezig met verzenden...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual implementation)
                setTimeout(() => {
                    showNotification('Bedankt voor je bericht! Ik neem binnenkort contact met je op.', 'success');
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
                
            } else {
                showNotification('Vul alle vereiste velden correct in.', 'error');
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#dc2626';
                    this.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                } else {
                    this.style.borderColor = 'var(--color-medium)';
                    this.style.boxShadow = 'none';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(220, 38, 38)') {
                    this.style.borderColor = 'var(--color-medium)';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.timeline-item, .portfolio-card, .stat-card, .skill-item, .about-text, .contact-info, .hero-text'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    // Show notification function
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add to page
        const container = document.getElementById('notification-container') || document.body;
        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            hideNotification(notification);
        });
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                hideNotification(notification);
            }
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ==========================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================
    
    // Lazy loading for images (if any are added later)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // ==========================================
    // ACCESSIBILITY IMPROVEMENTS
    // ==========================================
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for portfolio filter
    filterBtns.forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ==========================================
    // INITIALIZE ON LOAD
    // ==========================================
    
    // Initial calls
    updateActiveNavLink();
    updateNavbarBackground();
    
    // Add loaded class to body after everything is initialized
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // ==========================================
    // CONSOLE WELCOME MESSAGE
    // ==========================================
    
    console.log(`
    🎨 Portfolio WPL - Mike David
    📧 Contact: contact@mikedavid.dev  
    💻 Built with: HTML5, CSS3, Vanilla JavaScript + React Background
    🎯 Purpose: Graduaat Digitale Vormgeving - Web
    🚀 Background: LiquidEther React Component
    
    Thanks for checking out the code! 
    `);
    
});

// ==========================================
// GLOBAL FUNCTIONS (available outside DOMContentLoaded)
// ==========================================

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Copy to clipboard function
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Gekopieerd naar klembord!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Gekopieerd naar klembord!', 'success');
        } catch (err) {
            showNotification('Kon niet kopiëren naar klembord.', 'error');
        }
        document.body.removeChild(textArea);
    }
}

// Download CV function (placeholder)
function downloadCV() {
    // Replace with actual CV download link
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV file path
    link.download = 'Mike_David_CV.pdf';
    link.click();
    
    if (typeof showNotification === 'function') {
        showNotification('CV download gestart...', 'success');
    }
}

// Theme toggle function (optional feature for future)
function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-theme');
}