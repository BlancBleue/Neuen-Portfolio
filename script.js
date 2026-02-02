// Set year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll using IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Simple parallax for bg front layer
const frontLayer = document.querySelector(".bg-layer--front");
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.03;
  frontLayer.style.transform = `translateY(${offset}px)`;
});
