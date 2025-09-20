document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-video-tabs"));
  elements.forEach((element) => {
    const items = Array.from(
      element.querySelectorAll(".account__usage-manual-videos-tabs-item")
    );
    const links = Array.from(
      element.querySelectorAll(".account__usage-manual-videos-nav-link")
    );

    const setActiveItem = (index) => {
      items.forEach((item) => item.classList.remove("active"));
      links.forEach((link) => link.classList.remove("active"));
      items[index]?.classList.add("active");
      links[index]?.classList.add("active");
    };

    setActiveItem(0);

    links.forEach((link, linkIndex) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveItem(linkIndex);
      });
    });
  });
});
