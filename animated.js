// This script sets the --i variable for each span to achieve the staggered animation
document.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('.animated-title span');
  spans.forEach((span, i) => {
    span.style.setProperty('--i', i);
  });
});
