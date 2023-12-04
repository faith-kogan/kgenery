import $ from "jquery";
/* eslint-disable no-unused-vars */
import tooltipster from "tooltipster";

export default class Tooltips {
  constructor(el) {
    this.el = $(el);

    $('.c-tooltip__ps').each(function() {
      $(this).tooltipster({
        arrow: true,
        theme: ["tooltipster-light", "tooltipster-light-customized"],
        delay: 100,
        distance: 30,
        contentAsHTML: true,
        trigger: 'custom',

        triggerOpen: {
            touchstart: true
        },
        triggerClose: {
            tap: true
        }
      });

      $(this).focus(function() {
        $(this).tooltipster('open');
      });

      $(this).blur(function() {
        $(this).tooltipster('close');
      });
    });
  }
}