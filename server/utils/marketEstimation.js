import wazirx from '../plugins/wazirx';

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

    default:
      response = types;
  }
  return response;
};

export {
  estimateMarketValue
};
