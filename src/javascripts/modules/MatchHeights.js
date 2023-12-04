import $ from "jquery";
/* eslint-disable no-unused-vars */
import matchHeight from "jquery-match-height";
/* eslint-enable no-unused-vars */

export default class MatchHeights {
  constructor(el) {
    this.el = $(el);

    this.el.find("[data-match-height]").matchHeight();
  }
}
