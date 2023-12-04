import React from "react";
import ReactDOM from "react-dom";

// View
import VEFSApp from "./views/VEFSApp";

export default class CalcAppWrapper {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init = () => {
    const render = (Component, mountNode) => {
      ReactDOM.render(<Component />, mountNode);
    };

    render(VEFSApp, this.el);

    if (module.hot) {
      module.hot.accept("./views/VEFSApp", () => {
        render(VEFSApp, this.el);
      });
    }
  };
}
