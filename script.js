document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL HANDLING ---
    // The enquiry modal is opened from several places: the hero note and the
    // "Contact us" link in the How to Book section. Any element with the
    // .open-enquiry class (or the #open-enquiry-btn id) will open it.
    const enquiryModal = document.getElementById('enquiry-modal');
    if (!enquiryModal) return;

    const openModal = () => enquiryModal.style.display = 'block';
    const closeModal = () => enquiryModal.style.display = 'none';

    const openTriggers = document.querySelectorAll('#open-enquiry-btn, .open-enquiry');
    openTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close buttons inside the modal
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Click the dark backdrop to close
    window.addEventListener('click', (e) => {
        if (e.target === enquiryModal) closeModal();
    });

    // Escape key closes the modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
