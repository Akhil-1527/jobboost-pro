/**
 * Custom Animate On Scroll implementation
 * A lightweight JavaScript library for handling scroll animations
 */

(function() {
    // Define the AOS global object
    window.AOS = {
        // Default settings
        settings: {
            duration: 800,
            easing: 'ease',
            once: false,
            offset: 120
        },
        
        // Initializing function
        init: function(options) {
            // Override default settings with user options
            if (options) {
                Object.keys(options).forEach(key => {
                    this.settings[key] = options[key];
                });
            }
            
            // Get all elements with data-aos attribute
            this.elements = document.querySelectorAll('[data-aos]');
            
            // Initial check for elements in viewport
            this.checkElements();
            
            // Add scroll event listener
            window.addEventListener('scroll', this.throttle(this.checkElements.bind(this), 20));
            
            // Add resize event listener
            window.addEventListener('resize', this.throttle(this.checkElements.bind(this), 50));
            
            return this;
        },
        
        // Check if elements are in viewport
        checkElements: function() {
            this.elements.forEach(element => {
                if (this.isInViewport(element)) {
                    element.classList.add('aos-animate');
                } else if (!this.settings.once) {
                    element.classList.remove('aos-animate');
                }
            });
        },
        
        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= window.innerHeight - this.settings.offset &&
                rect.bottom >= 0 &&
                rect.left <= window.innerWidth &&
                rect.right >= 0
            );
        },
        
        // Throttle function to limit function calls
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
    // Auto-initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        AOS.init();
    });
})();