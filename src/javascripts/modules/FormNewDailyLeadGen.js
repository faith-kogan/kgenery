export default class JotformNewDaily {
  constructor(el) {
    this.el = el

	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"theNew","qid":"1","text":"The New Daily","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"yourEmail","qid":"3","subLabel":"","text":"Your email","type":"control_email"},{"description":"","name":"yourName","qid":"4","subLabel":"","text":"Your name","type":"control_textbox"},null,{"description":"","name":"contactNumber6","qid":"6","subLabel":"","text":"Contact number","type":"control_textbox"},{"description":"","name":"preferredContact","qid":"7","subLabel":"Please add date and time so we know when to call","text":"Preferred contact time","type":"control_textbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"theNew","qid":"1","text":"The New Daily","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"yourEmail","qid":"3","subLabel":"","text":"Your email","type":"control_email"},{"description":"","name":"yourName","qid":"4","subLabel":"","text":"Your name","type":"control_textbox"},null,{"description":"","name":"contactNumber6","qid":"6","subLabel":"","text":"Contact number","type":"control_textbox"},{"description":"","name":"preferredContact","qid":"7","subLabel":"Please add date and time so we know when to call","text":"Preferred contact time","type":"control_textbox"}]);}, 20);

  }
}