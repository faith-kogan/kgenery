//import "./FormLibraries";

export default class JotformSmartMeter {
  constructor(el) {
    this.el = el

    JotForm.setConditions([{"action":[{"id":"action_1530323012536","visibility":"Show","isError":false,"field":"35"}],"id":"1530323031097","index":"0","link":"Any","priority":"0","terms":[{"id":"term_1530323012536","field":"34","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_1530322978190","visibility":"Show","isError":false,"field":"68"}],"id":"1530323002339","index":"1","link":"Any","priority":"1","terms":[{"id":"term_1530322978190","field":"33","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_1530322938568","visibility":"Show","isError":false,"field":"87"}],"id":"1530322971553","index":"2","link":"Any","priority":"2","terms":[{"id":"term_1530322938568","field":"86","operator":"equals","value":"No","isError":false}],"type":"field"},{"action":[{"id":"action_1530322771811","visibility":"ShowMultiple","isError":false,"fields":["90","91"]}],"id":"1530322801913","index":"3","link":"Any","priority":"3","terms":[{"id":"term_1530322771811","field":"81","operator":"equals","value":"No","isError":false}],"type":"field"}]); JotForm.init(function(){ JotForm.calendarMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]; JotForm.calendarDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]; JotForm.calendarOther = {"today":"Today"}; var languageOptions = document.querySelectorAll('#langList li'); for(var langIndex = 0; langIndex < languageOptions.length; langIndex++) { languageOptions[langIndex].on('click', function(e) { setTimeout(function(){ JotForm.setCalendar("97", false, {"days":{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":false,"sunday":false},"future":true,"past":false,"custom":false,"ranges":false,"start":"","end":""}); }, 0); }); } JotForm.setCalendar("97", false, {"days":{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":false,"sunday":false},"future":true,"past":false,"custom":false,"ranges":false,"start":"","end":""}); JotForm.clearFieldOnHide="disable"; /*INIT-END*/ }); JotForm.prepareCalculationsOnTheFly([null,null,{"name":"submit","qid":"2","text":"Submit","type":"control_button"},null,null,null,null,null,null,null,{"name":"your1010","qid":"10","text":"Your 10 or 11 digit NMI (National Meter Identifier)","type":"control_textbox"},{"name":"doubleclickTo11","qid":"11","text":"Don't know what this is? It stands for National Meter Identifier and you can find it on your electicity bill.","type":"control_text"},null,null,null,null,null,null,null,null,{"name":"isThere20","qid":"20","text":"Is there mobile phone reception at the meter location?","type":"control_radio"},null,null,{"name":"areThere","qid":"23","text":"Are there any caution stickers warning of asbestos on or inside the meter board?","type":"control_radio"},null,null,null,null,null,{"name":"isThere","qid":"29","text":"Is there a lock on your meter box?","type":"control_radio"},{"name":"isYour","qid":"30","text":"Is your meter box under cover?","type":"control_radio"},null,null,{"name":"isThere33","qid":"33","text":"Is there life support in the house?","type":"control_radio"},{"name":"isThere34","qid":"34","text":"Is there any other equipment in the house that would be adversely affected by a power outage of 30 to 60 minutes? Consider things like security alarms and appliances on timers. If in doubt, give us a call. Note that some equipment or appliances may need re-commissioning after a power outage.","type":"control_radio"},{"name":"ifYes35","qid":"35","text":"(if yes) Please specify: ","type":"control_textbox"},null,null,null,null,null,null,null,null,null,null,{"name":"yourDetails","qid":"46","text":"Your details","type":"control_head"},null,{"name":"emailAddress","qid":"48","text":"Email address","type":"control_textbox"},{"name":"contactNumber","qid":"49","text":"Contact number","type":"control_textbox"},{"name":"yourMeter","qid":"50","text":"Your meter","type":"control_head"},{"name":"hazards","qid":"51","text":"Hazards &amp; access","type":"control_head"},null,null,null,null,null,null,{"name":"isIt","qid":"58","text":"Is it okay to pass on your personal details, relating ONLY to the installation and maintenance of this smart meter, to third party installers? This will include your name, property address and contact details.","type":"control_radio"},null,null,null,null,null,null,null,null,{"name":"disclaimerBy","qid":"67","text":"Disclaimer: By checking this box I agree and acknowledge that the Meter Installer owns, and is responsible for maintaining and repairing, my smart meter. I confirm that I will not deliberately damage or interfere with any metering equipment on my premises, in accordance with my obligations under NSW law. I will not hold Powershop or those acting on its behalf liable for any special, incidental, direct, indirect, or consequential loss or damage arising from and or in relation to the smart meter. ","type":"control_checkbox"},{"description":"","name":"ifYes","qid":"68","subLabel":"","text":"If yes, please add a brief description of the life support.","type":"control_textarea"},null,null,null,null,null,null,null,null,{"description":"","name":"fullName","qid":"77","subLabel":"","text":"Full name","type":"control_textbox"},{"description":"","name":"address","qid":"78","subLabel":"","text":"Address","type":"control_textbox"},{"description":"","name":"cityOr","qid":"79","subLabel":"","text":"City or suburb","type":"control_textbox"},null,{"description":"","name":"doYou","qid":"81","text":"Do you have solar","type":"control_radio"},{"description":"","name":"whereIs82","qid":"82","subLabel":"E.g. Left side of house","text":"Where is the meter located","type":"control_textbox"},{"name":"clickTo","qid":"83","text":"(A smart meter cannot be installed if there is inadequate mobile phone reception).","type":"control_text"},{"name":"clickTo84","qid":"84","text":"To complete the meter exchange, the installer requires safe and unhindered access to the existing metering installation.","type":"control_text"},null,{"description":"","name":"canThe","qid":"86","text":"Can the installer safely access your existing metering installation?","type":"control_radio"},{"description":"","name":"whatHazards","qid":"87","subLabel":"","text":"What hazards should we be aware of?","type":"control_textbox"},null,{"name":"disclaimer","qid":"89","text":"Disclaimer","type":"control_head"},{"description":"","name":"willYou","qid":"90","text":"Will you be getting solar installed in the next 6 months?","type":"control_radio"},{"description":"","name":"approximateInstallation","qid":"91","subLabel":"","text":"Approximate installation date if known","type":"control_textbox"},{"name":"clickTo92","qid":"92","text":"E.g. dogs in the same area as the meter.","type":"control_text"},{"description":"","name":"postcode","qid":"93","subLabel":"","text":"Postcode","type":"control_textbox"},{"description":"","name":"firstName","qid":"94","subLabel":"","text":"First name","type":"control_textbox"},{"description":"","name":"lastName","qid":"95","subLabel":"","text":"Last name","type":"control_textbox"},{"name":"installationDate","qid":"96","text":"Installation date","type":"control_head"},{"description":"","name":"date","qid":"97","text":"Date","type":"control_datetime"}]); setTimeout(function() {
	JotForm.paymentExtrasOnTheFly([null,null,{"name":"submit","qid":"2","text":"Submit","type":"control_button"},null,null,null,null,null,null,null,{"name":"your1010","qid":"10","text":"Your 10 or 11 digit NMI (National Meter Identifier)","type":"control_textbox"},{"name":"doubleclickTo11","qid":"11","text":"Don't know what this is? It stands for National Meter Identifier and you can find it on your electicity bill.","type":"control_text"},null,null,null,null,null,null,null,null,{"name":"isThere20","qid":"20","text":"Is there mobile phone reception at the meter location?","type":"control_radio"},null,null,{"name":"areThere","qid":"23","text":"Are there any caution stickers warning of asbestos on or inside the meter board?","type":"control_radio"},null,null,null,null,null,{"name":"isThere","qid":"29","text":"Is there a lock on your meter box?","type":"control_radio"},{"name":"isYour","qid":"30","text":"Is your meter box under cover?","type":"control_radio"},null,null,{"name":"isThere33","qid":"33","text":"Is there life support in the house?","type":"control_radio"},{"name":"isThere34","qid":"34","text":"Is there any other equipment in the house that would be adversely affected by a power outage of 30 to 60 minutes? Consider things like security alarms and appliances on timers. If in doubt, give us a call. Note that some equipment or appliances may need re-commissioning after a power outage.","type":"control_radio"},{"name":"ifYes35","qid":"35","text":"(if yes) Please specify: ","type":"control_textbox"},null,null,null,null,null,null,null,null,null,null,{"name":"yourDetails","qid":"46","text":"Your details","type":"control_head"},null,{"name":"emailAddress","qid":"48","text":"Email address","type":"control_textbox"},{"name":"contactNumber","qid":"49","text":"Contact number","type":"control_textbox"},{"name":"yourMeter","qid":"50","text":"Your meter","type":"control_head"},{"name":"hazards","qid":"51","text":"Hazards &amp; access","type":"control_head"},null,null,null,null,null,null,{"name":"isIt","qid":"58","text":"Is it okay to pass on your personal details, relating ONLY to the installation and maintenance of this smart meter, to third party installers? This will include your name, property address and contact details.","type":"control_radio"},null,null,null,null,null,null,null,null,{"name":"disclaimerBy","qid":"67","text":"Disclaimer: By checking this box I agree and acknowledge that the Meter Installer owns, and is responsible for maintaining and repairing, my smart meter. I confirm that I will not deliberately damage or interfere with any metering equipment on my premises, in accordance with my obligations under NSW law. I will not hold Powershop or those acting on its behalf liable for any special, incidental, direct, indirect, or consequential loss or damage arising from and or in relation to the smart meter. ","type":"control_checkbox"},{"description":"","name":"ifYes","qid":"68","subLabel":"","text":"If yes, please add a brief description of the life support.","type":"control_textarea"},null,null,null,null,null,null,null,null,{"description":"","name":"fullName","qid":"77","subLabel":"","text":"Full name","type":"control_textbox"},{"description":"","name":"address","qid":"78","subLabel":"","text":"Address","type":"control_textbox"},{"description":"","name":"cityOr","qid":"79","subLabel":"","text":"City or suburb","type":"control_textbox"},null,{"description":"","name":"doYou","qid":"81","text":"Do you have solar","type":"control_radio"},{"description":"","name":"whereIs82","qid":"82","subLabel":"E.g. Left side of house","text":"Where is the meter located","type":"control_textbox"},{"name":"clickTo","qid":"83","text":"(A smart meter cannot be installed if there is inadequate mobile phone reception).","type":"control_text"},{"name":"clickTo84","qid":"84","text":"To complete the meter exchange, the installer requires safe and unhindered access to the existing metering installation.","type":"control_text"},null,{"description":"","name":"canThe","qid":"86","text":"Can the installer safely access your existing metering installation?","type":"control_radio"},{"description":"","name":"whatHazards","qid":"87","subLabel":"","text":"What hazards should we be aware of?","type":"control_textbox"},null,{"name":"disclaimer","qid":"89","text":"Disclaimer","type":"control_head"},{"description":"","name":"willYou","qid":"90","text":"Will you be getting solar installed in the next 6 months?","type":"control_radio"},{"description":"","name":"approximateInstallation","qid":"91","subLabel":"","text":"Approximate installation date if known","type":"control_textbox"},{"name":"clickTo92","qid":"92","text":"E.g. dogs in the same area as the meter.","type":"control_text"},{"description":"","name":"postcode","qid":"93","subLabel":"","text":"Postcode","type":"control_textbox"},{"description":"","name":"firstName","qid":"94","subLabel":"","text":"First name","type":"control_textbox"},{"description":"","name":"lastName","qid":"95","subLabel":"","text":"Last name","type":"control_textbox"},{"name":"installationDate","qid":"96","text":"Installation date","type":"control_head"},{"description":"","name":"date","qid":"97","text":"Date","type":"control_datetime"}]);}, 20);
  }
}