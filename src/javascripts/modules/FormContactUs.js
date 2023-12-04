export default class JotformContactUs {
  constructor(el) {
    this.el = el

	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Contact us page","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"email","qid":"4","subLabel":"example@example.com","text":"Email","type":"control_email"},{"description":"","name":"comments","qid":"5","subLabel":"","text":"Comments","type":"control_textarea"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Contact us page","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"email","qid":"4","subLabel":"example@example.com","text":"Email","type":"control_email"},{"description":"","name":"comments","qid":"5","subLabel":"","text":"Comments","type":"control_textarea"}]);}, 20);
  }
}