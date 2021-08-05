import wazirx from '../plugins/wazirx';
import nse from '../plugins/nse';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const estimateMarketValue = async (shortHand, types) => {
  let mappedValue;
  switch (shortHand) {
    case 'CPT': {
      const allCryptoValues = await wazirx.getMarketValue();
      mappedValue = Object.keys(allCryptoValues).reduce((acc, key) => {
        if (types.map(({ code }) => code).includes(key)) {
          return { ...acc, [key]: parseFloat(allCryptoValues[key]) };
        }
        return acc;
      }, {});
    }
      break;
    case 'STK':
      mappedValue = await nse.getMarketValue(types);
      break;
    default:
      mappedValue = {};
  }
  return mappedValue;
};

export default estimateMarketValue;
