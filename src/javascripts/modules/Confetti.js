export default class Confetti {
  constructor(el) {
    this.el = el;

    this.el
      .querySelector(".confetti-button")
      .addEventListener("click", () => this.handleConfettiToggle());
  }

  handleConfettiToggle() {
    const isActive = "confetti-off";
    const turnOn = "Turn on confetti";
    const turnOff = "Turn off confetti";

    var buttonToggle = this.el.querySelector(".confetti-button");

    if (this.el.classList.contains(isActive)) {
      this.el.classList.remove(isActive);
      buttonToggle.innerHTML = turnOff;
    } else {
      this.el.classList.add(isActive);
      buttonToggle.innerHTML = turnOn;
    }
  }
}