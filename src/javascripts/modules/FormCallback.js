export default class JotformCallback {
  constructor(el) {
    this.el = el

	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Request a call back","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"contactNumber","qid":"4","subLabel":"","text":"Contact number","type":"control_textbox"},null,null,{"description":"","name":"terms","qid":"7","text":"Terms","type":"control_checkbox"},{"description":"","name":"date8","qid":"8","subLabel":"dd-mm-yyyy","text":"Date","type":"control_textbox"},{"description":"","name":"timeOf","qid":"9","subLabel":"","text":"Time of day","type":"control_dropdown"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Request a call back","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"name","qid":"3","subLabel":"","text":"Name","type":"control_textbox"},{"description":"","name":"contactNumber","qid":"4","subLabel":"","text":"Contact number","type":"control_textbox"},null,null,{"description":"","name":"terms","qid":"7","text":"Terms","type":"control_checkbox"},{"description":"","name":"date8","qid":"8","subLabel":"dd-mm-yyyy","text":"Date","type":"control_textbox"},{"description":"","name":"timeOf","qid":"9","subLabel":"","text":"Time of day","type":"control_dropdown"}]);}, 20);
  }
}