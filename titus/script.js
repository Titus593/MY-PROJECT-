document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchForm = document.getElementById('searchForm');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');
    const modalDoctorName = document.getElementById('modalDoctorName');
    const doctorIdInput = document.getElementById('doctorId');
    const doctorsContainer = document.getElementById('doctorsContainer');
    const doctorCards = document.querySelectorAll('.doctor-card');

    // Search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const specialty = document.getElementById('specialty').value.toLowerCase();
        const region = document.getElementById('region').value.toLowerCase();
        const hospital = document.getElementById('hospital').value.toLowerCase();
        
        doctorCards.forEach(card => {
            const cardSpecialty = card.querySelector('.doctor-specialty').textContent.toLowerCase();
            const cardRegion = card.querySelector('.doctor-details p:nth-child(2)').textContent.toLowerCase();
            const cardHospital = card.querySelector('.doctor-details p:nth-child(1)').textContent.toLowerCase();
            
            const specialtyMatch = specialty === '' || cardSpecialty.includes(specialty);
            const regionMatch = region === '' || cardRegion.includes(region);
            const hospitalMatch = hospital === '' || cardHospital.includes(hospital);
            
            if (specialtyMatch && regionMatch && hospitalMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Open booking modal
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const doctorId = this.getAttribute('data-id');
            const doctorCard = this.closest('.doctor-card');
            const doctorName = doctorCard.querySelector('h3').textContent;
            
            modalDoctorName.textContent = `Book Appointment with ${doctorName}`;
            doctorIdInput.value = doctorId;
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close booking modal
    closeModal.addEventListener('click', function() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const doctorId = doctorIdInput.value;
        const patientName = document.getElementById('patientName').value;
        const patientPhone = document.getElementById('patientPhone').value;
        const patientEmail = document.getElementById('patientEmail').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;
        const medicalConcern = document.getElementById('medicalConcern').value;
        
        // Find the doctor's details
        const doctorCard = document.querySelector(`.book-btn[data-id="${doctorId}"]`).closest('.doctor-card');
        const doctorName = doctorCard.querySelector('h3').textContent;
        const doctorPhone = doctorCard.querySelector('.doctor-details p:nth-child(3)').textContent.replace(/\D/g, '');
        const doctorEmail = doctorCard.querySelector('.doctor-details p:nth-child(4)').textContent;
        
        // In a real application, you would send this data to a server
        alert(`Appointment booked successfully!\n\nDoctor: ${doctorName}\nPatient: ${patientName}\nDate: ${appointmentDate} at ${appointmentTime}\n\nA confirmation has been sent to ${patientEmail} and ${patientPhone}. The doctor (${doctorEmail}) has also been notified.`);
        
        // Reset form and close modal
        bookingForm.reset();
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Set minimum date for appointment to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', today);
});