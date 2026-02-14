// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const html = document.documentElement;
const body = document.body;

// Load theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
} else {
    body.classList.remove('dark-mode');
    updateThemeIcon(false);
}

function updateThemeIcon(isDark) {
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    const text = isDark ? 'Light Mode' : 'Dark Mode';
    
    if (themeToggle) {
        themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        themeToggle.title = text;
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.innerHTML = `<i class="fas ${icon} mr-2"></i>${text}`;
    }
}

function toggleTheme() {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

themeToggle?.addEventListener('click', toggleTheme);
mobileThemeToggle?.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavMenu = document.getElementById('mobileNavMenu');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileNavMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileNavMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavMenu.classList.add('hidden');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-xl');
    } else {
        nav.classList.remove('shadow-xl');
    }
});

// Photo Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselIndicators = document.getElementById('carouselIndicators');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;

// Create indicators
carouselItems.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-300', 'transition');
    if (index === 0) {
        indicator.classList.add('bg-purple-600', 'w-8');
    }
    indicator.addEventListener('click', () => goToSlide(index));
    carouselIndicators.appendChild(indicator);
});

const indicators = document.querySelectorAll('#carouselIndicators button');

function showSlide(n) {
    carouselItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => {
        indicator.classList.remove('bg-purple-600', 'w-8');
        indicator.classList.add('bg-gray-300');
    });
    
    carouselItems[n].classList.add('active');
    indicators[n].classList.add('bg-purple-600', 'w-8');
    indicators[n].classList.remove('bg-gray-300');
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.children[0].value;
    const email = contactForm.children[1].value;
    const subject = contactForm.children[2].value;
    const message = contactForm.children[3].value;
    
    // Simple validation
    if (name && email && subject && message) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.classList.add('fixed', 'top-20', 'right-5', 'bg-green-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg', 'z-50');
        successMsg.textContent = '✓ Message sent successfully! We will contact you soon.';
        document.body.appendChild(successMsg);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log({
            name,
            email,
            subject,
            message
        });
    }
});

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to elements on scroll
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

// Observe all section elements
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Certificate course click handler
document.querySelectorAll('[id^="certificates"] .bg-gradient-to-br').forEach(cert => {
    cert.addEventListener('click', function() {
        const courseTitle = this.querySelector('h3').textContent;
        showCourseModal(courseTitle);
    });
});

function showCourseModal(courseName) {
    const modal = document.createElement('div');
    modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50');
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${courseName}</h2>
                <button class="text-gray-600 hover:text-gray-800 text-2xl" onclick="this.closest('.fixed').remove()">
                    ×
                </button>
            </div>
            <p class="text-gray-600 mb-6">
                This is a comprehensive certificate program designed to provide industry-ready skills and hands-on experience.
            </p>
            <div class="mb-6 space-y-3">
                <div><strong>Duration:</strong> Variable (4-10 weeks)</div>
                <div><strong>Level:</strong> Beginner to Advanced</div>
                <div><strong>Certification:</strong> Recognized certificate upon completion</div>
                <div><strong>Fee:</strong> Contact department for pricing</div>
            </div>
            <button class="w-full gradient-bg text-white py-2 rounded-lg font-bold hover:shadow-lg transition mb-2">
                Enroll Now
            </button>
            <button class="w-full border-2 border-purple-600 text-purple-600 py-2 rounded-lg font-bold hover:bg-purple-50 transition" onclick="this.closest('.fixed').remove()">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add to cart / Enroll functionality for certificate courses
document.querySelectorAll('.gradient-bg:not(nav)').forEach(card => {
    card.style.cursor = 'pointer';
});

// Statistics counter animation
const statsSection = document.querySelector('[class*="gradient-bg"]:has(h3:first-child:contains("500+"))');

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease-in';
    });
});

console.log('Website script loaded successfully!');
