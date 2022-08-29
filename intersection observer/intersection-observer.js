const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-container');

console.log(cardContainer);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);

      if (entry.isIntersecting) {
        // observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 1,
    // root: cardContainer,
    // rootMargin: '0px',
  }
);

cards.forEach((card) => {
  observer.observe(card);
});
