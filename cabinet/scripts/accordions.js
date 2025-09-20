document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-accordion"));
  elements.forEach((element) => {
    const btn = element.querySelector(".js-accordion-btn");

    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      element.classList.toggle("open");
    });
  });
});
