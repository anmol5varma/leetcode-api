import wazirx from '../plugins/wazirx';
import nse from '../plugins/nse';

const estimateMarketValue = async (shortHand, types) => {
  let response;
  switch (shortHand) {
    case 'CPT': {
      const mappedValue = await wazirx.getMarketValue();
      response = types.map((currency) => {
        return {
          ...currency,
          value: parseFloat(mappedValue[currency.code]) * parseFloat(currency.quantity)
        };
      });
    }
      break;
    case 'STK': {
      const mappedValue = await nse.getMarketValue(types);
      console.log(mappedValue);
      response = types.map((currency) => {
        return {
          ...currency,
          value: parseFloat(mappedValue[currency.code]) * parseFloat(currency.quantity)
        };
      });
    }
      break;
    default:
      response = types;
  }
  return response;
};

export default estimateMarketValue;
