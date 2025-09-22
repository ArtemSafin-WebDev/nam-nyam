document.addEventListener("DOMContentLoaded", () => {
  const controller = new AbortController();
  const signal = controller.signal;
  document.addEventListener("click", async (event) => {
    if (
      event.target.matches(".js-open-ajax-modal") ||
      event.target.closest(".js-open-ajax-modal")
    ) {
      event.preventDefault();
      const link = event.target.matches(".js-open-ajax-modal")
        ? event.target
        : event.target.closest(".js-open-ajax-modal");
      const href = link.href;

      try {
        const response = await fetch(href, { signal });
        if (!response.ok) throw new Error("Error when loading modal");
        const text = await response.text();

        const parser = new DOMParser();
        const nextPageHtml = parser.parseFromString(text, "text/html");

        const modal = nextPageHtml.querySelector(".page .account__modal");

        document.body.appendChild(modal);
        window.namNyamApi.initMasks(modal);
        const form = modal.querySelector("form[data-need-validation]");
        if (form) {
          window.namNyamApi.initFormValidation(form);
        }
        const jsForm = modal.querySelector(".js-form");
        if (jsForm) {
          window.namNyamApi.initJsForm(jsForm);
        }

        const businessSliders = Array.from(
          modal.querySelectorAll(".menu__business-slider")
        );
        if (businessSliders.length) {
          businessSliders.forEach((slider) =>
            window.namNyamApi.initBusinessSlider(slider)
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 200));
        Array.from(document.querySelectorAll(".js-modal")).forEach(
          (otherModal) => {
            if (otherModal === modal) {
              return;
            }
            otherModal.classList.remove("active");
          }
        );
        document.body.classList.remove("modal-open");
        modal.classList.add("active");
        document.body.classList.add("modal-open");

        const transitionEndHandler = () => {
          modal.removeEventListener("transitionend", transitionEndHandler);
          modal.remove();
        };

        document.addEventListener("modalclose", () => {
          modal.addEventListener("transitionend", transitionEndHandler);
        });

        console.log("Response text", modal);
      } catch (err) {
        console.error(`Download error: ${err.message}`);
      }
    }
  });
});
