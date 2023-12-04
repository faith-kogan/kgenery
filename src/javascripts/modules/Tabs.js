import $ from "jquery";
/* eslint-disable no-unused-vars */
import tooltipster from "tooltipster";
export default class Tabs {
  constructor(el) {
    this.el = el;

    // tab function to display content on tab click
    function onTabClick(event) {

      event.preventDefault(); // stop from scrolling to the tab ID
      let activeTabs = document.querySelectorAll('.active');

      // deactivate existing active tab and panel
      activeTabs.forEach(function(tab) {
        tab.className = tab.className.replace('active', '');
      });

      // activate new tab and panel
      event.target.className += ' active';
      event.target.parentElement.className += ' active';
      document.getElementById(event.target.href.split('#')[1]).className += ' active';
    }

    // Get an array of tab navigation from the page
    var tabNavs = document.querySelectorAll(".c-tabs__navigation");

    // Loop through the resulting array and run tab function
    for(var i = 0; i < tabNavs.length; i++){
      tabNavs[i].addEventListener('click', onTabClick, false);
    }

    // add active class to first tab nav and content
    let firstTab = document.getElementsByClassName('c-tabs__navigation-link')[0];
    let firstTabContent = document.getElementsByClassName('c-tabs__content-pane')[0];
    firstTab.className += ' active';
    firstTabContent.className += ' active';

    // tooltip
    $(document).ready(function() {
      $('.c-tooltip__popup').click(function() {
        // remove all highlighted classes
        var $imageThis = $(this).closest('section').children('img');
        var $imageOther = $('section').children('img');

        function highlightImage() {
          $imageThis.addClass('highlighted');  
        }
        
        $imageOther.removeClass('highlighted');
        setTimeout(highlightImage, 20);
      });

      $('.c-tooltip__popup').tooltipster({
        trigger: 'click',
        delay: 0,
        distance: 40,
        theme: ['tooltipster-light', 'tooltipster-light-customized'],
      });

      // on close event
      $.tooltipster.on('close', function(event) {
        $('section').children('img').removeClass('highlighted');
      });
    });
  }
}