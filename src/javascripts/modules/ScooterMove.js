export default class ScooterMove {
  constructor(el) {
    this.el = el;

    this.scooter = el.querySelectorAll(".c-powershop-scooter"); // select scooter

    var scooter = this.scooter[0]; // easier variable

    scooter.addEventListener( "click", handleScooterClick ); // function on click

    function handleScooterClick() {
      scooter.classList.add("left-to-right");

      // new variable for left to right animation
      this.scooterLeftRight = el.querySelectorAll(".left-to-right");
      var scooterLeftRight = this.scooterLeftRight[0];

      scooterLeftRight.addEventListener("animationend", rightLeftListener);

      function rightLeftListener() {
        scooter.classList.remove("left-to-right");
        scooter.classList.add("right-to-left");

        // new variable for right to left animation
        this.scooterRightLeft = el.querySelectorAll(".right-to-left");
        var scooterRightLeft = this.scooterRightLeft[0];

        scooterRightLeft.addEventListener("animationend", leftRightListener);

        function leftRightListener() {
          scooter.classList.remove("right-to-left");
        }
      }
    }

    this.init();
  }

  init() {

  }
}