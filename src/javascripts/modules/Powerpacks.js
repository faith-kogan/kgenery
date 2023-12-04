import $ from "jquery";

export default class Powerpacks {

  constructor() {

    $('.powerpack-back').on('click', function() {
      $(this).parents('.c-card--powerpack').find('.c-card__details-hidden').removeClass('show');
    });

    $('.arrow-click').on('click', function() {
      if($(this).hasClass('arrow-left')) {
        $(this).parents('.c-card--powerpack').find('.c-card__details-hidden-green-rating-info').addClass('show');
      } else if($(this).hasClass('arrow-right')) {
        $(this).parents('.c-card--powerpack').find('.c-card__details-hidden-how-to-use-info').addClass('show');
      }
    });
  }
}
