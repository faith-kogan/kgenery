import PropTypes from "prop-types";

export const appStatePropType = {
  annualConsumption: PropTypes.number,
  annualUsageMax: PropTypes.number,
  annualUsageMin: PropTypes.number,
  calculatedUnitPrice: PropTypes.number,
  consumptionBand: PropTypes.string,
  monthlyCost: PropTypes.number,
  peakPerc: PropTypes.number,
  postcode: PropTypes.string,
  distributorName: PropTypes.string,
  tariffName: PropTypes.string,
  uploadData: PropTypes.shape({}),
  uploadErrorMessage: PropTypes.string,
};

export const appStateDefaultProps = {
  annualConsumption: 0,
  annualUsageMax: null,
  annualUsageMin: null,
  consumptionBand: null,
  monthlyCost: null,
};

// @TODO: Get actual shape of these from data, it is v confusing
export const dataPropType = {
  pcodeToDistrib: PropTypes.shape({}).isRequired,
  pshopPricesByDist: PropTypes.shape({}).isRequired,
  pshopPricesByDistGst: PropTypes.shape({}).isRequired,
  tariffUsageSplits: PropTypes.shape({}).isRequired,
};
