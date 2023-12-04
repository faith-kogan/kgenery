/**
 * Uses https://github.com/Selz/plyr
 */

import Plyr from "plyr";

export default class Video {
  constructor(el) {
    this.el = el;

    this.init();
  }

  init() {
    const player = Plyr.setup("[data-video]", {
      hideControls: true,
    });
  }
}
