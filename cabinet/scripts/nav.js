document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(
    document.querySelectorAll(".account__nav-current")
  );

  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      element.parentElement.classList.toggle("menu-open");
    });
  });
});
