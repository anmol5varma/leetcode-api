import NseIndia from './nseIndia';
import { safeApiCall } from '../utils/api.util';

const nseIndia = new NseIndia();

const getDataForAllStocks = (type) => {
  return type.map(async ({ code }) => {
    const stockData = await safeApiCall(() => nseIndia.getEquityDetails(code));
    return {
      code,
      value: stockData.priceInfo.lastPrice
    };
  });
};

const getMarketValue = async (type) => {
  const listArray = await Promise.all(getDataForAllStocks(type));
  return listArray.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.code]: curr.value
    };
  }, {});
};

export default {
  getMarketValue
};
