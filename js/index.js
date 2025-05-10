/**
 * Luxury Haven Hotel - Main JavaScript File
 * Created: May 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const newsletterForm = document.getElementById('newsletterForm');
    const contactForm = document.getElementById('contactForm');
    const faqItems = document.querySelectorAll('.faq-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevRoomBtn = document.getElementById('prevRoom');
    const nextRoomBtn = document.getElementById('nextRoom');
    const typeFilter = document.getElementById('typeFilter');
    const viewFilter = document.getElementById('viewFilter');
    const priceFilter = document.getElementById('priceFilter');
    const applyFilterBtn = document.getElementById('applyFilter');
    const resetFilterBtn = document.getElementById('resetFilter');
    const roomsGrid = document.getElementById('roomsGrid');
    
    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Mobile Navigation
    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    // Modal functionality
    function openModal() {
        bookingModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        bookingModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Set minimum dates for booking form
    function setMinDates() {
        if (document.getElementById('checkIn') && document.getElementById('checkOut')) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            
            document.getElementById('checkIn').min = formatDate(today);
            document.getElementById('checkOut').min = formatDate(tomorrow);
            
            // Set default values
            document.getElementById('checkIn').value = formatDate(today);
            document.getElementById('checkOut').value = formatDate(tomorrow);
        }
    }
    
    // Newsletter form submission
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const emailInput = document.getElementById('emailInput');
        const messageElement = document.getElementById('newsletterMessage');
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            messageElement.textContent = 'Please enter a valid email address.';
            messageElement.style.color = '#e74c3c';
            return;
        }
        
        // Simulate form submission
        messageElement.textContent = 'Thank you for subscribing to our newsletter!';
        messageElement.style.color = '#27ae60';
        emailInput.value = '';
        
        // Reset message after 3 seconds
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
    
    // Contact form validation
    function validateContactForm(e) {
        e.preventDefault();
        let isValid = true;
        
        if (!contactForm) return;
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Error messages
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        const formStatus = document.getElementById('formStatus');
        
        // Reset errors
        [nameError, emailError, phoneError, subjectError, messageError].forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        // Validate name (at least 2 characters)
        if (name.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            nameError.classList.add('show');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.add('show');
            isValid = false;
        }
        
        // Validate phone (optional but if provided, must be valid)
        if (phone.value && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.classList.add('show');
            isValid = false;
        }
        
        // Validate subject (at least 3 characters)
        if (subject.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters long';
            subjectError.classList.add('show');
            isValid = false;
        }
        
        // Validate message (at least 10 characters)
        if (message.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long';
            messageError.classList.add('show');
            isValid = false;
        }
        
        // If all validations pass, submit the form
        if (isValid) {
            // Simulate form submission
            formStatus.textContent = 'Your message has been sent successfully! We will get back to you soon.';
            formStatus.className = 'form-status success';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        } else {
            formStatus.textContent = 'Please fix the errors in the form';
            formStatus.className = 'form-status error';
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 3000);
        }
    }
    
    // Room booking form validation
    function validateBookingForm(e) {
        e.preventDefault();
        
        const bookingForm = document.getElementById('bookingForm');
        if (!bookingForm) return;
        
        // Get form fields
        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');
        const adults = document.getElementById('adults');
        const roomType = document.getElementById('roomType');
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        
        // Simple validation
        if (!checkIn.value || !checkOut.value || !adults.value || !roomType.value || !fullName.value || !email.value || !phone.value) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Check if check-out date is after check-in date
        const checkInDate = new Date(checkIn.value);
        const checkOutDate = new Date(checkOut.value);
        
        if (checkOutDate <= checkInDate) {
            alert('Check-out date must be after check-in date');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // If all validations pass, simulate form submission
        alert('Thank you for your booking! A confirmation email has been sent to your inbox.');
        bookingForm.reset();
        closeModalFunc();
        
        // Set default dates again
        setMinDates();
    }
    
    // FAQ accordion functionality
    function toggleFAQ() {
        const item = this;
        
        // Close all other items
        faqItems.forEach(faqItem => {
            if (faqItem !== item && faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    }
    
    // Testimonial slider
    function changeTestimonial() {
        const index = parseInt(this.getAttribute('data-index'));
        
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current testimonial and dot
        testimonials[index].classList.add('active');
        this.classList.add('active');
    }
    
    // Auto rotate testimonials
    let testimonialIndex = 0;
    function autoRotateTestimonials() {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current testimonial and dot
        testimonials[testimonialIndex].classList.add('active');
        dots[testimonialIndex].classList.add('active');
    }
    
    // Start auto rotation
    let testimonialInterval;
    function startTestimonialRotation() {
        testimonialInterval = setInterval(autoRotateTestimonials, 5000);
    }
    
    // Stop auto rotation when user interacts with dots
    function stopTestimonialRotation() {
        clearInterval(testimonialInterval);
    }
    
    // Room carousel functionality
    let currentRoom = 0;
    const roomCards = document.querySelectorAll('.room-card');
    
    function showRoom(index) {
        if (!roomCards.length) return;
        
        // Hide all rooms
        roomCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show current room
        roomCards[index].style.display = 'grid';
    }
    
    function nextRoom() {
        if (!roomCards.length) return;
        
        currentRoom = (currentRoom + 1) % roomCards.length;
        showRoom(currentRoom);
    }
    
    function prevRoom() {
        if (!roomCards.length) return;
        
        currentRoom = (currentRoom - 1 + roomCards.length) % roomCards.length;
        showRoom(currentRoom);
    }
    
    // Room filtering functionality
    function filterRooms() {
        if (!roomsGrid) return;
        
        const typeValue = typeFilter ? typeFilter.value : 'all';
        const viewValue = viewFilter ? viewFilter.value : 'all';
        const priceValue = priceFilter ? priceFilter.value : 'all';
        
        const roomItems = document.querySelectorAll('.room-item');
        
        roomItems.forEach(item => {
            const typeMatch = typeValue === 'all' || item.getAttribute('data-type') === typeValue;
            const viewMatch = viewValue === 'all' || item.getAttribute('data-view') === viewValue;
            const priceMatch = priceValue === 'all' || item.getAttribute('data-price') === priceValue;
            
            if (typeMatch && viewMatch && priceMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    function resetFilters() {
        if (typeFilter) typeFilter.value = 'all';
        if (viewFilter) viewFilter.value = 'all';
        if (priceFilter) priceFilter.value = 'all';
        
        // Show all rooms
        const roomItems = document.querySelectorAll('.room-item');
        roomItems.forEach(item => {
            item.style.display = 'block';
        });
    }
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileNav);
    }
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    if (bookNowBtns.length) {
        bookNowBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const roomType = this.getAttribute('data-room');
                const roomTypeSelect = document.getElementById('roomType');
                
                if (roomTypeSelect) {
                    // Find and select the option that matches the room type
                    for (let i = 0; i < roomTypeSelect.options.length; i++) {
                        if (roomTypeSelect.options[i].text === roomType) {
                            roomTypeSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                openModal();
            });
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeModalFunc();
        }
    });
    
    // Close mobile nav when clicking a link
    const navLinkItems = document.querySelectorAll('.nav-links li a');
    if (navLinkItems.length) {
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    toggleMobileNav();
                }
            });
        });
    }
    
    // Form submissions
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    if (document.getElementById('bookingForm')) {
        document.getElementById('bookingForm').addEventListener('submit', validateBookingForm);
    }
    
    // FAQ accordion
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                toggleFAQ.call(item);
            });
        });
    }
    
    // Testimonial dots
    if (dots.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                stopTestimonialRotation();
                changeTestimonial.call(this);
            });
        });
        
        // Start auto rotation
        startTestimonialRotation();
    }
    
    // Room carousel
    if (roomCards.length) {
        // Show first room initially
        showRoom(currentRoom);
        
        // Room navigation buttons
        if (nextRoomBtn) {
            nextRoomBtn.addEventListener('click', nextRoom);
        }
        
        if (prevRoomBtn) {
            prevRoomBtn.addEventListener('click', prevRoom);
        }
        
        // Auto rotate rooms every 5 seconds
        setInterval(nextRoom, 8000);
    }
    
    // Room filtering
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', filterRooms);
    }
    
    // Reset filters
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', resetFilters);
    }
    // Initialize date picker for booking
    setMinDates();
    
    // Initialize map placeholder click event
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would initialize a map API
            alert('Map functionality would be implemented with Google Maps or similar API in a production environment.');
        });
    }
    
    // Scroll to room section when "Explore Rooms" button is clicked
    const exploreRoomsBtn = document.querySelector('.hero-buttons .btn-primary');
    if (exploreRoomsBtn && exploreRoomsBtn.textContent.includes('Explore Rooms') && window.location.pathname.includes('index.html')) {
        exploreRoomsBtn.addEventListener('click', function(e) {
            if (document.querySelector('.room-preview')) {
                e.preventDefault();
                const roomSection = document.querySelector('.room-preview');
                window.scrollTo({
                    top: roomSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add animations to elements when they come into view
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.feature-card, .room-card, .testimonial-content, .info-card, .contact-form-container');
        
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animation
    if (document.querySelectorAll('.feature-card, .room-card, .testimonial-content, .info-card, .contact-form-container').length) {
        // Set initial state
        document.querySelectorAll('.feature-card, .room-card, .testimonial-content, .info-card, .contact-form-container').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Animate on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Trigger once on load
        animateOnScroll();
    }
    
    // Booking form date validation
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        // Update minimum check-out date when check-in date changes
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            
            checkOutInput.min = formatDate(nextDay);
            
            // If current check-out date is before new min date, update it
            if (new Date(checkOutInput.value) <= checkInDate) {
                checkOutInput.value = formatDate(nextDay);
            }
        });
    }
});