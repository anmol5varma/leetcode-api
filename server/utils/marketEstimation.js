import wazirx from '../plugins/wazirx';
import nse from '../plugins/nse';

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
// const estimateMarketValue = async (shortHand, types) => {
//   let response;
//   switch (shortHand) {
//     case 'CPT': {
//       const mappedValue = await wazirx.getMarketValue();
//       response = types.map((currency) => {
//         return {
//           ...currency,
//           value: parseFloat(mappedValue[currency.code]) * parseFloat(currency.quantity)
//         };
//       });
//     }
//       break;
//     case 'STK': {
//       const mappedValue = await nse.getMarketValue(types);
//       console.log(mappedValue);
//       response = types.map((currency) => {
//         return {
//           ...currency,
//           value: parseFloat(mappedValue[currency.code]) * parseFloat(currency.quantity)
//         };
//       });
//     }
//       break;
//     default:
//       response = types;
//   }
//   return response;
// };

export default estimateMarketValue;
