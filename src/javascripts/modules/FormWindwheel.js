export default class JotformWindwheel {
  constructor(el) {
    this.el = el

    JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Wind Wheels: Name Your Turbine","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"email","qid":"4","subLabel":"example@example.com","text":"Email","type":"control_email"},{"description":"","name":"phoneNumber","qid":"5","subLabel":"","text":"Phone number","type":"control_textbox"},{"description":"","name":"areYou","qid":"6","text":"Are you an existing Powershop customer?","type":"control_radio"},{"description":"","name":"areYou7","qid":"7","text":"Are you a Museums Victoria member?","type":"control_radio"},{"description":"","name":"yourName","qid":"8","subLabel":"","text":"Your name for the real life wind turbine","type":"control_textbox"},{"description":"","name":"termsAnd","qid":"9","text":"Terms and conditions","type":"control_checkbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Wind Wheels: Name Your Turbine","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"email","qid":"4","subLabel":"example@example.com","text":"Email","type":"control_email"},{"description":"","name":"phoneNumber","qid":"5","subLabel":"","text":"Phone number","type":"control_textbox"},{"description":"","name":"areYou","qid":"6","text":"Are you an existing Powershop customer?","type":"control_radio"},{"description":"","name":"areYou7","qid":"7","text":"Are you a Museums Victoria member?","type":"control_radio"},{"description":"","name":"yourName","qid":"8","subLabel":"","text":"Your name for the real life wind turbine","type":"control_textbox"},{"description":"","name":"termsAnd","qid":"9","text":"Terms and conditions","type":"control_checkbox"}]);}, 20);
  }
}