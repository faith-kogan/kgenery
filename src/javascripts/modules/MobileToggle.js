/**
 * Simple content toggle for tablet and mobile
 *
 * Toggles an 'u-show-height@mobile-and-tablet-only' class. You will still need to control this class with CSS.
 *
 * Usage:
 * <button data-showhide="filters" data-showhide-text="See less" data-showhide-original-text="See more">Show filters</button>
 *
 * <div data-showhide-id="filters">
 *   <h2>Toggled content here</h2>
 * </div>
 *
 * @TODO: Make more flexible to allow for multiple show hide on the page
 */

export default class MobileToggle {
  constructor(el) {
    this.el = el;

    this.button = this.el.querySelector("[data-showhide]");
    this.containerToHide = this.el.querySelector("[data-showhide-id]");

    this.init();
  }

  init() {
    this.button.addEventListener("click", e => this.handleToggle(e));
    this.containerToHide.classList.add("u-hide-height@mobile-and-tablet-only");
  }

  handleToggle(e) {
    e.preventDefault();
    const elementToToggleSelector = this.button.getAttribute("data-showhide");

    const $elementToToggle = this.el.querySelector(
      `[data-showhide-id='${elementToToggleSelector}']`
    );

    const originalText = this.button.getAttribute(
      "data-showhide-original-text"
    );

    const replacementText = this.button.getAttribute("data-showhide-text");

    this.button.textContent =
      this.button.textContent === originalText ? replacementText : originalText;

    // Currently will show via height toggle, may make this an option later
    $elementToToggle.classList.toggle("u-show-height@mobile-and-tablet-only");
  }
}
