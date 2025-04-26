/**
 * JobBoost Pro - Main JavaScript File
 * 
 * This file contains all the interactive functionality of the JobBoost Pro website
 * Includes mobile menu toggle, smooth scrolling, form validation, testimonial slider
 * and scroll animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.navbar__links');
    const navbar = document.querySelector('.navbar');
    const testimonialDots = document.querySelectorAll('.testimonials__dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonials__nav-btn--prev');
    const nextButton = document.querySelector('.testimonials__nav-btn--next');
    const contactForm = document.querySelector('#contactForm');
    
    // Initialize current slide index
    let currentSlide = 0;
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Transform hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Add active class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.click();
            }
            
            const targetId = this.getAttribute('href');
            
            // Skip for empty or just "#" links
            if (targetId === '#' || targetId === '#placeholder') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate navbar height for offset
                const navbarHeight = navbar.offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial slider functionality
    function showSlide(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('testimonials__dot--active');
        });
        
        // Show current testimonial and add active class to current dot
        testimonialCards[index].style.display = 'block';
        testimonialDots[index].classList.add('testimonials__dot--active');
        
        // Update current slide
        currentSlide = index;
    }
    
    // Initialize slider
    if (testimonialCards.length > 0) {
        showSlide(0);
        
        // Add click event to dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Add click events to prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) {
                    newIndex = testimonialCards.length - 1;
                }
                showSlide(newIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                let newIndex = currentSlide + 1;
                if (newIndex >= testimonialCards.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            });
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }, 5000);
    }
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const workAuthField = document.getElementById('workAuth');
            const challengeField = document.getElementById('challenge');
            
            // Basic validation
            let valid = true;
            
            if (!nameField.value.trim()) {
                valid = false;
                nameField.style.borderColor = 'var(--error)';
            } else {
                nameField.style.borderColor = 'var(--border-medium)';
            }
            
            if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
                valid = false;
                emailField.style.borderColor = 'var(--error)';
            } else {
                emailField.style.borderColor = 'var(--border-medium)';
            }
            
            if (workAuthField.value === '') {
                valid = false;
                workAuthField.style.borderColor = 'var(--error)';
            } else {
                workAuthField.style.borderColor = 'var(--border-medium)';
            }
            
            if (!challengeField.value.trim()) {
                valid = false;
                challengeField.style.borderColor = 'var(--error)';
            } else {
                challengeField.style.borderColor = 'var(--border-medium)';
            }
            
            // If form is not valid, prevent submission
            if (!valid) {
                e.preventDefault();
                
                // Show error message
                const formError = document.createElement('div');
                formError.className = 'form-error';
                formError.innerHTML = 'Please fill out all required fields correctly.';
                
                // Remove any existing error messages
                const existingError = contactForm.querySelector('.form-error');
                if (existingError) {
                    existingError.remove();
                }
                
                // Add error message to form
                contactForm.insertBefore(formError, contactForm.firstChild);
                
                return;
            }
            
            // Formspree.io handles the actual submission
            // This is just for user feedback
            const formButton = contactForm.querySelector('button[type="submit"]');
            formButton.innerHTML = 'Sending...';
            formButton.disabled = true;
            
            // Success message can be added when Formspree redirects back or
            // when using AJAX with Formspree's JSON API
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Add navbar active class for current section
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar__links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
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
}); 