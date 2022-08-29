const sections = document.querySelectorAll('.container');
// const sec2 = document.querySelector('.c2');

// const options = {};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        entry.target.classList.add('in-frame');
        console.log('observer killed for ', entry.target);
      } else {
        entry.target.classList.remove('in-frame');
      }
    });
  },
  {
    // rootMargin: '-50px',
  }
);

sections.forEach((section) => observer.observe(section));
