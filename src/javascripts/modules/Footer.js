export default class Footer {
  constructor(el) {
    this.el = el;

    this.footerAccordions = Array.from(
      el.querySelectorAll("[data-footer-accordion]")
    );

    this.init();
  }

  init() {
    this.footerAccordions.forEach(el => {
      el
        .querySelector("[data-footer-accordion-toggle]")
        .addEventListener("click", () => this.handleAccordionToggle(el));
    });
  }

  handleAccordionToggle(footerAccordion) {
    const isActive = "is-active";

    this.footerAccordions.forEach(el => {
      // Close if not the one you clicked
      if (el !== footerAccordion) {
        return (
          el.classList.remove(isActive),
          el
            .querySelector("[data-footer-accordion-toggle]")
            .setAttribute("aria-expanded", false)
        );
      }

      // Close if you clicked the same one again
      if (footerAccordion.classList.contains(isActive)) {
        return (
          footerAccordion.classList.remove(isActive),
          footerAccordion
            .querySelector("[data-footer-accordion-toggle]")
            .setAttribute("aria-expanded", false)
        );
      }

      // Otherwise open the clicked accordion
      return (
        footerAccordion.classList.add(isActive),
        footerAccordion
          .querySelector("[data-footer-accordion-toggle]")
          .setAttribute("aria-expanded", true)
      );
    });
  }
}
