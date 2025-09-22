document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-accordion"));

  const initAccordion = (element) => {
    const btn = element.querySelector(".js-accordion-btn");

    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      element.classList.toggle("open");
      document.dispatchEvent(new CustomEvent("accordion:toggle"));
    });
  };
  if (!window.namNyamApi) {
    window.namNyamApi = {};
  }
  window.namNyamApi.initAccordion = initAccordion;
  elements.forEach((element) => initAccordion(element));
});
