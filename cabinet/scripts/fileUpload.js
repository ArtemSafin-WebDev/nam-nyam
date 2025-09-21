document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-file-upload"));

  elements.forEach((element) => {
    const input = element.querySelector('input[type="file"]');
    const label = element.querySelector(".js-file-upload-text");
    const clearBtn = element.querySelector(".js-file-upload-clear-btn");
    const form = element.closest("form");

    if (!input) return;

    const originalLabelText = label ? label.textContent : null;

    input.addEventListener("change", () => {
      if (input.files && input.files.length) {
        if (label) label.textContent = input.files[0].name;
        element.classList.add("file-loaded");
      } else {
        element.classList.remove("file-loaded");
      }
    });

    input.addEventListener("dragenter", () => {
      element.classList.add("dragged");
    });
    input.addEventListener("dragend", () => {
      element.classList.remove("dragged");
    });
    input.addEventListener("dragleave", () => {
      element.classList.remove("dragged");
    });
    input.addEventListener("drop", () => {
      element.classList.remove("dragged");
    });

    const clear = () => {
      input.value = "";
      if (label) label.textContent = originalLabelText;
      element.classList.remove("file-loaded");
      element.classList.remove("dragged");
    };

    form?.addEventListener("reset", () => {
      clear();
    });

    clearBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      clear();
    });
  });
});
