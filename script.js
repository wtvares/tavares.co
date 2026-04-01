function copyEmail() {
    const email = "hi@tavares.co";
    
    // Use the modern clipboard API instead of execCommand
    navigator.clipboard.writeText(email).then(() => {
        showCopiedState();
    }).catch(err => {
        // Fallback for clipboard API failure
        const tempInput = document.createElement("input");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showCopiedState();
    });
}

function showCopiedState() {
    const emailButton = document.querySelector('.email-button');

    if (!emailButton) {
        return;
    }

    clearTimeout(showCopiedState.timeoutId);
    emailButton.classList.add('copied');

    showCopiedState.timeoutId = setTimeout(() => {
        emailButton.classList.remove('copied');
    }, 1800);
}

function openRevolutLink() {
    window.open('https://apps.apple.com/us/app/revolut-18/id1499857038', '_blank');
}

function openGetYourGuideLink() {
    window.open('https://apps.apple.com/us/app/getyourguide-plan-book/id705079381', '_blank');
}

function openSpotifyLink() {
    window.open('https://www.spotify.com/us/account/overview/', '_blank');
}

function setupNameScramble() {
    const name = document.querySelector('.scramble-text');
    const body = document.body;

    if (!name || !body) {
        return;
    }

    name.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return;
    }

    const originalText = name.dataset.text || name.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let frameId;
    const vowels = new Set(['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u']);
    const scrambleIndexes = originalText
        .split('')
        .map((char, index) => char === ' ' ? -1 : index)
        .filter((index) => index !== -1 && vowels.has(originalText[index]))
        .filter((_, index) => index % 2 === 0);
    let frame = 0;
    const maxFrames = 22;

    const render = () => {
        const nextText = originalText
            .split('')
            .map((char, index) => {
                if (char === ' ') {
                    return ' ';
                }

                if (!scrambleIndexes.includes(index)) {
                    return originalText[index];
                }

                if (frame >= maxFrames || frame > scrambleIndexes.indexOf(index) * 4 + 4) {
                    return originalText[index];
                }

                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        name.textContent = nextText;
        frame += 1;

        if (frame <= maxFrames) {
            frameId = requestAnimationFrame(render);
            return;
        }

        name.textContent = originalText;
    };

    name.addEventListener('mouseenter', () => {
        cancelAnimationFrame(frameId);
        frame = 0;
        render();
    });

    name.addEventListener('mouseleave', () => {
        cancelAnimationFrame(frameId);
        name.textContent = originalText;
    });
}

function setupScrollReveal() {
    const sections = document.querySelectorAll('.image-section');

    if (!sections.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sections.forEach((section, index) => {
        if (index === 0 || prefersReducedMotion) {
            section.classList.add('is-visible');
            return;
        }

        section.classList.add('reveal-ready');
    });

    if (prefersReducedMotion) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        sections.forEach((section) => section.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            instance.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
    });

    sections.forEach((section, index) => {
        if (index === 0) {
            return;
        }

        observer.observe(section);
    });
}

function loadDeferredVideos() {
    const lazyVideos = document.querySelectorAll('[data-lazy-video]');

    if (!lazyVideos.length) {
        return;
    }

    const loadVideo = (video) => {
        const source = video.querySelector('source[data-src]');

        if (!source) {
            return;
        }

        source.src = source.dataset.src;
        source.removeAttribute('data-src');
        video.load();
    };

    if (!('IntersectionObserver' in window)) {
        lazyVideos.forEach(loadVideo);
        return;
    }

    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            loadVideo(entry.target);
            instance.unobserve(entry.target);
        });
    }, {
        rootMargin: '300px 0px'
    });

    lazyVideos.forEach((video) => observer.observe(video));
}

setupNameScramble();
setupScrollReveal();
loadDeferredVideos();
