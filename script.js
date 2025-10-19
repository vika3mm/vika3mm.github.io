// Анимация прогресс-баров навыков
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Плавная прокрутка для навигации
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Анимируем карточки
    const animatedElements = document.querySelectorAll('.education-card, .hobby-card, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Одна бабочка, следующая за курсором
function createFollowingButterflies() {
    const butterflyContainer = document.createElement('div');
    butterflyContainer.className = 'butterfly-container';
    document.body.appendChild(butterflyContainer);

    // Создаем одну бабочку
    const butterfly = document.createElement('div');
    butterfly.className = 'floating-butterfly';
    butterfly.innerHTML = '🦋';
    butterfly.style.fontSize = '25px';
    butterfly.style.opacity = '0.8';
    butterfly.style.position = 'fixed';
    butterfly.style.zIndex = '9999';
    butterfly.style.pointerEvents = 'none';
    butterfly.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    butterfly.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
    butterfly.style.filter = 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.7))';
    
    // Начальная позиция
    butterfly.style.left = '50%';
    butterfly.style.top = '50%';
    
    butterflyContainer.appendChild(butterfly);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let butterflyX = mouseX;
    let butterflyY = mouseY;
    let animationId;

    // Следим за движением курсора
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Анимация бабочки
    function animateButterfly() {
        // Плавное движение к курсору со смещением
        const targetX = mouseX - 15;
        const targetY = mouseY - 15;
        
        butterflyX += (targetX - butterflyX) * 0.1;
        butterflyY += (targetY - butterflyY) * 0.1;
        
        // Вращение бабочки based on movement
        const dx = targetX - butterflyX;
        const dy = targetY - butterflyY;
        const rotation = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Плавное взмахивание крыльями
        const scale = 0.9 + Math.sin(Date.now() * 0.01) * 0.1;
        
        butterfly.style.left = butterflyX + 'px';
        butterfly.style.top = butterflyY + 'px';
        butterfly.style.transform = `rotate(${rotation + 90}deg) scale(${scale})`;
        
        // Легкое мерцание
        butterfly.style.opacity = (0.7 + Math.sin(Date.now() * 0.005) * 0.1).toString();

        animationId = requestAnimationFrame(animateButterfly);
    }

    // Запускаем анимацию сразу
    animateButterfly();
}

// Статические бабочки в фоне
function createBackgroundButterflies() {
    const backgroundButterflies = ['🦋', '🌸', '💖'];
    const container = document.body;
    
    for (let i = 0; i < 4; i++) {
        const butterfly = document.createElement('div');
        butterfly.innerHTML = backgroundButterflies[Math.floor(Math.random() * backgroundButterflies.length)];
        butterfly.style.position = 'fixed';
        butterfly.style.fontSize = Math.random() * 20 + 15 + 'px';
        butterfly.style.left = Math.random() * 100 + 'vw';
        butterfly.style.top = Math.random() * 100 + 'vh';
        butterfly.style.opacity = '0.2';
        butterfly.style.zIndex = '1';
        butterfly.style.pointerEvents = 'none';
        butterfly.style.animation = `fly ${Math.random() * 10 + 10}s linear infinite`;
        butterfly.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(butterfly);
    }
}

// Анимация шапки
function animateHeader() {
    const header = document.querySelector('.header');
    let angle = 0;
    
    setInterval(() => {
        angle = (angle + 0.5) % 360;
        const gradient = `linear-gradient(${angle}deg, #ff9eb5 0%, #ff7eb3 100%)`;
        header.style.background = gradient;
    }, 100);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    animateSkills();
    initSmoothScroll();
    initScrollAnimations();
    createBackgroundButterflies();
    createFollowingButterflies();
    animateHeader();
    
    // Добавляем интерактивность карточкам
    const cards = document.querySelectorAll('.education-card, .hobby-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});