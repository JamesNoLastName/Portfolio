document.addEventListener('DOMContentLoaded', () => {
    function insertCurrentDate() {
        const paragraph = document.getElementById('intro-text');
        if (paragraph) {
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = today.toLocaleDateString(undefined, options);
            paragraph.innerHTML = paragraph.innerHTML.replace('[date]', formattedDate);
        }
    }
    insertCurrentDate();

    const hireMeButton = document.getElementById('hire-me-btn');
    const contactMessage = document.getElementById('contact-message');
    const socialIcons = document.querySelectorAll('.social-icon');

    if (hireMeButton && contactMessage && socialIcons.length) {
        hireMeButton.addEventListener('click', (event) => {
            event.preventDefault();
            contactMessage.textContent = 'Contact me!';
            contactMessage.style.display = 'inline'; 
            socialIcons.forEach(icon => icon.classList.add('highlight'));
            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.style.display = 'none';
                socialIcons.forEach(icon => icon.classList.remove('highlight'));
            }, 5000);
        });
    }

    const texts = ["Game Developer", "Frontend Designer", "Music Composer", "Programmer", "Graphic Designer", "Student"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 75;
    const erasingSpeed = 50; 
    const pauseDuration = 1500; 
    const typingTextElement = document.querySelector('.typing-text span');
    if (typingTextElement) {
        let isTyping = true;
        let isErasing = false;

        function type() {
            if (isErasing) return; 

            if (currentCharIndex < texts[currentTextIndex].length) {
                typingTextElement.textContent += texts[currentTextIndex].charAt(currentCharIndex);
                currentCharIndex++;
                setTimeout(type, typingSpeed);
            } else {
                isTyping = false;
                setTimeout(erase, pauseDuration);
            }
        }

        function erase() {
            if (isTyping) return; 

            if (currentCharIndex > 0) {
                typingTextElement.textContent = texts[currentTextIndex].substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                isErasing = false;
                isTyping = true;
                setTimeout(type, typingSpeed);
            }
        }
        type();
    }

    const sections = Array.from(document.querySelectorAll('section'));
    const navLinks = Array.from(document.querySelectorAll('nav a'));

    function changeActiveLink() {
        let currentIndex = -1;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionBottom - 50) {
                currentIndex = index;
            }
        });

        navLinks.forEach((link) => link.classList.remove('active'));

        if (currentIndex >= 0 && navLinks[currentIndex]) {
            navLinks[currentIndex].classList.add('active');
        }
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
    window.addEventListener('resize', changeActiveLink);
    const homeImg = document.querySelector('.home-img');
    if (homeImg) {
        homeImg.addEventListener('click', function () {
            homeImg.classList.toggle('spinning');
        });
        homeImg.addEventListener('mouseenter', function () {
            if (!homeImg.classList.contains('spinning')) {
                homeImg.setAttribute('data-hover', 'Click to spin');
            }
        });
        homeImg.addEventListener('mouseleave', function () {
            homeImg.removeAttribute('data-hover');
        });
    }
    const highlights = document.querySelectorAll('.highlight');
    const aboutMeSection = document.querySelector('#about-me');

    if (highlights.length && aboutMeSection) {
        let currentImageUrl = '';

        highlights.forEach(span => {
            span.addEventListener('mouseover', () => {
                const imageUrl = span.getAttribute('data-image');
                if (imageUrl !== currentImageUrl) {
                    aboutMeSection.style.backgroundImage = `url(${imageUrl})`;
                    currentImageUrl = imageUrl; 
                }
            });
        });
        aboutMeSection.addEventListener('mouseleave', () => {
            currentImageUrl = ''; 
        });
    }
});
