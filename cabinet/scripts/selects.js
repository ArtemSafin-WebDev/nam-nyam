document.addEventListener("DOMContentLoaded", () => {
  const selects = Array.from(document.querySelectorAll(".js-select"));
  selects.forEach((select) => {
    const button = select.querySelector("button");
    const buttonText = button.querySelector("span:first-child");
    const placeholder = button.getAttribute("data-placeholder");
    const options = Array.from(select.querySelectorAll("input"));

    const setActive = () => {
      const checkedInput = options.find((option) => option.checked);
      if (!checkedInput) {
        buttonText.textContent = placeholder;
        button.classList.add("placeholder-shown");
        select.classList.remove("active");
        return;
      }
      buttonText.textContent =
        checkedInput.parentElement.querySelector("span:last-child").textContent;

      button.classList.remove("placeholder-shown");
      select.classList.remove("active");
    };

    setActive();

    options.forEach((option) => option.addEventListener("change", setActive));
    button.addEventListener("click", (event) => {
      event.preventDefault();
      select.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (select.contains(event.target)) return;
      select.classList.remove("active");
    });
  });
});
