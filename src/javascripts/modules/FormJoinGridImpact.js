export default class JotformJoinGridImpact {
  constructor(el) {
    this.el = el

    var selections = document.getElementsByClassName('hidden-content');
    var selection1 = document.getElementsByClassName('hidden-content-1')[0];
    var selection2 = document.getElementsByClassName('hidden-content-2')[0];
    var selection3 = document.getElementsByClassName('hidden-content-3')[0];
    var selection4 = document.getElementsByClassName('hidden-content-4')[0];
    
    var radio1 = document.getElementById('input_7_0');
    var radio2 = document.getElementById('input_7_1');
    var radio3 = document.getElementById('input_7_2');
    var radio4 = document.getElementById('input_7_3');

    function hideAll() {
    	for(var i = 0; i < selections.length; i++) {
    		selections[i].classList.add('u-hidden-visually');
    		console.log(selections[i].className);
    	}
    }

    radio1.onclick = function() {
    	hideAll();
    	selection1.classList.remove('u-hidden-visually');
    }

    radio2.onclick = function() {
    	hideAll();
    	selection2.classList.remove('u-hidden-visually');
    }

    radio3.onclick = function() {
    	hideAll();
    	selection3.classList.remove('u-hidden-visually');
    }

    radio4.onclick = function() {
    	hideAll();
    	selection4.classList.remove('u-hidden-visually');
    }

	JotForm.init(function(){ JotForm.alterTexts({"nextButtonText":"Next","prevButtonText":"Previous","progressMiddleText":"of","reviewBackText":"Back to Form","reviewSubmitText":"Review and Submit","seeAllText":"See All","submitButtonText":"Submit"}); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
	}); JotForm.prepareCalculationsOnTheFly([null,null,{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"firstName","qid":"3","subLabel":"","text":"First name","type":"control_textbox"},{"description":"","name":"lastName","qid":"4","subLabel":"","text":"Last name","type":"control_textbox"},{"description":"","name":"emailRegistered","qid":"5","subLabel":"example@example.com","text":"Email registered with Powershop","type":"control_email"},{"description":"","name":"iAgree","qid":"6","text":"I agree to the terms &amp; conditions","type":"control_checkbox"},{"description":"","name":"pleaseChoose","qid":"7","text":"Please choose your current situation","type":"control_radio"}]); setTimeout(function() {
	JotForm.paymentExtrasOnTheFly([null,null,{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"firstName","qid":"3","subLabel":"","text":"First name","type":"control_textbox"},{"description":"","name":"lastName","qid":"4","subLabel":"","text":"Last name","type":"control_textbox"},{"description":"","name":"emailRegistered","qid":"5","subLabel":"example@example.com","text":"Email registered with Powershop","type":"control_email"},{"description":"","name":"iAgree","qid":"6","text":"I agree to the terms &amp; conditions","type":"control_checkbox"},{"description":"","name":"pleaseChoose","qid":"7","text":"Please choose your current situation","type":"control_radio"}]);}, 20);
  }
}
