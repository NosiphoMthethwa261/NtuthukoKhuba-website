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

// ---------- FORM HANDLING ----------
const form = document.getElementById('enquiryForm');
const successMessage = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        alert('Network error. Please check your connection.');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]:not(#openModalBtn):not(#openModalBtnHero)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
