/**
 * This controls the opening of the nav, the scroll revealing of the nav
 * the nav accordions and the search
 */

import { HTML, BODY, WINDOW, BREAKPOINTS } from "../utilities/env";
import { getDimensions } from "../utilities/helpers";
import "../utilities/events";

export default class Header {
  constructor(el) {
    this.el = el;

    // Used to stop the functionality for the nav etc firing
    this.headerSimple = el.getAttribute("data-header-simple");

    // Selectors
    this.navToggle = el.querySelector("[data-nav-toggle]");
    this.navContainer = el.querySelector("[data-nav-container]");
    this.nav = el.querySelector("[data-nav]");
    this.navOverlayClose = el.querySelector("[data-nav-close]");
    this.navAccordions = Array.from(
      el.querySelectorAll("[data-nav-accordion]")
    );
    this.searchToggles = Array.from(
      el.querySelectorAll("[data-search-toggle]")
    );
    this.searchContainer = el.querySelector("[data-search]");
    this.searchToggle = el.querySelector("[data-search-toggle]");

    if (!this.headerSimple) {
      this.searchInput = this.searchContainer.querySelector(
        ".c-search__input input"
      );
    }

    this.navOpenState = "CLOSED";
    this.searchOpenState = "CLOSED";

    // Scroll specific
    this.navHeight = 72;
    this.lastScrollTop = WINDOW.pageYOffset || BODY.scrollTop || 0;
    this.scrollHandler = this.scrolled.bind(this);

    this.resizeHandler();
    this.init();
  }

  init() {
    if (!this.headerSimple) {
      this.navToggle.addEventListener("click", () => this.handleNavToggle());

      // Close the nav when the overlay is clicked
      this.navOverlayClose.addEventListener("click", () =>
        this.handleNavToggle()
      );

      this.navAccordions.forEach(el => {
        el
          .querySelector("[data-nav-accordion-toggle]")
          .addEventListener("click", e => this.handleNavAccordionToggle(el, e));
      });

      this.searchToggles.forEach(el => {
        el.addEventListener("click", () => this.handleSearchToggle());
      });
    }

    WINDOW.addEventListener("resize.throttled", e => {
      this.resizeHandler(e);
    });
  }

  handleNavToggle() {
    switch (this.navOpenState) {
      case "OPEN":
        return this.closeNav();
      default:
        return this.openNav();
    }
  }

  handleNavAccordionToggle(navAccordion, e) {
    const isActive = "is-active";
    const pageDimensions = getDimensions();
    const width = pageDimensions.dimensions
      ? pageDimensions.dimensions.width
      : pageDimensions.width;

    // Make link open the accordion, we add an overview parent link to
    // the list on mobile
    if (width < BREAKPOINTS.desktop) {
      e.preventDefault();
    }

    this.navAccordions.forEach(el => {
      // Close if not the one you clicked
      if (el !== navAccordion) {
        return (
          el.classList.remove(isActive),
          el
            .querySelector("[data-nav-accordion-toggle]")
            .setAttribute("aria-expanded", false)
        );
      }

      // Close if you clicked the same one again
      if (navAccordion.classList.contains(isActive)) {
        return (
          navAccordion.classList.remove(isActive),
          el
            .querySelector("[data-nav-accordion-toggle]")
            .setAttribute("aria-expanded", false)
        );
      }

      // Otherwise open the clicked accordion
      return (
        navAccordion.classList.add(isActive),
        el
          .querySelector("[data-nav-accordion-toggle]")
          .setAttribute("aria-expanded", true)
      );
    });
  }

  handleSearchToggle() {
    switch (this.searchOpenState) {
      case "OPEN":
        return this.closeSearch();
      default:
        return this.openSearch();
    }
  }

  openNav() {
    HTML.classList.add("nav-is-active");
    this.navContainer.classList.add("is-active");
    this.navOpenState = "OPEN";

    this.navToggle.setAttribute("aria-expanded", true);
  }

  closeNav() {
    HTML.classList.remove("nav-is-active");
    this.navContainer.classList.remove("is-active");
    this.navOpenState = "CLOSED";

    this.navToggle.setAttribute("aria-expanded", false);
  }

  openSearch() {
    this.searchContainer.classList.add("is-active");
    this.searchOpenState = "OPEN";
    this.searchInput.focus();

    this.searchToggle.setAttribute("aria-expanded", true);

    // added to focus input after css transition end
    /* From Modernizr */
    function whichTransitionEvent(){
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

    /* Listen for a transition! */
    var transitionEvent = whichTransitionEvent();
    var searchInput = document.getElementById('s');
    transitionEvent && this.searchToggle.addEventListener(transitionEvent, function() {
      searchInput.focus();
    });
  }

  closeSearch() {
    this.searchContainer.classList.remove("is-active");
    this.searchOpenState = "CLOSED";

    this.searchToggle.setAttribute("aria-expanded", false);
  }

  /**
   * Header show/hide on scroll
   */

  reset() {
    this.el.classList.remove("is-hidden", "is-visible");
  }

  hide() {
    this.el.classList.remove("is-visible");
    this.el.classList.add("is-hidden");
  }

  show() {
    this.el.classList.remove("is-hidden");
    this.el.classList.add("is-visible");
  }

  scrolled() {
    const scroll = WINDOW.pageYOffset || BODY.scrollTop || 0;

    if (this.navOpenState === "OPEN" || this.searchOpenState === "OPEN") return;

    // if we are at the top, show navbar
    if (scroll <= 0) {
      this.reset();
    } else if (
      // if going down, and past navbar, hide navbar
      scroll > this.lastScrollTop &&
      scroll > this.navHeight
    ) {
      this.hide();
    } else if (scroll < this.lastScrollTop) {
      // if going up, show navbar
      this.show();
    }

    this.lastScrollTop = scroll;
  }

  resizeHandler(e = getDimensions()) {
    const width = e.dimensions ? e.dimensions.width : e.width;

    if (width > BREAKPOINTS.desktop) {
      WINDOW.addEventListener("scroll", this.scrollHandler);
    }
  }
}
