/**
 * FAQs accordion
 *
 * Toggles an 'is-active' class on the dt element.
 *
 * Usage:
 * <dl class="c-faqs" data-module="Faqs">
 *  <dt data-faqs-toggle>Question...</dt>
 *  <dd>
 *     Answer...
 *  </dd>
 * </dl>
 */

import "../utilities/events";

export default class Faqs {
  constructor(el) {
    this.el = el;

    this.faqButtons = Array.from(el.querySelectorAll("[data-faqs-toggle]"));

    this.init();
  }

  init() {
    this.faqButtons.forEach(el => {
      el.addEventListener("click", e => this.handleAccordionToggle(el, e));
    });
  }

  handleAccordionToggle(button) {
    const isActive = "is-active";

    this.faqButtons.forEach(el => {
      // Close if not the one you clicked
      if (el !== button) {
        return (
          el.classList.remove(isActive), el.setAttribute("aria-expanded", false)
        );
      }

      // Close if you clicked the same one again
      if (button.classList.contains(isActive)) {
        return (
          button.classList.remove(isActive),
          button.setAttribute("aria-expanded", false)
        );
      }

      // Otherwise open the clicked accordion
      return (
        button.classList.add(isActive),
        button.setAttribute("aria-expanded", true)
      );
    });
  }
}
