export default class JotformElectricVehicles {
  constructor(el) {
    this.el = el

    // jotform script
    JotForm.setConditions([{"action":[{"id":"action_1557449416486","visibility":"Show","isError":false,"field":"16"}],"id":"1557449427621","index":"0","link":"Any","priority":"0","terms":[{"id":"term_1557449416486","field":"15","operator":"equals","value":"No","isError":false}],"type":"field"}]); JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/ }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Electric vehicles","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"areYou","qid":"3","text":"Are you a Powershop customer?","type":"control_radio"},{"description":"","name":"whatIs","qid":"4","subLabel":"This is an 11 or 12 digit number","text":"What is your NMI?","type":"control_textbox"},{"description":"","name":"firstName","qid":"5","subLabel":"","text":"First name","type":"control_textbox"},{"description":"","name":"lastName","qid":"6","subLabel":"","text":"Last name","type":"control_textbox"},null,{"description":"","name":"doYou","qid":"8","text":"Do you privately own an electric vehicle?","type":"control_radio"},{"description":"","name":"isYour9","qid":"9","text":"Is your electric vehicle registered to the same address as the NMI above?","type":"control_radio"},{"description":"","name":"registrationNumber","qid":"10","subLabel":"","text":"Registration number","type":"control_textbox"},{"description":"","name":"vehicleMake","qid":"11","subLabel":"","text":"Vehicle make","type":"control_textbox"},{"description":"","name":"vehicleModel","qid":"12","subLabel":"","text":"Vehicle model","type":"control_textbox"},{"description":"","name":"doYou13","qid":"13","text":"Do you have a smart meter?","type":"control_radio"},{"name":"clickTo","qid":"14","text":"Sorry, you need a smart meter to submit this form.\nClick here to an apply for a smart meter intallation.","type":"control_text"},{"description":"","name":"doYou15","qid":"15","text":"Do you have a Time of Use tariff?","type":"control_radio"},{"description":"","name":"doYou16","qid":"16","text":"Do you give Powershop permission to contact your distributor to change your tariff to a Time of Use tariff? Accepting confirms you understand that your tariff cannot be switched back to a Single Rate tariff for a period of at least12 months unless your distributor confirms otherwise.","type":"control_checkbox"},{"description":"","name":"state","qid":"17","text":"State","type":"control_radio"},{"description":"","name":"yourEmail","qid":"18","subLabel":"example@example.com","text":"Your email","type":"control_email"},{"description":"","name":"contactNumber","qid":"19","subLabel":"","text":"Contact number","type":"control_textbox"},{"name":"clickTo20","qid":"20","text":"Sorry, you need to own an electric vehicle to continue with this form.","type":"control_text"},{"name":"sorryYou","qid":"21","text":"Sorry, you need to to be a Powershop customer to continue with this form.\nJoin now","type":"control_text"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Electric vehicles","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"areYou","qid":"3","text":"Are you a Powershop customer?","type":"control_radio"},{"description":"","name":"whatIs","qid":"4","subLabel":"This is an 11 or 12 digit number","text":"What is your NMI?","type":"control_textbox"},{"description":"","name":"firstName","qid":"5","subLabel":"","text":"First name","type":"control_textbox"},{"description":"","name":"lastName","qid":"6","subLabel":"","text":"Last name","type":"control_textbox"},null,{"description":"","name":"doYou","qid":"8","text":"Do you privately own an electric vehicle?","type":"control_radio"},{"description":"","name":"isYour9","qid":"9","text":"Is your electric vehicle registered to the same address as the NMI above?","type":"control_radio"},{"description":"","name":"registrationNumber","qid":"10","subLabel":"","text":"Registration number","type":"control_textbox"},{"description":"","name":"vehicleMake","qid":"11","subLabel":"","text":"Vehicle make","type":"control_textbox"},{"description":"","name":"vehicleModel","qid":"12","subLabel":"","text":"Vehicle model","type":"control_textbox"},{"description":"","name":"doYou13","qid":"13","text":"Do you have a smart meter?","type":"control_radio"},{"name":"clickTo","qid":"14","text":"Sorry, you need a smart meter to submit this form.\nClick here to an apply for a smart meter intallation.","type":"control_text"},{"description":"","name":"doYou15","qid":"15","text":"Do you have a Time of Use tariff?","type":"control_radio"},{"description":"","name":"doYou16","qid":"16","text":"Do you give Powershop permission to contact your distributor to change your tariff to a Time of Use tariff? Accepting confirms you understand that your tariff cannot be switched back to a Single Rate tariff for a period of at least12 months unless your distributor confirms otherwise.","type":"control_checkbox"},{"description":"","name":"state","qid":"17","text":"State","type":"control_radio"},{"description":"","name":"yourEmail","qid":"18","subLabel":"example@example.com","text":"Your email","type":"control_email"},{"description":"","name":"contactNumber","qid":"19","subLabel":"","text":"Contact number","type":"control_textbox"},{"name":"clickTo20","qid":"20","text":"Sorry, you need to own an electric vehicle to continue with this form.","type":"control_text"},{"name":"sorryYou","qid":"21","text":"Sorry, you need to to be a Powershop customer to continue with this form.\nJoin now","type":"control_text"}]);}, 20);

    // the hidden form
    this.$form = document.querySelector(".page-section");

    // hide class
    this.hideClass = 'u-hidden-visually';

    // condition explainers
    this.explain1 = document.querySelector('.condition-1-no');
    this.explain2 = document.querySelector('.condition-2-no');
    this.explain3 = document.querySelector('.condition-3-no');

    // q1
    this.radiosQ1 = Array.from(el.querySelectorAll('.conditional-question-1 .c-radio__input')); // select all radios
    this.q1Yes = document.querySelector(".conditional-question-1 .radio-yes");
    this.q1No = document.querySelector(".conditional-question-1 .radio-no");

    // q2
    this.q2 = document.querySelector('.conditional-question-2'); // question 2
    this.radiosQ2 = Array.from(el.querySelectorAll('.conditional-question-2 .c-radio__input')); // select all radios
    this.q2Yes = document.querySelector(".conditional-question-2 .radio-yes");
    this.q2No = document.querySelector(".conditional-question-2 .radio-no");

    // q3
    this.q3 = document.querySelector('.conditional-question-3'); // question 3
    this.radiosQ3 = Array.from(el.querySelectorAll('.conditional-question-3 .c-radio__input')); // select all radios
    this.q3Yes = document.querySelector(".conditional-question-3 .radio-yes");
    this.q3No = document.querySelector(".conditional-question-3 .radio-no");

    

    this.init();
  }

  init() {
    
    this.radiosQ1.forEach(el => {
      el.addEventListener("change", e => this.handleRadioCheck1(el, e));
    });
    

    this.radiosQ2.forEach(el => {
      el.addEventListener("change", e => this.handleRadioCheck2(el, e));
    });

    this.radiosQ3.forEach(el => {
      el.addEventListener("change", e => this.handleRadioCheck3(el, e));
    });
  }

  // question 1 function
  handleRadioCheck1() {
    if (this.q1Yes.checked) {
      this.q2.classList.remove(this.hideClass);
      this.radiosQ2.value = false;
      this.radiosQ2.checked = false;
      // uncheck others
      this.radiosQ2.forEach(el => {el.checked = false;});
      this.radiosQ3.forEach(el => {el.checked = false;});
      this.explain1.classList.add(this.hideClass);
      this.explain2.classList.add(this.hideClass);
      this.explain3.classList.add(this.hideClass);
    }

    if (this.q1No.checked) {
      this.q2.classList.add(this.hideClass);
      this.q3.classList.add(this.hideClass);
      this.$form.classList.add(this.hideClass);
      // uncheck others
      this.radiosQ2.forEach(el => {el.checked = false;});
      this.radiosQ3.forEach(el => {el.checked = false;});
      this.explain1.classList.remove(this.hideClass);
      this.explain2.classList.add(this.hideClass);
      this.explain3.classList.add(this.hideClass);
    }
  }

  // question 2 function
  handleRadioCheck2() {
    if (this.q2Yes.checked) {
      this.q3.classList.remove(this.hideClass);
      // uncheck others
      this.radiosQ3.forEach(el => {el.checked = false;});
      this.explain2.classList.add(this.hideClass);
      this.explain3.classList.add(this.hideClass);
    }

    if (this.q2No.checked) {
      this.q3.classList.add(this.hideClass);
      this.$form.classList.add(this.hideClass);
      // uncheck others
      this.radiosQ3.forEach(el => {el.checked = false;});
      this.explain2.classList.remove(this.hideClass);
      this.explain3.classList.add(this.hideClass);
    }
  }

  // question 3 function
  handleRadioCheck3() {
    if (this.q3Yes.checked) {
      this.$form.classList.remove(this.hideClass);
      this.explain3.classList.add(this.hideClass);
    }

    if (this.q3No.checked) {
      this.$form.classList.add(this.hideClass);
      this.explain3.classList.remove(this.hideClass);
    }
  }
}