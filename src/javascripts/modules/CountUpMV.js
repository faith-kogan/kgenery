import CountUp from "countup";

export default class CountUpMV {
  constructor(el) {
    this.el = el

    var options = {
    	useEasing: false,
    }
    
    var numAnim = new CountUp("counter-mv", 86000, 86544, 0, 90, options);
      if (!numAnim.error) {
          numAnim.start({
          	useEasing: false,
          });
      } else {
          console.error(numAnim.error);
      }
    }
}