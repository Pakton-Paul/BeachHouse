document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL HANDLING ---
    const enquiryModal = document.getElementById('enquiry-modal');
    const openEnquiryBtn = document.getElementById('open-enquiry-btn');
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Function to open a modal
    const openModal = (modal) => modal.style.display = 'block';
    
    // Function to close a modal
    const closeModal = (modal) => modal.style.display = 'none';

    // Event listener for the main "Enquire Now" button
    openEnquiryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(enquiryModal);
    });

    // Event listeners for all close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(enquiryModal);
        });
    });

    // Event listener to close modal by clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === enquiryModal) closeModal(enquiryModal);
    });

    // --- DATE PICKER MINIMUM DATE ---
    // Set the minimum selectable date to today for the date pickers in the enquiry form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('enquiry-check-in').setAttribute('min', today);
    document.getElementById('enquiry-check-out').setAttribute('min', today);
});