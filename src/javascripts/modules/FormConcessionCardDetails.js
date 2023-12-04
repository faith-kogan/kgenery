export default class JotformConcessionCardDetails {
  constructor(el) {
    this.el = el

	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/ }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Concession details","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"yourPowershop","qid":"3","subLabel":"","text":"Your Powershop account number","type":"control_textbox"},{"description":"","name":"typeOf","qid":"4","text":"Type of card","type":"control_radio"},{"description":"","name":"customerReference","qid":"5","subLabel":"","text":"Customer Reference Number (CRN) or Department of Veterans Affairs (DVA) Number","type":"control_textbox"},{"description":"","name":"youAre","qid":"6","text":"You are the primary or secondary Powershop account holder","type":"control_radio"},{"description":"","name":"nameAs","qid":"7","subLabel":"","text":"Name as it appears on the concession card","type":"control_textbox"},null,null,null,{"description":"","name":"input11","qid":"11","text":"","type":"control_checkbox"},{"description":"","name":"enterThe","qid":"12","text":"Enter the message as it's shown","type":"control_captcha"},{"description":"","name":"startDate13","qid":"13","subLabel":"Concession card start date","text":"Start date","type":"control_textbox"},{"description":"","name":"expiryDate14","qid":"14","subLabel":"Concession card expiry date","text":"Expiry date","type":"control_textbox"},{"description":"","name":"dateOf15","qid":"15","subLabel":"Your date of birth","text":"Date of birth","type":"control_textbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Concession details","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"yourPowershop","qid":"3","subLabel":"","text":"Your Powershop account number","type":"control_textbox"},{"description":"","name":"typeOf","qid":"4","text":"Type of card","type":"control_radio"},{"description":"","name":"customerReference","qid":"5","subLabel":"","text":"Customer Reference Number (CRN) or Department of Veterans Affairs (DVA) Number","type":"control_textbox"},{"description":"","name":"youAre","qid":"6","text":"You are the primary or secondary Powershop account holder","type":"control_radio"},{"description":"","name":"nameAs","qid":"7","subLabel":"","text":"Name as it appears on the concession card","type":"control_textbox"},null,null,null,{"description":"","name":"input11","qid":"11","text":"","type":"control_checkbox"},{"description":"","name":"enterThe","qid":"12","text":"Enter the message as it's shown","type":"control_captcha"},{"description":"","name":"startDate13","qid":"13","subLabel":"Concession card start date","text":"Start date","type":"control_textbox"},{"description":"","name":"expiryDate14","qid":"14","subLabel":"Concession card expiry date","text":"Expiry date","type":"control_textbox"},{"description":"","name":"dateOf15","qid":"15","subLabel":"Your date of birth","text":"Date of birth","type":"control_textbox"}]);}, 20);
  }
}