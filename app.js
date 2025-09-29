class QuickQuestCarriersApp {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupScrollSpy();
        this.setupAnimationsOnScroll();
        this.setupContactInteractions();
        this.setupCallToActionButtons();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        this.mobileMenuBtn?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !this.nav?.contains(e.target) && 
                !this.mobileMenuBtn?.contains(e.target) &&
                this.nav?.classList.contains('nav-open')) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
        
        // Scroll event for navbar styling
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    toggleMobileMenu() {
        if (!this.nav) return;
        
        this.nav.classList.toggle('nav-open');
        this.mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate hamburger menu
        const spans = this.mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    }
    
    closeMobileMenu() {
        if (!this.nav) return;
        
        this.nav.classList.remove('nav-open');
        this.mobileMenuBtn?.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Reset hamburger menu animation
        const spans = this.mobileMenuBtn?.querySelectorAll('span');
        spans?.forEach(span => span.classList.remove('active'));
    }
    
    setupSmoothScrolling() {
        // Handle all anchor links for smooth scrolling
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }
    
    setupScrollSpy() {
        const options = {
            root: null,
            rootMargin: '-50px 0px -50px 0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveNavLink(sectionId);
                }
            });
        }, options);
        
        this.sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });
    }
    
    updateActiveNavLink(activeSectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    handleScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }
    
    setupAnimationsOnScroll() {
        const animationOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, animationOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.service-card, .testimonial-card, .contact-item, .pricing-card, .charge-item, .feature, .stat'
        );
        
        animateElements.forEach(element => {
            element.classList.add('animate-element');
            animationObserver.observe(element);
        });
    }
    
    setupContactInteractions() {
        // Add click tracking for contact methods
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackContactMethod('email');
            });
        });
        
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackContactMethod('phone');
            });
        });
        
        // Add hover effects for interactive elements
        this.setupHoverEffects();
    }
    
    setupCallToActionButtons() {
        // Setup all CTA buttons to work properly
        const ctaButtons = document.querySelectorAll('.btn');
        
        ctaButtons.forEach(button => {
            const href = button.getAttribute('href');
            const text = button.textContent.trim();
            
            // Skip if already has proper href
            if (href && href.startsWith('#')) return;
            if (href && (href.startsWith('mailto:') || href.startsWith('tel:'))) return;
            
            // Handle different button types
            if (text.includes('संपर्क') || text.includes('Contact') || text.includes('कॉल') || text.includes('Call')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToContact();
                });
            } else if (text.includes('सेवा') || text.includes('Service')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToServices();
                });
            } else if (text.includes('ईमेल') || text.includes('Email')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openEmailContact();
                });
            }
        });
        
        // Handle specific buttons that might not be caught above
        this.setupSpecificButtonHandlers();
    }
    
    setupSpecificButtonHandlers() {
        // Handle hero section buttons specifically
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(button => {
            const text = button.textContent.trim();
            if (text.includes('संपर्क') || text.includes('Contact')) {
                button.href = '#contact';
            } else if (text.includes('सेवा') || text.includes('Service')) {
                button.href = '#services';
            }
        });
        
        // Handle CTA card buttons
        const ctaCardButtons = document.querySelectorAll('.cta-buttons .btn');
        ctaCardButtons.forEach(button => {
            const text = button.textContent.trim();
            if (text.includes('ईमेल') || text.includes('Email')) {
                const emailSubject = ContactUtils.generateEmailSubject();
                const emailBody = ContactUtils.generateEmailBody();
                button.href = `mailto:quickquestcarriers@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            } else if (text.includes('कॉल') || text.includes('Call')) {
                button.href = 'tel:+918329339619';
            }
        });
        
        // Handle pricing section buttons
        const pricingButtons = document.querySelectorAll('.pricing-card .btn');
        pricingButtons.forEach(button => {
            if (!button.href || button.href.endsWith('#')) {
                button.href = '#contact';
            }
        });
    }
    
    navigateToContact() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        this.showNotification('संपर्क विभागात नेले गेले / Navigated to Contact section');
    }
    
    navigateToServices() {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = servicesSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        this.showNotification('सेवा विभागात नेले गेले / Navigated to Services section');
    }
    
    openEmailContact() {
        const emailSubject = ContactUtils.generateEmailSubject();
        const emailBody = ContactUtils.generateEmailBody();
        const emailLink = `mailto:quickquestcarriers@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        
        window.open(emailLink, '_self');
        this.trackContactMethod('email');
    }
    
    trackContactMethod(method) {
        // Simple analytics tracking (can be expanded)
        console.log(`Contact method used: ${method}`);
        
        // Show a subtle confirmation
        this.showNotification(`संपर्क माहिती उघडली गेली / Contact information opened`);
    }
    
    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transform: translateY(100px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    setupHoverEffects() {
        // Add interactive hover effects for cards
        const cards = document.querySelectorAll(
            '.service-card, .testimonial-card, .contact-item, .pricing-card, .charge-item'
        );
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click effect for buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }
    
    createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Utility functions
class ContactUtils {
    static formatPhoneNumber(phone) {
        // Format phone number for display
        return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+91 $1$2 $3');
    }
    
    static generateWhatsAppLink(phone, message) {
        const cleanPhone = phone.replace(/\D/g, '');
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    }
    
    static generateEmailSubject() {
        return encodeURIComponent('Quick Quest Carriers - Transport Service Inquiry');
    }
    
    static generateEmailBody() {
        return encodeURIComponent(`नमस्कार / Hello,

मला तुमच्या वाहतूक सेवेविषयी माहिती हवी आहे.
I would like to know more about your transport services.

Service needed / आवश्यक सेवा:
- [ ] 8-foot enclosed vehicle rental
- [ ] Professional driver service
- [ ] Daily package
- [ ] Monthly package

Route / मार्ग: 
Duration / कालावधी:
Special requirements / विशेष गरजा:

कृपया संपर्क साधा / Please contact me.

धन्यवाद / Thank you`);
    }
}

// Enhanced features
class BusinessFeatures {
    constructor() {
        this.setupQuickActions();
        this.setupBusinessHours();
        this.setupServiceHighlights();
    }
    
    setupQuickActions() {
        // Add WhatsApp quick action with updated phone number
        const phone = '+918329339619'; // Updated phone number
        const whatsappMessage = `नमस्कार! मला Quick Quest Carriers च्या सेवेविषयी माहिती हवी आहे. / Hello! I would like to know about Quick Quest Carriers services.`;
        
        const whatsappLink = ContactUtils.generateWhatsAppLink(phone, whatsappMessage);
        
        // Create WhatsApp floating button
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = whatsappLink;
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.className = 'whatsapp-float';
        whatsappBtn.innerHTML = '💬';
        whatsappBtn.title = 'WhatsApp वर संपर्क साधा';
        
        whatsappBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            transition: all 0.3s ease;
            text-decoration: none;
        `;
        
        document.body.appendChild(whatsappBtn);
        
        // Hover effects for WhatsApp button
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.transform = 'scale(1.1)';
            whatsappBtn.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.transform = 'scale(1)';
            whatsappBtn.style.boxShadow = 'var(--shadow-lg)';
        });
    }
    
    setupBusinessHours() {
        const now = new Date();
        const currentHour = now.getHours();
        const isOpen = currentHour >= 6 && currentHour < 24;
        
        // Update business status
        const statusElements = document.querySelectorAll('.business-status');
        statusElements.forEach(element => {
            element.textContent = isOpen ? '✅ सध्या उपलब्ध / Currently Available' : '🔴 बंद / Closed';
            element.className = `business-status ${isOpen ? 'open' : 'closed'}`;
        });
        
        // Add status to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection && !document.querySelector('.business-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.className = `business-status ${isOpen ? 'open' : 'closed'}`;
            statusDiv.textContent = isOpen ? '✅ सध्या उपलब्ध / Currently Available' : '🔴 बंद / Closed';
            statusDiv.style.cssText = `
                text-align: center;
                padding: 12px;
                margin-bottom: 20px;
                border-radius: 8px;
                font-weight: 500;
                background: ${isOpen ? 'var(--color-bg-3)' : 'var(--color-bg-4)'};
                color: ${isOpen ? 'var(--color-success)' : 'var(--color-error)'};
            `;
            
            const container = contactSection.querySelector('.container');
            const sectionHeader = container.querySelector('.section-header');
            container.insertBefore(statusDiv, sectionHeader.nextSibling);
        }
    }
    
    setupServiceHighlights() {
        // Add dynamic service highlights
        const highlights = [
            'व्यावसायिक चालक सेवा / Professional Driver Service',
            '24/7 उपलब्धता / 24/7 Availability', 
            'सुरक्षित वाहतूक / Safe Transportation',
            'स्वच्छ किंमत / Transparent Pricing'
        ];
        
        let currentHighlight = 0;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const highlightElement = document.createElement('div');
            highlightElement.className = 'service-highlight';
            highlightElement.style.cssText = `
                text-align: center;
                padding: 8px 16px;
                background: var(--color-primary);
                color: var(--color-btn-primary-text);
                font-size: 14px;
                font-weight: 500;
                animation: fadeInOut 4s infinite;
                position: relative;
                overflow: hidden;
            `;
            
            const updateHighlight = () => {
                highlightElement.textContent = highlights[currentHighlight];
                currentHighlight = (currentHighlight + 1) % highlights.length;
            };
            
            updateHighlight();
            setInterval(updateHighlight, 4000);
            
            heroSection.insertBefore(highlightElement, heroSection.firstChild);
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    window.quickQuestApp = new QuickQuestCarriersApp();
    
    // Initialize business features
    window.businessFeatures = new BusinessFeatures();
    
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        
        .header.scrolled {
            background: rgba(var(--color-surface), 0.95);
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-md);
        }
        
        .nav-open {
            display: block !important;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 0 0 12px 12px;
            box-shadow: var(--shadow-lg);
            padding: 20px;
            z-index: 999;
        }
        
        .nav-open .nav-list {
            flex-direction: column;
            gap: 16px;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            .nav {
                display: none;
            }
            
            .hero-text h1 {
                font-size: 28px;
            }
            
            .hero-text h2 {
                font-size: 18px;
            }
            
            .whatsapp-float {
                bottom: 20px !important;
                right: 15px !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 20px !important;
            }
        }
        
        .business-status.open {
            color: var(--color-success) !important;
        }
        
        .business-status.closed {
            color: var(--color-error) !important;
        }
    `;
    
    document.head.appendChild(animationStyles);
    
    console.log(`
🚛 Quick Quest Carriers Website Loaded Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Features Active:
• Mobile-responsive navigation
• Smooth scrolling with ALL buttons functional
• Active section highlighting  
• Contact interactions
• WhatsApp integration (+91 83293 39619)
• Business hours status
• Scroll animations
• Button ripple effects
• Fixed CTA button functionality

📱 Mobile-friendly interface
🎯 Professional design
⚡ Fast performance
🛡️ Secure contact methods
📞 Updated Phone: +91 83293 39619

Ready to serve transport needs in Pune-Mumbai region!
    `);
});

// Export utilities for external access
window.ContactUtils = ContactUtils;
window.BusinessFeatures = BusinessFeatures;