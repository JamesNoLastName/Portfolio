document.addEventListener('DOMContentLoaded', () => {
    // Insert current date into the paragraph
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

    // Button Click Handling for "Hire Me"
    const hireMeButton = document.getElementById('hire-me-btn');
    const contactMessage = document.getElementById('contact-message');
    const socialIcons = document.querySelectorAll('.social-icon');

    if (hireMeButton && contactMessage && socialIcons.length) {
        hireMeButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default action of the link

            // Show the message
            contactMessage.textContent = 'Contact me!';
            contactMessage.style.display = 'inline'; // Make sure the message is visible

            // Highlight all social icons
            socialIcons.forEach(icon => icon.classList.add('highlight'));

            // Hide the message and remove highlight after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.style.display = 'none';

                // Remove highlight from all icons
                socialIcons.forEach(icon => icon.classList.remove('highlight'));
            }, 5000);
        });
    }

    // Typing Effect
    const texts = ["Game Developer", "Frontend Designer", "Music Composer", "Programmer", "Graphic Designer", "Student"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 75; // Speed of typing in ms
    const erasingSpeed = 50; // Speed of erasing in ms
    const pauseDuration = 1500; // Duration to pause on each text

    const typingTextElement = document.querySelector('.typing-text span');

    if (typingTextElement) {
        let isTyping = true;
        let isErasing = false;

        function type() {
            if (isErasing) return; // Prevent typing while erasing

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
            if (isTyping) return; // Prevent erasing while typing

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

        // Start the typing effect
        type();
    }

    // Navigation link highlighting initialization
    const sections = Array.from(document.querySelectorAll('section'));
    const navLinks = Array.from(document.querySelectorAll('nav a'));

    function changeActiveLink() {
        let currentIndex = -1;

        // Loop through sections to find which is currently in view
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionBottom - 50) {
                currentIndex = index;
            }
        });

        // Remove 'active' class from all links
        navLinks.forEach((link) => link.classList.remove('active'));

        // Add 'active' class to the current link
        if (currentIndex >= 0 && navLinks[currentIndex]) {
            navLinks[currentIndex].classList.add('active');
        }
    }

    // Initial call to set the correct active link on page load
    changeActiveLink();

    // Update active link on scroll
    window.addEventListener('scroll', changeActiveLink);

    // Update section boundaries on resize
    window.addEventListener('resize', changeActiveLink);

    // Home image spinning functionality
    const homeImg = document.querySelector('.home-img');

    if (homeImg) {
        // Click event to toggle spinning
        homeImg.addEventListener('click', function () {
            homeImg.classList.toggle('spinning');
        });

        // Hover effect prompt
        homeImg.addEventListener('mouseenter', function () {
            if (!homeImg.classList.contains('spinning')) {
                homeImg.setAttribute('data-hover', 'Click to spin');
            }
        });

        homeImg.addEventListener('mouseleave', function () {
            homeImg.removeAttribute('data-hover');
        });
    }

    // Highlight hover effect for changing background image
    const highlights = document.querySelectorAll('.highlight');
    const aboutMeSection = document.querySelector('#about-me');

    if (highlights.length && aboutMeSection) {
        // Variable to store the current image
        let currentImageUrl = '';

        highlights.forEach(span => {
            span.addEventListener('mouseover', () => {
                const imageUrl = span.getAttribute('data-image');

                // Only change image if it's different from the current one
                if (imageUrl !== currentImageUrl) {
                    aboutMeSection.style.backgroundImage = `url(${imageUrl})`;
                    currentImageUrl = imageUrl; // Update current image URL
                }
            });
        });

        // Optional: Reset background image on mouse leave if desired
        aboutMeSection.addEventListener('mouseleave', () => {
            currentImageUrl = ''; // Clear current image URL if you want to reset it
        });
    }
});
