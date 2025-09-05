document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL HANDLING ---
    const availabilityModal = document.getElementById('availability-modal');
    const enquiryModal = document.getElementById('enquiry-modal');
    const openAvailabilityBtn = document.getElementById('open-availability-btn');
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Function to open a modal
    const openModal = (modal) => modal.style.display = 'block';
    
    // Function to close a modal
    const closeModal = (modal) => modal.style.display = 'none';

    // Event listener for the main "Check Availability" button
    openAvailabilityBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(availabilityModal);
    });

    // Event listeners for all close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(availabilityModal);
            closeModal(enquiryModal);
        });
    });

    // Event listener to close modal by clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === availabilityModal) closeModal(availabilityModal);
        if (e.target === enquiryModal) closeModal(enquiryModal);
    });

    // --- DATE PICKER MINIMUM DATE ---
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').setAttribute('min', today);
    document.getElementById('check-out').setAttribute('min', today);

    // --- AVAILABILITY CHECK LOGIC ---
    const availabilityForm = document.getElementById('availability-form');
    const statusP = document.getElementById('availability-status');

    availabilityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        statusP.textContent = 'Checking...';
        statusP.className = '';

        const checkInDate = new Date(document.getElementById('check-in').value);
        const checkOutDate = new Date(document.getElementById('check-out').value);

        // Basic validation
        if (isNaN(checkInDate) || isNaN(checkOutDate) || checkOutDate <= checkInDate) {
            statusP.textContent = 'Please select a valid check-in and check-out date.';
            statusP.classList.add('status-unavailable');
            return;
        }

        try {
            const response = await fetch('bookings.json');
            if (!response.ok) throw new Error('Could not load booking data.');
            const bookedDates = await response.json();

            let isAvailable = true;
            for (const booking of bookedDates) {
                const bookedStart = new Date(booking.startDate);
                const bookedEnd = new Date(booking.endDate);

                // Check for overlap
                if (checkInDate < bookedEnd && checkOutDate > bookedStart) {
                    isAvailable = false;
                    break;
                }
            }

            if (isAvailable) {
                statusP.textContent = 'Great! Those dates are available.';
                statusP.classList.add('status-available');

                // Proceed to enquiry form after a short delay
                setTimeout(() => {
                    closeModal(availabilityModal);
                    openModal(enquiryModal);
                    // Populate the enquiry form
                    const checkInStr = checkInDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
                    const checkOutStr = checkOutDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
                    
                    document.getElementById('enquiry-dates').textContent = `Your selected dates: ${checkInStr} to ${checkOutStr}`;
                    document.getElementById('dates-for-form').value = `${checkInStr} to ${checkOutStr}`;
                }, 1500);

            } else {
                statusP.textContent = 'Sorry, those dates are not available. Please try others.';
                statusP.classList.add('status-unavailable');
            }

        } catch (error) {
            console.error('Error checking availability:', error);
            statusP.textContent = 'Could not check availability. Please try again later.';
            statusP.classList.add('status-unavailable');
        }
    });
});