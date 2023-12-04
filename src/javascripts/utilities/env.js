export const HTML = document.getElementsByTagName("html")[0];
export const BODY = document.body || document.getElementsByTagName("body")[0];
export const WINDOW = window;

export const BREAKPOINTS = {
  mobile: 320,
  tablet: 767,
  desktop: 960,
  wide: 1440,
};

export const TRANSITION = {
  speed: 200,
  ease: "0.25, 0.01, 0.25, 1",
};

export default {
  HTML,
  BODY,
  WINDOW,
};
