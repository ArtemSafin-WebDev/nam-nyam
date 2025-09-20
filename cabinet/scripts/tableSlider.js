document.addEventListener("DOMContentLoaded", () => {
  let mm = gsap.matchMedia();

  const elements = Array.from(document.querySelectorAll(".js-table-slider"));
  elements.forEach((element) => {
    const container = element.querySelector(".swiper");
    if (!container) return;

    mm.add("(max-width: 767px)", () => {
      const instance = new Swiper(container, {
        speed: 600,
        spaceBetween: 24,
        autoHeight: true,
        // effect: "fade",
        // fadeEffect: {
        //   crossFade: true,
        // },
        pagination: {
          el: element.querySelector(".account__table-slider-pagination"),
          clickable: true,
        },
      });

      const update = () => {
        instance.updateAutoHeight(0);
      };

      window.addEventListener("load", update);

      document.addEventListener("accordion:toggle", update);

      return () => {
        document.removeEventListener("accordion:toggle", update);
        window.removeEventListener("load", update);
        instance.destroy(true);
      };
    });
  });
});
