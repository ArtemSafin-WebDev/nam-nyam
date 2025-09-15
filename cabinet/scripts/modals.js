document.addEventListener("DOMContentLoaded", () => {
  const openModal = (modal) => {
    modal?.classList.add("active");
    document.body.classList.add("modal-open");
    document.body.classList.remove("menu-open");
    const modalOpenEvent = new CustomEvent("modalopen");
    document.dispatchEvent(modalOpenEvent);
  };
  const closeModal = (modal) => {
    modal?.classList.remove("active");
    document.body.classList.remove("modal-open");
    const modalCloseEvent = new CustomEvent("modalclose");
    document.dispatchEvent(modalCloseEvent);
  };

  document.addEventListener("click", (event) => {
    if (
      event.target.matches(".js-close-modal") ||
      event.target.closest(".js-close-modal")
    ) {
      event.preventDefault();
      const btn = event.target.matches(".js-close-modal")
        ? event.target
        : event.target.closest(".js-close-modal");
      const modal = btn.closest(".js-modal");
      if (modal) {
        closeModal(modal);
      }
    }

    if (
      event.target.matches(".js-open-modal") ||
      event.target.closest(".js-open-modal")
    ) {
      event.preventDefault();
      const btn = event.target.matches(".js-open-modal")
        ? event.target
        : event.target.closest(".js-open-modal");

      const href = btn.hash;

      console.log("Href", href);

      const modal = document.querySelector(href);
      if (modal) {
        const otherModals = Array.from(document.querySelectorAll(".js-modal"));
        otherModals.forEach((modal) => modal.classList.remove("active"));
        openModal(modal);
      }
    }

    if (event.target.matches(".js-modal")) {
      closeModal(event.target);
    }
  });
});
