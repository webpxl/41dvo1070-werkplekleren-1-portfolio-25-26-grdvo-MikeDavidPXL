// ========== SCROLL SPY FUNCTIONALITEIT ==========
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a'); // Correcte selector

// Scroll Spy - Detecteert welke sectie in beeld is
function scrollSpy() {
    let current = '';
    const scrollY = window.pageYOffset;
    
    // Debug info (tijdelijk - je kunt dit later verwijderen)
    console.log('Scroll position:', scrollY);
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // 120px offset voor header
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        console.log(`Section ${sectionId}: top=${sectionTop}, height=${sectionHeight}, scrollY=${scrollY}`);
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
            console.log('Current section:', current);
        }
    });

    // Als we helemaal bovenaan zijn, maak home actief
    if (scrollY < 100) {
        current = 'home';
    }

    console.log('Final current section:', current);

    // Update actieve link in navigatie
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (current && linkHref === '#' + current) {
            link.classList.add('active');
            console.log('Activated link:', linkHref);
        }
    });
}

// Smooth scroll bij klik op navigatie links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        console.log('Clicked link:', targetId, 'Target section:', targetSection);
        
        if (targetSection) {
            // Update actieve class direct (voor betere responsiviteit)
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll naar sectie met offset voor header
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Sluit mobile menu als het open is
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        }
    });
});

// Throttle functie voor betere performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Event listeners
window.addEventListener('scroll', throttle(scrollSpy, 50)); // Throttle scroll events (verhoogd naar 50ms)
window.addEventListener('load', () => {
    console.log('Page loaded, running scrollSpy');
    scrollSpy();
});
window.addEventListener('resize', throttle(scrollSpy, 100)); // Update bij resize

// Debug: Check of alle elementen gevonden zijn
console.log('Sections found:', sections.length);
console.log('Nav links found:', navLinks.length);
navLinks.forEach((link, index) => {
    console.log(`Link ${index}:`, link.getAttribute('href'));
});

// Mobile menu toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Sluit mobile menu bij klik buiten de navigatie
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

// ========== PROGRESS BAR ANIMATIE (optioneel - voor skills sectie) ==========
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-line span2');
    
    progressBars.forEach(bar => {
        const parent = bar.parentElement;
        if (parent.classList.contains('html')) {
            bar.style.width = '85%';
        } else if (parent.classList.contains('css')) {
            bar.style.width = '75%';
        } else if (parent.classList.contains('javascript')) {
            bar.style.width = '60%';
        } else if (parent.classList.contains('python')) {
            bar.style.width = '70%';
        }
    });
}

// Intersection Observer voor animaties wanneer secties in beeld komen
const observerOptions = {
    threshold: 0.3, // Trigger wanneer 30% van sectie zichtbaar is
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            
            // Animeer skills bars wanneer skills sectie in beeld komt
            if (section.id === 'skills') {
                setTimeout(animateProgressBars, 300);
            }
            
            // Voeg fade-in animatie toe
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observeer alle secties voor animaties
sections.forEach(section => {
    // Initiële stijlen voor fade-in effect
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(section);
});

// Reset animaties voor home sectie (moet direct zichtbaar zijn)
const homeSection = document.querySelector('#home');
if (homeSection) {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}

// ========== SKILLS ANIMATIE - TRIGGER BIJ VIEWPORT ==========
const skillsSection = document.querySelector('#skills');

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skills-animate');
                skillsObserver.unobserve(entry.target); // Eenmalig
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });

    skillsObserver.observe(skillsSection);
}


// ========== TYPEWRITER (woorden typen, wissen, dan pas wisselen) ==========
(function () {
    const target = document.querySelector('.text-animation .typed');
    if (!target) return;

    const words = [
        'Web Designer.',
        'Graphic Designer.',
        'Motorliefhebber.',
        'Autoliefhebber.',
        'Fitnesser.'
    ];

    const typeSpeed = 70;      // ms per letter
    const deleteSpeed = 45;    // ms per letter
    const holdAfterType = 900; // pauze na volledig woord
    const holdAfterDelete = 250; // pauze als woord leeg is

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const word = words[wordIndex];

        if (!deleting) {
            // typen
            charIndex++;
            target.textContent = word.slice(0, charIndex);

            if (charIndex === word.length) {
                // volledig woord, even wachten, dan wissen
                deleting = true;
                return setTimeout(tick, holdAfterType);
            }

            return setTimeout(tick, typeSpeed);
        } else {
            // wissen
            charIndex--;
            target.textContent = word.slice(0, Math.max(0, charIndex));

            if (charIndex <= 0) {
                // leeg, NU pas wisselen, onzichtbaar
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                return setTimeout(tick, holdAfterDelete);
            }

            return setTimeout(tick, deleteSpeed);
        }
    }

    // start leeg
    target.textContent = '';
    tick();
})();


