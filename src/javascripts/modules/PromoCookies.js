import Cookies from "js-cookie";

export default class PromoCookies {
  constructor(el) {
    this.el = el;

    // Grab the promo values from the data attributes
    this.promoName = this.el.dataset.promoname;
    this.promoId = this.el.dataset.promoid;
    this.promoIdLite = this.el.dataset.promoidlite;
    this.promoTermsUrl = this.el.dataset.promotermsurl;
    this.promoExpires = new Date(this.el.dataset.promoexpires);
    this.promoRedirect = this.el.dataset.promoredirect;

    // Put cookie items in an array so we can loop over them
    this.promoCookies = [
      {
        name: "promo",
        value: this.promoName,
      },
      {
        name: "promo-id",
        value: this.promoId,
      },
      {
        name: "promo-id-lite",
        value: this.promoIdLite,
      },
      {
        name: "promo-terms-url",
        value: this.promoTermsUrl,
      },
    ];

    this.init();
  }

  init = () => {
    this.promoCookies.map(cookie =>
      Cookies.set(cookie.name, cookie.value, {
        expires: this.promoExpires,
      })
    );

    if (this.promoRedirect) {
      window.location = this.promoRedirect;
    }
  };
}
