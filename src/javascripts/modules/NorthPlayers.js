import Cookies from "js-cookie";
export default class NorthPlayers {
  constructor(el) {
    this.el = el;

    this.playerRadios = Array.from(el.querySelectorAll("input.form-radio"));

    this.init();
  }

  init() {
    // cookie defaults
    function promoCookiePlayer() {
      Cookies.set('promo-terms-url', '/north-aflw-terms-and-conditions/');
    }
    promoCookiePlayer();

    this.playerRadios.forEach(el => {
      el.addEventListener("click", e => this.handleAccordionToggle(el, e));
    });
  }

  handleAccordionToggle(button) {

    const isActive = "is-active";

    var els = document.querySelectorAll('.form-radio-item');

    function removeClass() {
      for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('is-active')
      }
    }

    this.playerRadios.forEach(el => {
      removeClass();
      
      if (this.el.classList.contains(isActive)) {
        this.el.classList.remove(isActive);
      } else {
        this.el.classList.add(isActive);
      }

      Cookies.set('promo-id', el.dataset.promoid);
      Cookies.set('promo', el.dataset.promoname);
    });
  }
}