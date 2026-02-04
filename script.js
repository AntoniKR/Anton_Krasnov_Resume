// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Наблюдение за всеми секциями
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// QR код функционал
document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const qrHeader = document.getElementById('qrHeader');
    const qrModal = document.getElementById('qrModal');
    const qrClose = document.querySelector('.qr-modal-close');
    
    // Проверяем, есть ли QR код на странице
    if (!qrHeader) return;
    
    // Открытие модального окна при клике на QR код
    qrHeader.addEventListener('click', function() {
        qrModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Функция закрытия модального окна
    function closeQrModal() {
        qrModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Закрытие модального окна
    if (qrClose) {
        qrClose.addEventListener('click', closeQrModal);
    }
    
    // Закрытие при клике вне модального окна
    if (qrModal) {
        qrModal.addEventListener('click', function(event) {
            if (event.target === qrModal) {
                closeQrModal();
            }
        });
    }
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && qrModal && qrModal.style.display === 'block') {
            closeQrModal();
        }
    });
    
    // Простая анимация при наведении
    qrHeader.addEventListener('mouseenter', function() {
        const wrapper = this.closest('.qr-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'scale(1.15)';
        }
    });
    
    qrHeader.addEventListener('mouseleave', function() {
        const wrapper = this.closest('.qr-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'scale(1)';
        }
    });
});