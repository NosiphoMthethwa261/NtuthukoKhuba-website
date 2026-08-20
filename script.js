// ---------- GALLERY FILTER ----------
const filterButtons = document.querySelectorAll('.filter-tabs button');
const galleryCards = document.querySelectorAll('.gallery-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ---------- MODAL CONTROLS ----------
const modal = document.getElementById('enquiryModal');
const openBtns = document.querySelectorAll('#openModalBtn, #openModalBtnHero');
const closeBtn = document.getElementById('closeModalBtn');

openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

document.getElementById('closeModalAfterSuccess')?.addEventListener('click', closeModal);

// ---------- FORM HANDLING (UPDATED) ----------
const form = document.getElementById('enquiryForm');
const successMessage = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Check if the response is OK
        if (response.ok) {
            // Success!
            form.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Server returned an error
            const errorData = await response.json();
            console.error('Formspree error:', errorData);
            alert('Oops! Something went wrong. Please try again or email us directly.');
        }
    } catch (error) {
        // Network error or other issue
        console.error('Network error:', error);
        alert('Network error. Please check your internet connection and try again.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ---------- SMOOTH SCROLLING ----------
document.querySelectorAll('a[href^="#"]:not(#openModalBtn):not(#openModalBtnHero)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
