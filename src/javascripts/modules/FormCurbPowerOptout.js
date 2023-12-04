export default class JotformCYPOptout {
  constructor(el) {
    this.el = el

    JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"optOut1","qid":"1","text":"Opt out below","type":"control_head"},{"name":"submit2","qid":"2","text":"Opt out","type":"control_button"},{"description":"","name":"mobileNumber3","qid":"3","subLabel":"the mobile number that received the message","text":"Mobile number (required)","type":"control_textbox"},null,{"description":"","name":"tellUs5","qid":"5","text":"Tell us why you're opting out (not required)","type":"control_radio"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"optOut1","qid":"1","text":"Opt out below","type":"control_head"},{"name":"submit2","qid":"2","text":"Opt out","type":"control_button"},{"description":"","name":"mobileNumber3","qid":"3","subLabel":"the mobile number that received the message","text":"Mobile number (required)","type":"control_textbox"},null,{"description":"","name":"tellUs5","qid":"5","text":"Tell us why you're opting out (not required)","type":"control_radio"}]);}, 20);
  }
}