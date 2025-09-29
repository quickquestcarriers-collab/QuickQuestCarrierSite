// Quick Quest Carriers Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Star rating system
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    let selectedRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });

        star.addEventListener('mouseout', function() {
            if (selectedRating === 0) {
                resetStars();
            } else {
                highlightStars(selectedRating);
            }
        });

        star.addEventListener('click', function() {
            selectedRating = index + 1;
            ratingInput.value = selectedRating;
            highlightStars(selectedRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.textContent = '★';
                star.classList.add('active');
            } else {
                star.textContent = '☆';
                star.classList.remove('active');
            }
        });
    }

    function resetStars() {
        stars.forEach(star => {
            star.textContent = '☆';
            star.classList.remove('active');
        });
    }

    // Form validation and submission
    const feedbackForm = document.getElementById('feedback-form');
    const successMessage = document.getElementById('success-message');

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            rating: document.getElementById('rating').value,
            review: document.getElementById('review').value.trim()
        };

        // Validate required fields
        const errors = [];

        if (!formData.name) {
            errors.push('नाव आवश्यक आहे / Name is required');
        }

        if (!formData.rating) {
            errors.push('कृपया रेटिंग द्या / Please provide a rating');
        }

        if (!formData.review) {
            errors.push('कृपया आपला अनुभव लिहा / Please write your experience');
        }

        // Email validation if provided
        if (formData.email && !isValidEmail(formData.email)) {
            errors.push('कृपया वैध ईमेल पत्ता द्या / Please provide a valid email address');
        }

        // Phone validation if provided
        if (formData.phone && !isValidPhone(formData.phone)) {
            errors.push('कृपया वैध फोन नंबर द्या / Please provide a valid phone number');
        }

        if (errors.length > 0) {
            showErrorMessages(errors);
            return;
        }

        // Simulate form submission
        submitFeedback(formData);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone);
    }

    function showErrorMessages(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        // Create and show new error messages
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        errorContainer.style.cssText = `
            background-color: rgba(var(--color-error-rgb), 0.1);
            border: 1px solid rgba(var(--color-error-rgb), 0.2);
            color: var(--color-error);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
        `;

        const errorList = document.createElement('ul');
        errorList.style.cssText = 'margin: 0; padding-left: var(--space-16);';
        
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });

        errorContainer.appendChild(errorList);
        feedbackForm.insertBefore(errorContainer, feedbackForm.firstChild);

        // Scroll to error message
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function submitFeedback(formData) {
        // Show loading state
        const submitButton = feedbackForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'सबमिट करत आहे... / Submitting...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Hide form and show success message
            feedbackForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add the new review to the reviews section (demo)
            addNewReview(formData);

            // Reset form after delay
            setTimeout(() => {
                resetForm();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);

        }, 1500);
    }

    function addNewReview(formData) {
        const reviewsGrid = document.querySelector('.reviews-grid');
        
        // Create new review card
        const newReview = document.createElement('div');
        newReview.className = 'review-card';
        newReview.style.cssText = `
            opacity: 0;
            transform: translateY(20px);
            transition: all var(--duration-normal) var(--ease-standard);
        `;

        const stars = '★'.repeat(parseInt(formData.rating)) + '☆'.repeat(5 - parseInt(formData.rating));
        const currentDate = new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        newReview.innerHTML = `
            <div class="review-rating">
                <span class="stars">${stars}</span>
                <span class="rating-number">${formData.rating}.0</span>
            </div>
            <p class="review-text">"${formData.review}"</p>
            <div class="review-author">
                <strong>${formData.name}</strong>
                <span>${currentDate}</span>
            </div>
        `;

        // Add new review at the beginning
        reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);

        // Animate in
        setTimeout(() => {
            newReview.style.opacity = '1';
            newReview.style.transform = 'translateY(0)';
        }, 100);
    }

    function resetForm() {
        setTimeout(() => {
            feedbackForm.style.display = 'block';
            successMessage.classList.add('hidden');
            feedbackForm.reset();
            selectedRating = 0;
            resetStars();
            ratingInput.value = '';
            
            // Remove error messages
            const existingErrors = document.querySelectorAll('.error-message');
            existingErrors.forEach(error => error.remove());
        }, 2000);
    }

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 50) {
            header.style.background = 'rgba(252, 252, 249, 0.98)';
        } else {
            header.style.background = 'rgba(252, 252, 249, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .review-card, .stat-item, .contact-item'
    );

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });

    // Add staggered animation delay
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });

    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 150}ms`;
    });

    // Contact button interactions
    const contactButtons = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                document.body.removeChild(ripple);
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Form field focus effects
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        control.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.dataset.lazy;
                    element.classList.remove('lazy');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize tooltips for better UX
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }

    function showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.dataset.tooltip;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--color-slate-900);
            color: var(--color-white);
            padding: var(--space-8) var(--space-12);
            border-radius: var(--radius-base);
            font-size: var(--font-size-sm);
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        e.target._tooltip = tooltip;
    }

    function hideTooltip(e) {
        if (e.target._tooltip) {
            document.body.removeChild(e.target._tooltip);
            delete e.target._tooltip;
        }
    }

    initTooltips();
    
    console.log('Quick Quest Carriers website loaded successfully!');
});