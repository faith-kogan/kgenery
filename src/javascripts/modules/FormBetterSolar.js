export default class JotformCurbPower {
  constructor(el) {
    this.el = el

	JotForm.setConditions([{"action":[{"id":"action_1498461028046","visibility":"ShowMultiple","isError":false,"fields":["30","29"]}],"id":"1498461208782","index":"0","link":"Any","priority":"0","terms":[{"id":"term_1498461028046","field":"51","operator":"notEquals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_1498460819778","visibility":"Show","isError":false,"field":"51"}],"id":"1498460838777","index":"1","link":"Any","priority":"1","terms":[{"id":"term_1498460819778","field":"13","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_1496310698641","visibility":"Hide","isError":false,"field":"36"}],"id":"1496310769177","index":"2","link":"Any","priority":"2","terms":[{"id":"term_1496310698641","field":"29","operator":"equals","value":"Residential","isError":false}],"type":"field"},{"action":[{"id":"action_1496279865156","visibility":"Show","isError":false,"field":"42"}],"id":"1496279894417","index":"3","link":"Any","priority":"3","terms":[{"id":"term_1496279865156","field":"41","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_0_1496283090768","visibility":"Show","isError":false,"field":"40"}],"id":"1496276380797","index":"4","link":"Any","priority":"4","terms":[{"id":"term_0_1496283090768","field":"37","operator":"isFilled","value":"","isError":false}],"type":"field"},{"action":[{"id":"action_0_1496276332710","visibility":"Show","isError":false,"field":"37"}],"id":"1496276318126","index":"5","link":"Any","priority":"5","terms":[{"id":"term_0_1496276332710","field":"36","operator":"equals","value":"No","isError":false}],"type":"field"},{"action":[{"id":"action_0_1497410196759","isError":false,"visibility":"Show","field":"44"},{"id":"action_1_1497410196759","visibility":"HideMultiple","isError":false,"fields":["45","46"]}],"id":"1496275204653","index":"6","link":"Any","priority":"6","terms":[{"id":"term_0_1497410196759","field":"29","operator":"equals","value":"Residential","isError":false}],"type":"field"},{"action":[{"id":"action_1496379396261","visibility":"ShowMultiple","isError":false,"fields":["45","36"]}],"id":"1496275228599","index":"7","link":"Any","priority":"7","terms":[{"id":"term_0_1496379392125","field":"29","operator":"equals","value":"Business","isError":false}],"type":"field"},{"action":[{"id":"action_0_1496275773205","visibility":"Show","isError":false,"field":"46"}],"id":"1496275262035","index":"8","link":"Any","priority":"8","terms":[{"id":"term_0_1496275773204","field":"45","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_0_1502671750053","visibility":"ShowMultiple","isError":false,"fields":["51"]}],"id":"1494814576041","index":"9","link":"Any","priority":"9","terms":[{"id":"term_0_1502671750053","field":"13","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_0_1497520242949","visibility":"ShowMultiple","isError":false,"fields":["25"]}],"id":"1494814599555","index":"10","link":"Any","priority":"10","terms":[{"id":"term_0_1497520242949","field":"13","operator":"equals","value":"No","isError":false}],"type":"field"}]); JotForm.init(function(){ JotForm.clearFieldOnHide="disable"; /*INIT-END*/
	}); JotForm.prepareCalculationsOnTheFly([null,{"name":"solarAdvisory1","qid":"1","text":"Solar Advisory Service: Expression of Interest ","type":"control_head"},{"name":"submitForm","qid":"2","text":"Submit Form","type":"control_button"},null,null,null,null,null,null,null,null,null,null,{"description":"","name":"areYou","qid":"13","text":"Are you an existing Powershop customer?","type":"control_radio"},null,null,null,null,null,null,null,{"description":"","name":"name","qid":"21","text":"Name","type":"control_fullname"},null,{"description":"","name":"bestContact","qid":"23","subLabel":"","text":"Best contact number","type":"control_textbox"},null,{"description":"","name":"attachYour25","qid":"25","subLabel":"","text":"Attach your latest electricity bill","type":"control_fileupload"},{"name":"section1","qid":"26","text":"About You","type":"control_head"},{"name":"section2","qid":"27","text":"About Your Property ","type":"control_head"},null,{"description":"","name":"isThe","qid":"29","text":"Is the address a Residential or Business address?","type":"control_radio"},{"description":"","name":"enterThe30","qid":"30","text":"Enter the address where you are looking to install solar","type":"control_address"},null,null,{"name":"section3","qid":"33","text":"About Your Solar Installation","type":"control_head"},{"description":"","name":"areYou34","qid":"34","text":"Are you considering installing solar panels within the next:","type":"control_radio"},{"description":"","name":"whatIs","qid":"35","text":"What is the main reason for you wanting to install solar panels?","type":"control_radio"},{"description":"","name":"areYou36","qid":"36","text":"Are you the main decision maker on whether solar panels are installed or not?","type":"control_radio"},{"description":"","name":"pleaseAdd","qid":"37","text":"Please add their details below:","type":"control_fullname"},null,null,{"description":"","name":"hasThe","qid":"40","text":"Has the person you listed above agreed to you entering their name?","type":"control_radio"},{"description":"","name":"haveYou","qid":"41","text":"Have you previously looked into installing solar panels at this address in the past?","type":"control_radio"},{"description":"","name":"selectThe","qid":"42","text":"Select the reason(s) why you didn&#039;t install solar at this address in the past","type":"control_checkbox"},{"description":"","name":"additionalComments","qid":"43","subLabel":"","text":"Let us know what we can do to improve this form","type":"control_textarea"},{"description":"","name":"doYou44","qid":"44","text":"Do you rent or own this property?","type":"control_radio"},{"description":"","name":"doYou45","qid":"45","text":"Do you lease this property?","type":"control_radio"},{"description":"","name":"approxHow","qid":"46","subLabel":"","text":"Approx. how long do you have left on your lease (years)?","type":"control_textbox"},{"description":"","name":"input47","qid":"47","text":"","type":"control_checkbox"},null,null,{"description":"","name":"email","qid":"50","subLabel":"","text":"E-mail","type":"control_email"},{"description":"","name":"areYou51","qid":"51","text":"Are you looking to install solar at the property registered to your Powershop account?","type":"control_radio"},{"description":"","name":"iAm","qid":"52","text":"I am looking to install","type":"control_checkbox"}]); setTimeout(function() {
	JotForm.paymentExtrasOnTheFly([null,{"name":"solarAdvisory1","qid":"1","text":"Solar Advisory Service: Expression of Interest ","type":"control_head"},{"name":"submitForm","qid":"2","text":"Submit Form","type":"control_button"},null,null,null,null,null,null,null,null,null,null,{"description":"","name":"areYou","qid":"13","text":"Are you an existing Powershop customer?","type":"control_radio"},null,null,null,null,null,null,null,{"description":"","name":"name","qid":"21","text":"Name","type":"control_fullname"},null,{"description":"","name":"bestContact","qid":"23","subLabel":"","text":"Best contact number","type":"control_textbox"},null,{"description":"","name":"attachYour25","qid":"25","subLabel":"","text":"Attach your latest electricity bill","type":"control_fileupload"},{"name":"section1","qid":"26","text":"About You","type":"control_head"},{"name":"section2","qid":"27","text":"About Your Property ","type":"control_head"},null,{"description":"","name":"isThe","qid":"29","text":"Is the address a Residential or Business address?","type":"control_radio"},{"description":"","name":"enterThe30","qid":"30","text":"Enter the address where you are looking to install solar","type":"control_address"},null,null,{"name":"section3","qid":"33","text":"About Your Solar Installation","type":"control_head"},{"description":"","name":"areYou34","qid":"34","text":"Are you considering installing solar panels within the next:","type":"control_radio"},{"description":"","name":"whatIs","qid":"35","text":"What is the main reason for you wanting to install solar panels?","type":"control_radio"},{"description":"","name":"areYou36","qid":"36","text":"Are you the main decision maker on whether solar panels are installed or not?","type":"control_radio"},{"description":"","name":"pleaseAdd","qid":"37","text":"Please add their details below:","type":"control_fullname"},null,null,{"description":"","name":"hasThe","qid":"40","text":"Has the person you listed above agreed to you entering their name?","type":"control_radio"},{"description":"","name":"haveYou","qid":"41","text":"Have you previously looked into installing solar panels at this address in the past?","type":"control_radio"},{"description":"","name":"selectThe","qid":"42","text":"Select the reason(s) why you didn&#039;t install solar at this address in the past","type":"control_checkbox"},{"description":"","name":"additionalComments","qid":"43","subLabel":"","text":"Let us know what we can do to improve this form","type":"control_textarea"},{"description":"","name":"doYou44","qid":"44","text":"Do you rent or own this property?","type":"control_radio"},{"description":"","name":"doYou45","qid":"45","text":"Do you lease this property?","type":"control_radio"},{"description":"","name":"approxHow","qid":"46","subLabel":"","text":"Approx. how long do you have left on your lease (years)?","type":"control_textbox"},{"description":"","name":"input47","qid":"47","text":"","type":"control_checkbox"},null,null,{"description":"","name":"email","qid":"50","subLabel":"","text":"E-mail","type":"control_email"},{"description":"","name":"areYou51","qid":"51","text":"Are you looking to install solar at the property registered to your Powershop account?","type":"control_radio"},{"description":"","name":"iAm","qid":"52","text":"I am looking to install","type":"control_checkbox"}]);}, 20);
  }
}