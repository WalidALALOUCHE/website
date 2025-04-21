// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStatisticsCounter();
    initTeamHover();
    initTestimonialSlider();
    initFadeInElements();
});

// Animate statistics counter on scroll
function initStatisticsCounter() {
    const statisticNumbers = document.querySelectorAll('.stat-number');
    
    if (statisticNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-value'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = Math.floor(duration / 30); // 30 steps
                    const step = target / 30;
                    
                    const counter = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            entry.target.textContent = target;
                            clearInterval(counter);
                        } else {
                            entry.target.textContent = Math.floor(count);
                        }
                    }, interval);
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statisticNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
}

// Team member hover effects
function initTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            const image = this.querySelector('.member-image');
            if (image) {
                image.style.borderColor = 'var(--primary-color)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            const image = this.querySelector('.member-image');
            if (image) {
                image.style.borderColor = 'var(--white)';
            }
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800
        });
    }
}

// Animate elements on scroll
function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize partner logo hover effects
document.querySelectorAll('.partner-logo').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStatisticsCounter();
    initTeamHover();
    initTestimonialSlider();
    initFadeInElements();
});

// Animate statistics counter on scroll
function initStatisticsCounter() {
    const statisticNumbers = document.querySelectorAll('.stat-number');
    
    if (statisticNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-value'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = Math.floor(duration / 30); // 30 steps
                    const step = target / 30;
                    
                    const counter = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            entry.target.textContent = target;
                            clearInterval(counter);
                        } else {
                            entry.target.textContent = Math.floor(count);
                        }
                    }, interval);
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statisticNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
}

// Team member hover effects
function initTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            const image = this.querySelector('.member-image');
            if (image) {
                image.style.borderColor = 'var(--primary-color)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            const image = this.querySelector('.member-image');
            if (image) {
                image.style.borderColor = 'var(--white)';
            }
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800
        });
    }
}

// Animate elements on scroll
function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize partner logo hover effects
document.querySelectorAll('.partner-logo').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}); 