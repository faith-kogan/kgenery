export default class JotformSolarLead {
  constructor(el) {
    this.el = el
	
	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"solarPage","qid":"1","text":"Solar page callback","type":"control_head"},{"name":"send","qid":"2","text":"Send","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"contactNumber","qid":"4","subLabel":"","text":"Contact number","type":"control_textbox"},{"description":"","name":"email","qid":"5","subLabel":"","text":"Email","type":"control_email"},{"description":"","name":"iAgree","qid":"6","text":"I agree","type":"control_checkbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"solarPage","qid":"1","text":"Solar page callback","type":"control_head"},{"name":"send","qid":"2","text":"Send","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"contactNumber","qid":"4","subLabel":"","text":"Contact number","type":"control_textbox"},{"description":"","name":"email","qid":"5","subLabel":"","text":"Email","type":"control_email"},{"description":"","name":"iAgree","qid":"6","text":"I agree","type":"control_checkbox"}]);}, 20);
  }
}