// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Start animations after loading
        initAnimations();
    }, 1500);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Smooth follower movement (slower)
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .info-card, .contact-item, .social-icon, .hamburger, .contact-social-btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// ============================================
// PARTICLE BACKGROUND
// ============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() * 60 + 220; // Blue-purple range
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active section highlight
    sections.forEach(section => {
        const top = section.offsetTop - 200;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Scroll progress
    const scrollProgress = document.getElementById('scrollProgress');
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
const typewriterElement = document.getElementById('typewriter');
const words = [
    'Video Editor',
    'Web Developer',
    'AI Enthusiast',
    'Creative Professional',
    'CapCut Expert',
    'MS Office Pro'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// ============================================
// 3D PROFILE CARD TILT
// ============================================
const profileCard = document.getElementById('profileCard3D');

if (profileCard) {
    document.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;

        profileCard.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initAnimations() {
    // Add reveal classes to elements
    const revealElements = [
        { selector: '.section-header', class: 'reveal' },
        { selector: '.info-card', class: 'reveal' },
        { selector: '.skill-card', class: 'reveal' },
        { selector: '.about-image-side', class: 'reveal-left' },
        { selector: '.about-info-side', class: 'reveal-right' },
        { selector: '.about-description', class: 'reveal' },
        { selector: '.about-btn', class: 'reveal' },
        { selector: '.contact-info-side', class: 'reveal-left' },
        { selector: '.contact-form-side', class: 'reveal-right' },
        { selector: '.skills-overview', class: 'reveal' },
        { selector: '.circular-chart-item', class: 'reveal-scale' }
    ];

    revealElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach((el, index) => {
            el.classList.add(item.class);
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Start observing
    observeElements();
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill progress bars
                if (entry.target.classList.contains('skill-card')) {
                    const progressFill = entry.target.querySelector('.skill-progress-fill');
                    if (progressFill) {
                        const width = progressFill.getAttribute('data-width');
                        setTimeout(() => {
                            progressFill.style.width = width + '%';
                        }, 300);
                    }
                }

                // Animate circular charts
                if (entry.target.classList.contains('circular-chart-item')) {
                    animateCircularChart(entry.target);
                }

                // Animate counters
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 30);
}

// ============================================
// CIRCULAR CHART ANIMATION
// ============================================
function animateCircularChart(chartItem) {
    const circleProgress = chartItem.querySelector('.circle-progress');
    const circleFill = chartItem.querySelector('.circle-fill');
    const percentage = parseInt(circleProgress.getAttribute('data-percentage'));
    const color = circleProgress.getAttribute('data-color');

    const circumference = 2 * Math.PI * 54; // radius = 54
    const offset = circumference - (percentage / 100) * circumference;

    circleFill.style.stroke = color;
    circleFill.style.filter = `drop-shadow(0 0 6px ${color})`;

    setTimeout(() => {
        circleFill.style.strokeDashoffset = offset;
    }, 300);
}

// ============================================
// 3D TILT EFFECT FOR CARDS
// ============================================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Success animation
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00c853, #69f0ae)';

        // Show success message
        showNotification('Message sent successfully! 🎉', 'success');

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    }, 1500);
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 16px 28px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00c853, #69f0ae)' : 'linear-gradient(135deg, #ff5252, #ff867f)'};
        color: white;
        border-radius: 14px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 99999;
        transform: translateX(120%);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const homeVisual = document.querySelector('.home-visual');
    const homeContent = document.querySelector('.home-content');

    if (homeVisual && scrollY < window.innerHeight) {
        homeVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
        homeContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
});

// ============================================
// START TYPEWRITER ON LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 2000);
});

// ============================================
// INTERACTIVE MOUSE PARALLAX ON HOME
// ============================================
document.addEventListener('mousemove', (e) => {
    const badges = document.querySelectorAll('.floating-badges .badge');
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;

    badges.forEach((badge, index) => {
        const speed = (index + 1) * 0.5;
        badge.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// ============================================
// IMAGE LAZY LOADING FALLBACK
// ============================================
const profileImg = document.getElementById('profileImage');
if (profileImg) {
    profileImg.addEventListener('error', function () {
        // Create a gradient placeholder if image fails
        this.style.display = 'none';
        this.parentElement.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        this.parentElement.innerHTML += `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 4rem;
                font-weight: 800;
                color: white;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">MJ</div>
        `;
    });
}

console.log('%c Welcome to Mitesh Jogale\'s Portfolio! ', 
    'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 16px; padding: 12px 24px; border-radius: 8px; font-weight: bold;');