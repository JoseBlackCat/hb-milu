import { gsap } from 'gsap';
import Lottie from 'lottie-web';
import Typewriter from 'typewriter-effect/dist/core';

document.addEventListener('DOMContentLoaded', () => {
  // Animación de entrada de los gatos
  gsap.fromTo(
    '.cat',
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.5 }
  );

  // Lottie Animation
  Lottie.loadAnimation({
    container: document.getElementById('lottie-cat'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/animations/cat-happy.json', // Asegúrate de tener este archivo
  });

  // Typewriter Effect
  const typewriter = new Typewriter('#typewriter', {
    loop: true,
    delay: 50,
  });

  typewriter
    .typeString('¡Feliz cumpleaños!')
    .pauseFor(1000)
    .deleteAll()
    .typeString('🎉 Que tengas un día increíble 🎉')
    .pauseFor(1000)
    .start();
});
