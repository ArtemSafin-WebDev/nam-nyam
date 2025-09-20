document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-show-more"));
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      element.parentElement.classList.toggle("show-all");
    });
  });
});
