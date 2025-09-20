document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-videos-slider"));
  elements.forEach((element) => {
    const container = element.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      speed: 600,
      spaceBetween: 24,
      // autoHeight: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: element.querySelector(
          ".account__usage-manual-videos-slider-pagination"
        ),
        clickable: true,
      },
    });
  });
});
