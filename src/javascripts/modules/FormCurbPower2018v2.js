import $ from "jquery";
export default class JotformCurbPowerV2 {
  constructor(el) {
    this.el = $(el);

    JotForm.setConditions([{"action":[{"id":"action_0_1543286795751","visibility":"HideMultiple","isError":false,"fields":["20","19","12"]},{"id":"action_1_1543286795751","visibility":"Show","isError":false,"field":"15"}],"id":"1530325816630","index":"5","link":"Any","priority":"5","terms":[{"id":"term_0_1543286795751","field":"11","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_0_1543286805728","visibility":"Hide","isError":false,"field":"15"},{"id":"action_1_1543286805728","visibility":"ShowMultiple","isError":false,"fields":["20","19","12","2"]}],"id":"1530325836858","index":"6","link":"Any","priority":"6","terms":[{"id":"term_0_1543286805728","field":"11","operator":"equals","value":"No","isError":false}],"type":"field"},{"action":[{"id":"action_1_1530326506925","visibility":"HideMultiple","isError":false,"fields":["14","8"]}],"id":"1530325111824","index":"7","link":"Any","priority":"7","terms":[{"id":"term_0_1530326506925","field":"13","operator":"equals","value":"Yes","isError":false}],"type":"field"},{"action":[{"id":"action_0_1530326549149","visibility":"HideMultiple","isError":false,"fields":["5","4","3","7","9","10","11","15","8","12","2"]},{"id":"action_1_1530326549149","visibility":"Show","isError":false,"field":"14"}],"id":"1530325068302","index":"8","link":"Any","priority":"8","terms":[{"id":"term_0_1530326549149","field":"13","operator":"equals","value":"No","isError":false}],"type":"field"}]); JotForm.init(function(){ JotForm.alterTexts({"nextButtonText":"Next","prevButtonText":"Previous","progressMiddleText":"of","seeAllText":"See All","submitButtonText":"Submit"}); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,null,{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"email","qid":"3","subLabel":"example@example.com","text":"Email","type":"control_email"},{"description":"","name":"lastName","qid":"4","subLabel":"","text":"Last name","type":"control_textbox"},{"description":"","name":"firstName","qid":"5","subLabel":"","text":"First name","type":"control_textbox"},null,{"description":"","name":"contactNumber7","qid":"7","subLabel":"","text":"Contact number","type":"control_textbox"},null,null,null,{"description":"","name":"isThere11","qid":"11","text":"Is there any reason why turning off certain appliances would be harmful to you or anyone at your home?","type":"control_radio"},{"description":"","name":"iAgree","qid":"12","text":"I agree to the terms and conditions.","type":"control_checkbox"},{"description":"","name":"areYou","qid":"13","text":"Are you an existing customer in Victoria?","type":"control_radio"},{"name":"clickTo","qid":"14","text":"The Curb Your Power program is currently only open to Powershop customers in Victoria.\nTo join Powershop, click the Join Now button above.\nAlready a Powershop customer, but still want to curb your power? Make sure you have a smart meter so you can use our app and usage tools to monitor your usage.\nClick here to get a smart meter.","type":"control_text"},{"name":"clickTo15","qid":"15","text":"Unfortunately you won't be able to participate in our Curb You Power demand response program because turning off certain appliances would be harmful to you or someone at your home.","type":"control_text"},{"description":"","name":"uid","qid":"16","subLabel":"","text":"UID","type":"control_textbox"},null,{"description":"","name":"intervention18","qid":"18","subLabel":"","text":"Intervention","type":"control_textbox"},{"description":"","name":"chooseHow","qid":"19","text":"Choose how you would like to be rewarded","type":"control_radio"},{"description":"","name":"doesYour","qid":"20","text":"Does your property have a solar battery installed?","type":"control_radio"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,null,{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"email","qid":"3","subLabel":"example@example.com","text":"Email","type":"control_email"},{"description":"","name":"lastName","qid":"4","subLabel":"","text":"Last name","type":"control_textbox"},{"description":"","name":"firstName","qid":"5","subLabel":"","text":"First name","type":"control_textbox"},null,{"description":"","name":"contactNumber7","qid":"7","subLabel":"","text":"Contact number","type":"control_textbox"},null,null,null,{"description":"","name":"isThere11","qid":"11","text":"Is there any reason why turning off certain appliances would be harmful to you or anyone at your home?","type":"control_radio"},{"description":"","name":"iAgree","qid":"12","text":"I agree to the terms and conditions.","type":"control_checkbox"},{"description":"","name":"areYou","qid":"13","text":"Are you an existing customer in Victoria?","type":"control_radio"},{"name":"clickTo","qid":"14","text":"The Curb Your Power program is currently only open to Powershop customers in Victoria.\nTo join Powershop, click the Join Now button above.\nAlready a Powershop customer, but still want to curb your power? Make sure you have a smart meter so you can use our app and usage tools to monitor your usage.\nClick here to get a smart meter.","type":"control_text"},{"name":"clickTo15","qid":"15","text":"Unfortunately you won't be able to participate in our Curb You Power demand response program because turning off certain appliances would be harmful to you or someone at your home.","type":"control_text"},{"description":"","name":"uid","qid":"16","subLabel":"","text":"UID","type":"control_textbox"},null,{"description":"","name":"intervention18","qid":"18","subLabel":"","text":"Intervention","type":"control_textbox"},{"description":"","name":"chooseHow","qid":"19","text":"Choose how you would like to be rewarded","type":"control_radio"},{"description":"","name":"doesYour","qid":"20","text":"Does your property have a solar battery installed?","type":"control_radio"}]);}, 20);


    this.init();
    this.setRadios();
  }

  setRadios() {
    // Vic customer yes/no
    document.getElementById('input_13_0').checked = false;
    document.getElementById('input_13_1').checked = false;

    document.getElementById('input_13_0').addEventListener('click', function (event) {
      // check the radio
      document.getElementById('input_13_0').checked = true;
      document.getElementById('id_14').classList.add('u-hidden-visually');
      document.getElementById('curb-your-power-customer-form').classList.remove('u-hidden-visually');
    }, false);
    

    document.getElementById('input_13_1').addEventListener('click', function (event) {
      // check the radio
      document.getElementById('input_13_1').checked = true;
      document.getElementById('id_14').classList.remove('u-hidden-visually');
      document.getElementById('curb-your-power-customer-form').classList.add('u-hidden-visually');
    }, false);

    // Harmful radios yes/no
    document.getElementById('input_11_0').checked = false;
    document.getElementById('input_11_1').checked = false;

    document.getElementById('input_11_0').addEventListener('click', function (event) {
      // check the radio
      document.getElementById('input_11_0').checked = true;
      document.getElementById('id_15').classList.remove('u-hidden-visually');
    }, false);

    document.getElementById('input_11_1').addEventListener('click', function (event) {
      // check the radio
      document.getElementById('input_11_1').checked = true;
      document.getElementById('id_15').classList.add('u-hidden-visually');
    }, false);
  }

  init() {

    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('input_16').value = urlParams.get('uid');

    if (window.location.href.indexOf('?') > -1) {
      history.pushState('', document.title, window.location.pathname);
    }
  }	
}
    