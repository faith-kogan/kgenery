import $ from "jquery";
import slick from "slick-carousel";

export default class MVCarousel {
  constructor(el) {
    this.el = $(el);

    function showCarousel() {
        $('.c-carousel').fadeIn('slow');
    }

    function testimonialsSlider() {

        // show on init
        $('.c-carousel').on('init', function() {
            showCarousel();
        });

        $('.c-carousel').slick({
            dots: false,
            autoplay: true,
            autoplaySpeed: 10000,
            slidesToShow: 3,
            nextArrow: '<span class="c-btn--carousel c-btn--carousel-next"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="285.7px" height="500px" viewBox="0 0 285.7 500" style="enable-background:new 0 0 285.7 500;" xml:space="preserve"><path class="st0" d="M285.7,250c0,9.1-3.5,18.3-10.5,25.3L61,489.5c-14,14-36.6,14-50.5,0s-14-36.6,0-50.5l189-189L10.5,61 c-14-14-14-36.6,0-50.5s36.6-14,50.5,0l214.3,214.3C282.2,231.7,285.7,240.9,285.7,250z"/></svg></span>',
            prevArrow: '<span class="c-btn--carousel c-btn--carousel-prev"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="285.7px" height="500px" viewBox="0 0 285.7 500" style="enable-background:new 0 0 285.7 500;" xml:space="preserve"><path class="st0" d="M0,250c0-9.1,3.5-18.3,10.5-25.3L224.7,10.5c14-14,36.6-14,50.5,0c14,14,14,36.6,0,50.5l-189,189l189,189 c14,14,14,36.6,0,50.5c-14,14-36.6,14-50.5,0L10.5,275.3C3.5,268.3,0,259.1,0,250z"/></svg></span>',

            // responsive
            responsive: [{
            	breakpoint: 767,
            	settings: {
            		slidesToShow: 2
            	}
            }, {
            	breakpoint: 500,
            	settings: {
            		slidesToShow: 1,
            		dots: false
            	}
            }]
        });
    }

    $(window).on('load', function() {
        setTimeout(testimonialsSlider, 1000);
    });
  }
}
