import intl from "./scripts/intl";
import "./scripts/loader";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("intl-loaded", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("opacity-0");
      setTimeout(() => {
        loader.remove();
      }, 400);
    }
  });

  intl.initialize();
});
