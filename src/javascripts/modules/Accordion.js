export default class Accordion {
  constructor(el) {
    this.el = el;

    this.el
      .querySelector("[data-accordion-toggle]")
      .addEventListener("click", () => this.handleAccordionToggle());
  }

  handleAccordionToggle() {
    const isActive = "is-active";

    if (this.el.classList.contains(isActive)) {
      this.el.classList.remove(isActive);
      this.el.setAttribute("aria-expanded", false);
    } else {
      this.el.classList.add(isActive);
      this.el.setAttribute("aria-expanded", true);
    }
  }
}
