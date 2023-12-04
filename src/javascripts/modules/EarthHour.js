export default class EarthHour {
  constructor(el) {
    this.el = el;

    this.el
      .querySelector(".earth-hour-button")
      .addEventListener("click", () => this.handleConfettiToggle());
  
    this.init();
  }

  init() {
    const pageBody = document.querySelector("body") // page body
    pageBody.classList.add('c-earth-hour');
    pageBody.classList.add('c-earth-hour--on');
  }

  handleConfettiToggle() {

    const pageBody = document.querySelector("body") // page body
    const isActive = "c-earth-hour--on";
    const turnOn = "Lights on";
    const turnOff = "Lights off";

    var buttonToggle = this.el.querySelector(".earth-hour-button");

    if (pageBody.classList.contains(isActive)) {
      pageBody.classList.remove(isActive);
      buttonToggle.innerHTML = turnOff;
    } else {
      pageBody.classList.add(isActive);
      buttonToggle.innerHTML = turnOn;
    }
  }
}