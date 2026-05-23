document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    /* Close mobile nav if clicked outside */
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });

    /* ==========================================================================
       NAVBAR SCROLL SHADOW & HEIGHT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       HERO COUNTDOWN TIMER
       ========================================================================== */
    // Target date: June 6, 2026 at 6:30 PM (18:30:00) IST
    const targetDate = new Date('2026-06-06T18:30:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById('countdown').innerHTML = `<div class="wedding-started-msg" style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--rose-gold); letter-spacing: 0.1em; grid-column: span 4; width: 100%; text-align: center;">The Celebration Has Begun!</div>`;
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    // Run immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ==========================================================================
       BACKGROUND MUSIC CONTROLLER (PLAY/PAUSE & INTERACTIVE PLAYBACK)
       ========================================================================== */
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    // Adjust volume to a soft romantic level
    audio.volume = 0.4;

    function playAudio() {
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
        }).catch(err => {
            console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
        });
    }

    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
    }

    // Toggle button handler
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // Start audio on first user click anywhere on the page (overcoming browser autoplay restrictions)
    const startAudioOnInteraction = () => {
        if (!isPlaying) {
            playAudio();
        }
        document.removeEventListener('click', startAudioOnInteraction);
        document.removeEventListener('scroll', startAudioOnInteraction);
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('scroll', startAudioOnInteraction);

    /* ==========================================================================
       FLOATING PARTICLES SYSTEM
       ========================================================================== */
    const particleContainer = document.getElementById('particle-container');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        
        // Randomize sizes, opacities, speeds, and vertical paths
        const size = Math.random() * 8 + 4; // 4px to 12px
        const leftPos = Math.random() * 100; // 0% to 100%
        const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
        const animDuration = Math.random() * 12 + 10; // 10s to 22s
        const animDelay = Math.random() * 10; // 0s to 10s delay

        // Apply Styles
        particle.style.position = 'absolute';
        particle.style.bottom = '-20px';
        particle.style.left = `${leftPos}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--primary-blush)' : '#FFF0ED';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.filter = 'blur(1px)';
        
        // Inline CSS Animation keyframes dynamically
        particle.style.animation = `floatUp ${animDuration}s linear ${animDelay}s infinite`;
        
        particleContainer.appendChild(particle);
    }

    // Append keyframe styles dynamically if not in stylesheet
    const particleStyles = document.createElement('style');
    particleStyles.innerHTML = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: inherit;
            }
            90% {
                opacity: inherit;
            }
            100% {
                transform: translateY(-105vh) translateX(50px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyles);

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.fade-up, .fade-up-init');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Unobserve once revealed to keep layout light
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Make hero element reveal immediately
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.classList.add('reveal');
    }, 100);

    /* ==========================================================================
       GALLERY LIGHTBOX MODAL
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item:not(.card-fallback-decoration)');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxModal.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerText = img.alt;
            document.body.style.overflow = 'hidden'; // Stop page scrolling
        });
    });

    function closeLightboxView() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeLightbox.addEventListener('click', closeLightboxView);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightboxView();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
            closeLightboxView();
        }
    });



});
