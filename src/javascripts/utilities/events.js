import { debounce, throttle } from "lodash";

import { BODY, WINDOW } from "./env";
import { getDimensions } from "./helpers";

const events = require("dom-events");

/* eslint-disable */
const listeners = {
  scroll: {
    throttled: throttle(function() {
      events.emit(WINDOW, "scroll.throttled", {
        scroll: WINDOW.pageYOffset || BODY.scrollTop || 0,
        dimensions: getDimensions(),
      });
    }, 100),

    debounced: debounce(function() {
      events.emit(WINDOW, "scroll.debounced", {
        scroll: WINDOW.pageYOffset || BODY.scrollTop || 0,
        dimensions: getDimensions(),
      });
    }, 100),
  },

  resize: {
    throttled: throttle(function() {
      events.emit(WINDOW, "resize.throttled", {
        scroll: WINDOW.pageYOffset || BODY.scrollTop || 0,
        dimensions: getDimensions(),
      });
    }, 50),

    throttledLazy: throttle(function() {
      events.emit(WINDOW, "resize.throttled.lazy", {
        scroll: WINDOW.pageYOffset || BODY.scrollTop || 0,
        dimensions: getDimensions(),
      });
    }, 150),

    debounced: debounce(function() {
      events.emit(WINDOW, "resize.debounced", {
        scroll: WINDOW.pageYOffset || BODY.scrollTop || 0,
        dimensions: getDimensions(),
      });
    }, 100),

    debouncedLazy: debounce(function() {
      events.emit(WINDOW, "resize.debounced.lazy", {
        scroll: WINDOW.pageYOffset || BODY.scrollTop || 0,
        dimensions: getDimensions(),
      });
    }, 300),
  },
};

// attach a listener to `WINDOW.onscroll`
events.on(WINDOW, "scroll", function(e) {
  Object.keys(listeners.scroll).forEach(function(key) {
    listeners.scroll[key]();
  });
});

// attach a listener to `WINDOW.onresize`
events.on(WINDOW, "resize", function(e) {
  Object.keys(listeners.resize).forEach(function(key) {
    listeners.resize[key]();
  });
});
/* eslint-enable */

/* Examples
===============================================================================
  const events = require('dom-events');
  events.on(window, 'resize.throttled', function(e) {
  events.on(window, 'resize.throttled.lazy', function(e) {
  events.on(window, 'resize.debounced', function(e) {
  events.on(window, 'resize.debounced.lazy', function(e) {
    // do some work that needs to happen at regular
    // intervals during continuous resize events
    console.log(e.dimensions);
    // => { height: 640, width: 900 }
  }
  events.on(window, 'scroll.throttled', function(e) {
  events.on(window, 'scroll.debounced', function(e) {
    // do some computationally expensive
    // calculation after scroll
    console.log(e.scroll);
    // => 416
  }
===============================================================================
*/
