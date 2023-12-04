import $ from "jquery";

export default class CarbonCalculator {
  constructor(el) {
    this.el = $(el);

    $(document).ready(function() {
      var $stateNumber = .00107;
      var $stateVic = .00107;
      var $stateNSW = .00082;
      var $stateQLD = .00080;
      var $stateSA = .00051;
      var $stateTAS = .00019;
      var $stateSthWA = .00070;
      var $stateNthWA = .00060;
      var $stateNT = .00064;
      var $stateNTDarwin = .00056;
      var $kwhField = $('#kwh');
      var $calculateButtons = $('.calculator');
      var $kwh = $('.kwh-indicator');
      var $warning = $('.warning-hide');
      var $joinBox = $('.join-container');

      var $stateChoice = $('.c-radio');
      var $stateLabel = $('.c-input');
      var $stateInput = $('.c-radio__input');

      function scrollToAmount() {
        $('html, body').animate( {
          scrollTop: $('#kwh').offset().top -200
        }, 400, function() {
          $kwhField.prop('disabled', false);
          $kwhField.focus();
        });
      }

      function scrollToStates() {
        $('html, body').animate( {
          scrollTop: $('.calculator-body').offset().top -200
        }, 400);
      }

      function stateSelect() {
        $stateChoice.removeClass('selected');
        $kwhField.addClass('activated');
        $kwh.addClass('activated');
        $kwhField.prop('disabled', true);
        $('.result').text("0.0000");
        $('#kwh').val('');
        setTimeout(scrollToAmount, 250);
      }

      $('.state-vic').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateVic;
      });

      $('.state-nsw').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateNSW;
      });

      $('.state-qld').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateQLD;
      });

      $('.state-sa').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateSA;
      });

      $('.state-tas').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateTAS;
      });

      $('.state-nt').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateNT;
      });

      $('.state-nt-darwin').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateNTDarwin;
      });

      $('.state-s-wa').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateSthWA;
      });

      $('.state-n-wa').click(function() {
        stateSelect();
        $(this).addClass('selected');
        $stateNumber = $stateNthWA;
      });

      // when number put in field
      $kwhField.keyup(function() {
        if($.isNumeric($('#kwh').val())) {
          $calculateButtons.addClass('activated');
          $kwh.removeClass('not-number');
          $kwh.addClass('is-number');
          $warning.html('Please add numbers only...thank you.');
          $warning.addClass('lime-box');
          $warning.removeClass('red-box');
          $('.calculate').css('pointer-events', 'auto');
          $('.customer-state').slideDown('fast');
          calculate();
        } else {
          $calculateButtons.removeClass('activated');
          $kwh.removeClass('is-number');
          $kwh.addClass('not-number');
          $('.calculate').css('pointer-events', 'none');
          $warning.removeClass('lime-box');
          $warning.addClass('red-box');
          $warning.html('Numbers only or I can\'t calculate...');
        }
      });

      // reset
      $('.reset').click(function() {
        stateSelect();
        $stateInput.prop('checked', false);
        $kwhField.removeClass('activated');
        $calculateButtons.removeClass('activated');
        $kwh.removeClass('activated');
        $kwh.removeClass('is-number');
        $kwh.removeClass('not-number');
        $('.result').text("0.0000");
        $('#kwh').val('');
        setTimeout(scrollToStates, 250);
      });

      function calculate(e) {
        var $result = $('#kwh').val() * $stateNumber;
        var $resultString = $('#kwh').val();
        var $number = parseFloat($result);
        var $total = $number.toFixed(2);
        var $outputResult = $('.result');
        $outputResult.text($total);
      }

      // reset on window load
      $stateInput.prop('checked', false);
      $stateChoice.removeClass('selected');
      $kwhField.removeClass('activated');
      $kwhField.prop('disabled', true);
      $calculateButtons.removeClass('activated');
      $kwh.removeClass('activated');
      $kwh.removeClass('is-number');
      $kwh.removeClass('not-number');
      $('.result').text("0.0000");
      $('#kwh').val('');
    });
  }
}