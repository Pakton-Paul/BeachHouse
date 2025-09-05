document.addEventListener('DOMContentLoaded', () => {
    // --- Get Modal Elements ---
    const testimonialModal = document.getElementById('testimonial-modal');
    const reportModal = document.getElementById('report-modal');

    // --- Get Open Buttons ---
    const openTestimonialBtn = document.getElementById('open-testimonial-btn');
    const openReportBtn = document.getElementById('open-report-btn');

    // --- Get Close Buttons ---
    const closeTestimonialBtn = document.getElementById('close-testimonial-btn');
    const closeReportBtn = document.getElementById('close-report-btn');

    // --- Function to open a modal ---
    const openModal = (modal) => modal.style.display = 'block';

    // --- Function to close a modal ---
    const closeModal = (modal) => modal.style.display = 'none';

    // --- Event Listeners for Opening Modals ---
    openTestimonialBtn.addEventListener('click', () => openModal(testimonialModal));
    openReportBtn.addEventListener('click', () => openModal(reportModal));

    // --- Event Listeners for Closing Modals ---
    closeTestimonialBtn.addEventListener('click', () => closeModal(testimonialModal));
    closeReportBtn.addEventListener('click', () => closeModal(reportModal));

    // --- Event Listener to close modals by clicking outside ---
    window.addEventListener('click', (e) => {
        if (e.target === testimonialModal) closeModal(testimonialModal);
        if (e.target === reportModal) closeModal(reportModal);
    });
});