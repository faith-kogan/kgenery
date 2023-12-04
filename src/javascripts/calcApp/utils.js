import { some, includes, keys } from "lodash";
import * as calcData from "./data/calcData";
import * as calcDataSA from "./data/calcDataSA";

export function numberWithCommas(x) {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function rounded(input, roundTo) {
  if (typeof roundTo === "undefined" || roundTo === null) roundTo = 1; // eslint-disable-line
  return Math.round(input / roundTo) * roundTo;
}

export function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key]; // eslint-disable-line
      return result;
    }, {});
}

export function getDistributors(postcode, pcodeToDistrib) {
  const distributors = postcode && pcodeToDistrib[postcode];

  if (!distributors) return [];

  return distributors;
}

export function getGasDistributors(postcode, pcodeToGasDistrib) {
  const gasDistributors = pcodeToGasDistrib[postcode];

  if (!gasDistributors) return [];

  return gasDistributors;
}

export function getClimateZone(postcode, pcodeToClimateZone) {
  const climateZone = pcodeToClimateZone[postcode];

  if (!climateZone) return null;

  return climateZone;
}

export function isServiceablePostcode(postcode) {
  const actAndQldNoServicePostcodes = [
    ...calcData.actPostCodes,
    ...calcData.qldNoService,
  ];

  if (postcode.length !== 4) return false;

  return (
    !includes(actAndQldNoServicePostcodes, postcode) &&
    some(calcData.pcodeToDistrib[postcode])
  );
}

// SA postcodes only check
export function isServiceablePostcodeSA(postcode) {
  const actAndQldNoServicePostcodes = [
    ...calcDataSA.actPostCodes,
    ...calcDataSA.qldNoService,
  ];

  if (postcode.length !== 4) return false;

  return (
    !includes(actAndQldNoServicePostcodes, postcode) &&
    some(calcDataSA.pcodeToDistribSA[postcode])
  );
}

export function isPostcodeWithClimateZone(postcode) {
  if (postcode.length !== 4) return false;
  return includes(keys(calcData.pcodeToClimateZone), postcode);
}

export function getMonthlySpend(
  annualConsumption,
  data,
  distributorName,
  tariffName
) {
  const fixed = data.pshopPricesByDistGst[distributorName][tariffName].daily;

  const { prices } = data.pshopPricesByDistGst[distributorName][tariffName];

  const tariffUsageSplit = data.tariffUsageSplits[tariffName];

  const variable = prices.reduce(
    (previous, current, currentIndex) =>
      previous + current * tariffUsageSplit[0][currentIndex] / 100,
    0
  );

  return (annualConsumption * variable + 365 * fixed) / 100 / 12;
}

export function getUnitPrice(
  annualConsumption,
  data,
  distributorName,
  tariffName,
  peakPerc
) {
  let variable;

  const fixed = data.pshopPricesByDistGst[distributorName][tariffName].daily;

  const { prices } = data.pshopPricesByDistGst[distributorName][tariffName];

  if (prices.length === 1) {
    variable = prices[0]; // eslint-disable-line
  } else {
    variable = prices[0] * peakPerc + prices[1] * (1 - peakPerc);
  }
  const unitPrice =
    (annualConsumption * variable / 100 + fixed * 365 / 100) /
    annualConsumption;
  return unitPrice;
}

export function getRatesItemsForThisPostcode(
  priceRates,
  distributors,
  gasDistributors,
  customer,
  state
) {
  const electricityDistributorMatches = item => {
    if (!distributors) return false;
    return distributors.some(
      distributor =>
        item.showFor.includes(distributor) && item.type === "electricity"
    );
  };

  const gasDistributorMatches = item => {
    if (!gasDistributors) return false;

    return gasDistributors.some(
      distributor => item.showFor.includes(distributor) && item.type === "gas"
    );
  };

  // Filter the list based on the title containing any of the distributor names
  return priceRates.filter(
    item =>
      // Check if distributor name appears in the title of the item
      ((electricityDistributorMatches(item) || gasDistributorMatches(item)) &&
        // and check if the customer type is in the customer data property
        item.customer.some(
          customerType => customer.indexOf(customerType) >= 0
        )) ||
      // Or if state appears (used for state wide items like solar) and customer matches
      (item.customer.some(
        customerType => customer.indexOf(customerType) >= 0
      ) &&
        item.showFor.includes(state))
  );
}

// Used by RatesApp
export function getAllRatesItems(
  priceRates,
  elecDistributors,
  gasDistributors,
  customer,
  state,
  climateZone = null
) {
  const matchesDistributor = item => {
    if (item.type !== "solar") {
      if (!elecDistributors && !gasDistributors) return false;

      return (
        (elecDistributors.some(distributor =>
          item.showFor.includes(distributor)
        ) &&
          item.type === "electricity") ||
        gasDistributors.some(
          distributor =>
            item.showFor.includes(distributor) && item.type === "gas"
        )
      );
    } else if (item.type === "solar") {
      return item.showFor.includes(state);
    }
  };

  const matchesCustomer = item => {
    if (customer !== "residential" && customer !== "business") return false;
    return item.customer.some(
      customerType => customer.indexOf(customerType) >= 0
    );
  };

  const matchesClimateZone = item => {
    if (!climateZone) return false;
    if (item.type === "solar") return true;
    return item.showForClimateZone.includes(climateZone);
  };

  const matchesTariffType = item =>
    item.showForTariffType.includes(calcData.tariffAll);

  if (climateZone) {
    return priceRates.filter(
      item =>
        matchesDistributor(item) &&
        matchesClimateZone(item) &&
        matchesCustomer(item) &&
        matchesTariffType(item)
    );
  }

  return priceRates.filter(
    item =>
      matchesDistributor(item) &&
      matchesCustomer(item) &&
      matchesTariffType(item)
  );
}

// Used by VEFSApp
export function getRatesItems(
  priceRates,
  elecDistributors,
  gasDistributors,
  customer,
  fuelType,
  climateZone,
  tariffType,
  state
) {
  const distributors =
    fuelType === "electricity" ? elecDistributors : gasDistributors;

  const matchesDistributor = item => {
    if (!distributors) return false;
    return distributors.some(distributor => item.showFor.includes(distributor));
  };

  const matchesCustomer = item => {
    if (customer !== "residential" && customer !== "business") return false;
    return item.customer.some(
      customerType => customer.indexOf(customerType) >= 0
    );
  };

  const matchesClimateZone = item => {
    if (!climateZone) return false;
    // do not check climate zone if fuelType != electricity
    if (fuelType !== "electricity") return true;
    return item.showForClimateZone.includes(climateZone);
  };

  const matchesTariffType = item => {
    if (!tariffType) return false;

    // if showForTariffType only = tariffAll, return false
    if (
      item.showForTariffType.length === 1 &&
      item.showForTariffType[0] === calcData.tariffAll
    )
      return false;

    if (tariffType === "all") return true;
    return item.showForTariffType.includes(tariffType);
  };

  return priceRates.filter(
    item =>
      item.type === fuelType &&
      (matchesDistributor(item) || item.showFor.includes(state)) &&
      matchesClimateZone(item) &&
      matchesCustomer(item) &&
      matchesTariffType(item)
  );
}

// New function for distributor info

export function getDistributorInfoForThisPostcode(
  distributorInfo,
  distributors,
  gasDistributors,
  customer,
  state
) {
  const electricityDistributorMatches = item => {
    if (!distributors) return false;
    return distributors.some(
      distributor =>
        item.showFor.includes(distributor) && item.type === "electricity"
    );
  };

  const gasDistributorMatches = item => {
    if (!gasDistributors) return false;

    return gasDistributors.some(
      distributor => item.showFor.includes(distributor) && item.type === "gas"
    );
  };

  // Filter the list based on the title containing any of the distributor names
  return distributorInfo.filter(
    item =>
      // Check if distributor name appears in the title of the item
      (electricityDistributorMatches(item) || gasDistributorMatches(item)) &&
      // and check if the customer type is in the customer data property
      item.customer.some(customerType => customer.indexOf(customerType) >= 0)
  );
}

// New function for distributor info

// New function for basic plan info

export function getBasicPlanInfoForThisPostcode(
  distributorInfo,
  distributors,
  gasDistributors,
  customer,
  state
) {
  const electricityDistributorMatches = item => {
    if (!distributors) return false;
    return distributors.some(
      distributor =>
        item.showFor.includes(distributor) && item.type === "electricity"
    );
  };

  const gasDistributorMatches = item => {
    if (!gasDistributors) return false;

    return gasDistributors.some(
      distributor => item.showFor.includes(distributor) && item.type === "gas"
    );
  };

  // Filter the list based on the title containing any of the distributor names
  return distributorInfo.filter(
    item =>
      // Check if distributor name appears in the title of the item
      (electricityDistributorMatches(item) || gasDistributorMatches(item)) &&
      // and check if the customer type is in the customer data property
      item.customer.some(customerType => customer.indexOf(customerType) >= 0)
  );
}

// New function for basic plan info
export function testLog() {
  console.log("testLog");
}

// hide either resi callback form
export function hideResiCallback() {
  console.log("hide the forms from utils");
  document
    .getElementsByClassName("resi-form")[0]
    .classList.add("u-hidden-visually");
}

export const getFuelType = (distributors, gasDistributors) => {
  if (distributors.length >= 1 && gasDistributors.length >= 1)
    return "dual_fuel";

  return "electricity";
};

export function getFileUploadErrorMessage(fileStatus) {
  if (fileStatus === "-1000") {
    // Not a readable or recognised pdf

    return '"We could not read the information on the pdf you uploaded."';
  } else if (fileStatus === "0100") {
    // No file attached
    return '"There was no file attached."';
  } else if (fileStatus === "0200") {
    // Not a readable or recognised pdf
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1080") {
    // This means we couldn't read all the items on the bill
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1001") {
    // The bill loaded was recognised as a C&I bill

    return '"We cannot provide an accurate comparison for a Commercial and Industrial site."';
  } else if (fileStatus === "1004") {
    // The bill uploaded was recognised as a gas or gas/elec bill
    return '"This is a gas or gas/power bill."';
  } else if (fileStatus === "1008") {
    // The bill was recognised but rejected as it is from SA, N QLD etc
    return '"Powershop is not available in your state.  "';
  } else if (fileStatus === "1009") {
    // This bill was rejected as it looks like an ammendment and therefore difficult to run comparison against
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1030") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1031") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1032") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1033") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1034") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1035") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1036") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1037") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1038") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1039") {
    // xxx
    return '"We could not read the pdf you uploaded."';
  } else if (fileStatus === "1041") {
    //  This is a predictive payment plan, so cannot perform easy comparison

    return '"This is a predictive payment plan so we cannot give you an accurate comparison."';
  } else if (fileStatus === "1042") {
    // This bill was failed because the deemed savings were over $100/month.  This bill should be followed up by a CSR

    return '"Our calculations aren\'t adding up. We will get back to you once we have checked them."';
  } else if (fileStatus === "1043") {
    // The green power tariff is not easily matched to a powershop plan

    return '"The GreenPower tariff you are on means we cannot give you an accurate comparison."';
  } else if (fileStatus === "1044") {
    // The received bill was from an embedded network provider (i.e. Win Energy)

    return '"Unfortunately at this time Powershop are unable to supply electricity to your address."';
  } else if (fileStatus === "1045") {
    // The received bill has an item on it that means an automated comparison is not possible
    return '"We could not read the bill you uploaded."';
  }
  return '"We could not read the bill you uploaded. "';
}
