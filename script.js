// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const toggle = document.querySelector(".theme-toggle");
const body = document.body;

// Load saved theme
const saved = localStorage.getItem("theme");
if (saved === "light") {
  body.classList.remove("theme-dark");
  body.classList.add("theme-light");
}

toggle.addEventListener("click", () => {
  const isDark = body.classList.contains("theme-dark");
  body.classList.toggle("theme-dark", !isDark);
  body.classList.toggle("theme-light", isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
});
