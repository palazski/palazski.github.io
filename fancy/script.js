// Audio setup
const audio = new Audio('abdullah.mp3');
audio.volume = 0.5; // Set volume to 50%

// Play sound when page loads
window.addEventListener('load', () => {
    // Some browsers require user interaction before playing audio
    try {
        audio.play().catch(error => {
            console.log('Auto-play prevented:', error);
        });
    } catch (error) {
        console.log('Error playing audio:', error);
    }
});

// Create floating elements less frequently
function createFloatingElement() {
    const element = document.createElement('div');
    element.innerHTML = '🎉';
    element.style.position = 'fixed';
    element.style.fontSize = Math.random() * 20 + 15 + 'px';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.pointerEvents = 'none';
    element.style.animation = `float ${Math.random() * 8 + 5}s linear infinite`;
    element.style.opacity = '0.7';
    document.body.appendChild(element);
    
    // Remove after animation
    setTimeout(() => {
        element.remove();
    }, 8000);
}

// Reduced frequency of floating emojis
setInterval(createFloatingElement, 2000);

// Gentler explosion effect on click
document.addEventListener('click', (e) => {
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = e.clientX + 'px';
    explosion.style.top = e.clientY + 'px';
    explosion.style.transform = 'translate(-50%, -50%)';
    explosion.style.fontSize = '50px';
    explosion.innerHTML = '✨';
    explosion.style.pointerEvents = 'none';
    explosion.style.opacity = '0.8';
    document.body.appendChild(explosion);
    
    // Fade out effect
    let opacity = 0.8;
    const fadeInterval = setInterval(() => {
        opacity -= 0.1;
        explosion.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            explosion.remove();
        }
    }, 100);
});

// Smoother element movement away from cursor
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('p, h2, h3, li');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
            const angle = Math.atan2(deltaY, deltaX);
            const pushX = Math.cos(angle) * (150 - distance) * 0.05;
            const pushY = Math.sin(angle) * (150 - distance) * 0.05;
            
            element.style.transform = `translate(${-pushX}px, ${-pushY}px)`;
        } else {
            element.style.transform = '';
        }
    });
});

// Add smoother floating keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(50px, -50px) rotate(45deg); }
        50% { transform: translate(100px, 0) rotate(90deg); }
        75% { transform: translate(50px, 50px) rotate(135deg); }
        100% { transform: translate(0, 0) rotate(180deg); }
    }
`;
document.head.appendChild(style);

// Gentler title animation
const title = document.querySelector('h1');
setInterval(() => {
    title.style.transform = `
        scale(${1 + Math.random() * 0.2})
        rotate(${Math.random() * 10 - 5}deg)
    `;
    setTimeout(() => {
        title.style.transform = '';
    }, 1000);
}, 4000);

// Create fewer, more subtle background particles
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.3';
    document.body.appendChild(particle);
    
    // Fade out effect
    let opacity = 0.3;
    const fadeInterval = setInterval(() => {
        opacity -= 0.01;
        particle.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            particle.remove();
        }
    }, 50);
}

setInterval(createParticle, 500);
