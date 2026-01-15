let selectedTime = '';

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeDatePicker();
    initializeTimeSlots();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeServiceCards();
    showWelcomeMessage();
});

// ========== DATE PICKER SETUP ==========
function initializeDatePicker() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Set default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
}

// ========== TIME SLOT SELECTION ==========
function initializeTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Store selected time
            selectedTime = this.getAttribute('data-time');
            
            console.log('Selected time:', selectedTime);
        });
    });
}




// ========== FORM VALIDATION ==========
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const dentist = document.getElementById('dentist').value;

    // Check if all fields are filled
    if (!name || !email || !phone || !date || !service || !dentist || !selectedTime) {
        alert('⚠️ Please fill in all required fields and select a time slot!');
        return false;
    }

    // Validate name (at least 2 characters)
    if (name.length < 2) {
        alert('⚠️ Please enter a valid name (at least 2 characters)!');
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Please enter a valid email address!');
        return false;
    }

    // Validate phone (basic check)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        alert('⚠️ Please enter a valid phone number (at least 10 digits)!');
        return false;
    }

    return true;
}

// ========== FORM SUBMISSION ==========
function submitForm() {
    // Validate form
    if (!validateForm()) {
        return;
    }

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const dentist = document.getElementById('dentist').value;
    const message = document.getElementById('message').value.trim();

    // Format date for display
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create confirmation message
    const confirmationHTML = `
        <strong>Patient:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br><br>
        <strong>📅 Date:</strong> ${formattedDate}<br>
        <strong>🕐 Time:</strong> ${selectedTime}<br>
        <strong>🦷 Service:</strong> ${service}<br>
        <strong>👨‍⚕️ Dentist:</strong> ${dentist}<br>
        ${message ? `<br><strong>Notes:</strong> ${message}` : ''}
        <br><br>
        <em>You'll receive a confirmation email shortly at ${email}</em>
    `;

    // Hide form and show success message
    document.getElementById('bookingForm').style.display = 'none';
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    document.getElementById('confirmationText').innerHTML = confirmationHTML;

    // Log appointment data (in real app, this would go to backend)
    console.log('Appointment Booked:', {
        name, email, phone, date: formattedDate, 
        time: selectedTime, service, dentist, message
    });

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset form after 6 seconds
    setTimeout(resetForm, 6000);
}

// ========== RESET FORM ==========
function resetForm() {
    // Hide success message
    document.getElementById('successMessage').classList.remove('show');
    
    // Show form again
    document.getElementById('bookingForm').style.display = 'block';
    
    // Clear all form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('service').value = '';
    document.getElementById('dentist').value = '';
    document.getElementById('message').value = '';
    
    // Reset date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
    
    // Clear selected time slot
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    selectedTime = '';
    
    console.log('Form reset complete');
}

// ========== SMOOTH SCROLL ==========
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== MOBILE MENU ==========
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '20px';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '10px';
                navLinks.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
            }
        });
    }
}

// ========== SCROLL ANIMATIONS ==========
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ========== SERVICE CARD CLICK ==========
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceSelect = document.getElementById('service');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            // Auto-select service in booking form
            for (let option of serviceSelect.options) {
                if (option.text.includes(serviceName)) {
                    serviceSelect.value = option.value;
                    break;
                }
            }
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ========== CONSOLE WELCOME MESSAGE ==========
function showWelcomeMessage() {
    console.log('%c Welcome to DentalConnect Pro! ', 
        'background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; font-size: 20px; padding: 10px;');
    console.log('👨‍💻 Developed by: Your Name');
    console.log('📅 Date: January 2026');
    console.log('🦷 Ready to book appointments!');
}

// ========== FORM AUTO-SAVE (Optional Feature) ==========
function autoSaveForm() {
    const formFields = ['name', 'email', 'phone', 'service', 'dentist'];
    
    formFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', function() {
                console.log(`${field} updated: ${this.value}`);
            });
        }
    });
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + B = Go to booking section
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape key = Close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex' && window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', autoSaveForm);

console.log('✅ DentalConnect Pro script loaded successful')