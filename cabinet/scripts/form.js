document.addEventListener("DOMContentLoaded", () => {
  const forms = Array.from(document.querySelectorAll(".js-form"));

  const initJsForm = (form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if ($(form).parsley().isValid()) {
        const url = form.action;
        fetch(url, {
          method: "POST",
          body: new FormData(form),
        })
          .then((response) => {
            Promise.resolve();
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            Array.from(document.querySelectorAll(".js-modal")).forEach(
              (modal) => modal.classList.remove("active")
            );
            const successModal = document.querySelector("#success-modal");
            successModal.classList.add("active");
            document.body.classList.add("modal-open");
          })
          .catch((error) => {
            Array.from(document.querySelectorAll(".js-modal")).forEach(
              (modal) => modal.classList.remove("active")
            );
            const errorModal = document.querySelector("#error-modal");
            errorModal.classList.add("active");
            document.body.classList.add("modal-open");
            console.log(error);
          });
      }
    });
  };

  if (!window.namNyamApi) {
    window.namNyamApi = {};
  }
  window.namNyamApi.initJsForm = initJsForm;

  forms.forEach((form) => {
    initJsForm(form);
  });
});
