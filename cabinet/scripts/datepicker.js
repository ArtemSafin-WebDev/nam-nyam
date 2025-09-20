document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(
    document.querySelectorAll(".js-datepicker-input")
  );
  elements.forEach((element) => {
    new AirDatepicker(element, {
      position: element.hasAttribute("data-position")
        ? element.getAttribute("data-position")
        : "bottom right",
    });
  });
});
