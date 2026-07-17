import { useEffect } from 'react';

export function useScrollAnim() {
  useEffect(() => {
    const init = () => {
      const targets = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in');
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      targets.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    };

    const timeout = setTimeout(init, 100);
    return () => clearTimeout(timeout);
  }, []);
}