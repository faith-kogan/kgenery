import React, { Component, Fragment } from "react";

class PropertyAppFunctions extends Component {

  componentDidMount() {

    const propertyElements = document.querySelectorAll('.property-app');

    propertyElements.forEach( element => { 
      element.classList.add('global-transition');
    })

    console.log('PropertyAppFunctions mounted')

    const postcodeField = document.getElementById('postcode')

    // get url parameters and click go if all there
    const urlParams = new URLSearchParams(window.location.search);
    const urlPostcode = urlParams.get('postcode');
    const urlFueltype = urlParams.get('fueltype');

    if ( urlPostcode && urlFueltype ) {
      console.log('has URL postcode:', urlPostcode);
      const postcodeGoButton = document.querySelector('.lets-get-started');
      postcodeGoButton.click();
    }
  }

  componentDidUpdate() {
    console.log('PropertyAppFunctions updated')

    const addPropertyForm = document.querySelector('.add-property-form');
    const addPropertyResults = document.querySelector('.add-property-results');

    if ( addPropertyResults ) {
      addPropertyResults.style.display = 'block';
      addPropertyForm.style.display = 'none';

      // check fuels
      const urlParams = new URLSearchParams(window.location.search);
      const urlFueltype = urlParams.get('fueltype');
      if ( urlFueltype ) {
        const gasTab = document.querySelector('.c-tabs__item-gas');
        const elecTab = document.querySelector('.c-tabs__item-electricity');

         if ( gasTab ) {

          switch (urlFueltype) {
            case 'electricity':
              gasTab.disabled = true;
              gasTab.style.cursor = 'not-allowed';
              break;
            case 'gas':
              elecTab.disabled = true;
              elecTab.style.cursor = 'not-allowed';
              break;
          }
        }
      }
    } else {
      addPropertyForm.style.display = 'block';
    }
  }

  render() {

    return ( null );
  }
}

export default PropertyAppFunctions;