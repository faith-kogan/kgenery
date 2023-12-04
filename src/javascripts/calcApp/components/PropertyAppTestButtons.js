import React, { Component, Fragment } from "react";

class PropertyAppTestButtons extends Component {

  componentDidMount() {
    
    const buttonNone = document.getElementById('button_none')
    const buttonElecGas = document.getElementById('button_elec_gas')
    const buttonElecOnly = document.getElementById('button_elec_only')
    const buttonGasOnly = document.getElementById('button_gas_only')
    const buttonNoGasPostcode = document.getElementById('button_no_gas_postcode')
    const buttonBusiness = document.getElementById('button_business')

    /*
    <button className="c-btn c-btn--centered" id="button_none">Reset</button>
    <button className="c-btn c-btn--centered" id="button_elec_gas">Elec and Gas</button>
    <button className="c-btn c-btn--centered" id="button_elec_only">Elec only</button>
    <button className="c-btn c-btn--centered" id="button_gas_only">Gas only</button>
    <button className="c-btn c-btn--centered" id="button_no_gas_postcode">No Gas postcode</button>
    */

    buttonNone.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('postcode')
      localStorage.removeItem('fueltype')
      localStorage.setItem('customertype', 'residential')
    })

    buttonElecGas.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('postcode', '3564')
      localStorage.setItem('fueltype', 'elec_gas')
      localStorage.setItem('customertype', 'residential')
    })

    buttonElecOnly.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('postcode', '3564')
      localStorage.setItem('fueltype', '')
      localStorage.setItem('customertype', 'residential')
    })

    buttonGasOnly.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('postcode', '3564')
      localStorage.setItem('fueltype', 'gas')
      localStorage.setItem('customertype', 'residential')
    })

    buttonNoGasPostcode.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('postcode', '2000')
      localStorage.setItem('fueltype', 'gas')
      localStorage.setItem('customertype', 'residential')
    })

    buttonBusiness.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('customertype', 'business')
      localStorage.setItem('postcode', '3564')
      localStorage.setItem('fueltype', 'elec_gas')
    })
    
  }

  componentDidUpdate() {
  }

  render() {

    return (
      null
    );
  }
}

export default PropertyAppTestButtons;