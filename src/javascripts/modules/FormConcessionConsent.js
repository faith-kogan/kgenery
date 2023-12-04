export default class JotformConcessionConsent {

  constructor(el) {
    this.el = el

	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Concession consent","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"customerId","qid":"3","subLabel":"","text":"Customer ID","type":"control_textbox"},{"description":"","name":"iConfirm","qid":"4","text":"I confirm","type":"control_checkbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Concession consent","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"customerId","qid":"3","subLabel":"","text":"Customer ID","type":"control_textbox"},{"description":"","name":"iConfirm","qid":"4","text":"I confirm","type":"control_checkbox"}]);}, 20);

	this.init();
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('input_3').value = urlParams.get('uid');

    if (window.location.href.indexOf('?') > -1) {
      history.pushState('', document.title, window.location.pathname);
    }
  }	
}