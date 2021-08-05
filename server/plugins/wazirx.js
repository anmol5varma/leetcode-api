import axios, { safeApiCall } from '../utils/api.util';
import { WAZIRX_MARKET_VALUE } from '../constants/plugin';

const getWazirxMarketValue = async () => {
  const res = await safeApiCall(() => axios.get(WAZIRX_MARKET_VALUE));
  if (res.status > 200) { return null; }
  return res.data;
};

const getMarketValue = async () => {
  const marketValue = await getWazirxMarketValue();
  let res = {};
  if (marketValue) {
    res = Object.keys(marketValue).reduce((acc, key) => {
      if (marketValue[key].quote_unit === 'inr') {
        return { ...acc, [marketValue[key].base_unit.toUpperCase()]: marketValue[key].last };
      }
      return { ...acc };
    }, {});
  }
  return res;
};

export default {
  getMarketValue
};
