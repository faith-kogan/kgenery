export default class JotformOxfamTeamName {
  constructor(el) {
    this.el = el

	JotForm.init(function(){ JotForm.alterTexts(undefined); JotForm.clearFieldOnHide="disable"; JotForm.submitError="jumpToFirstError"; /*INIT-END*/
    }); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Trailwalker team","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"yourEmail","qid":"3","subLabel":"The same email you&#039;ll use to signup to Powershop and help save the planet - nice one!","text":"Your email","type":"control_email"},{"description":"","name":"trailwalkerTeam","qid":"4","subLabel":"You can find this on the team webpage, they&#039;re gonna love it.","text":"Trailwalker Team Name","type":"control_textbox"}]); setTimeout(function() {
    JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Trailwalker team","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"yourEmail","qid":"3","subLabel":"The same email you&#039;ll use to signup to Powershop and help save the planet - nice one!","text":"Your email","type":"control_email"},{"description":"","name":"trailwalkerTeam","qid":"4","subLabel":"You can find this on the team webpage, they&#039;re gonna love it.","text":"Trailwalker Team Name","type":"control_textbox"}]);}, 20);
  }
}