export default class JotformBusinessQuote {
  constructor(el) {
    this.el = el
	
	JotForm.init(function(){ setTimeout(function() { $('input_7').hint('ex: myname@example.com'); }, 20); JotForm.clearFieldOnHide="disable"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Request Comparison","type":"control_head"},{"name":"submit","qid":"2","text":"Submit","type":"control_button"},{"name":"fullName","qid":"3","text":"Full Name","type":"control_textbox"},null,{"name":"phone","qid":"5","text":"Phone","type":"control_textbox"},{"name":"attachBill","qid":"6","text":"Attach bill","type":"control_fileupload"},{"name":"email7","qid":"7","subLabel":"","text":"E-mail","type":"control_email"},null,null,null,null,{"name":"businessName12","qid":"12","text":"Business name","type":"control_textbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Request Comparison","type":"control_head"},{"name":"submit","qid":"2","text":"Submit","type":"control_button"},{"name":"fullName","qid":"3","text":"Full Name","type":"control_textbox"},null,{"name":"phone","qid":"5","text":"Phone","type":"control_textbox"},{"name":"attachBill","qid":"6","text":"Attach bill","type":"control_fileupload"},{"name":"email7","qid":"7","subLabel":"","text":"E-mail","type":"control_email"},null,null,null,null,{"name":"businessName12","qid":"12","text":"Business name","type":"control_textbox"}]);}, 20);
  }
}
	