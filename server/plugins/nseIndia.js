import axios from '../utils/api.util';
import { sleep } from '../utils/common.util';

const ApiList = {
  GLOSSARY: '/api/cmsContent?url=/glossary',
  HOLIDAY_TRADING: '/api/holiday-master?type=trading',
  HOLIDAY_CLEARING: '/api/holiday-master?type=clearing',
  MARKET_STATUS: '/api/marketStatus',
  MARKET_TURNOVER: '/api/market-turnover',
  ALL_INDICES: '/api/allIndices',
  INDEX_NAMES: '/api/index-names',
  CIRCULARS: '/api/circulars',
  LATEST_CIRCULARS: '/api/latest-circular',
  EQUITY_MASTER: '/api/equity-master',
  MARKET_DATA_PRE_OPEN: '/api/market-data-pre-open?key=ALL',
  MERGED_DAILY_REPORTS_CAPITAL: '/api/merged-daily-reports?key=favCapital',
  MERGED_DAILY_REPORTS_DERIVATIVES: '/api/merged-daily-reports?key=favDerivatives',
  MERGED_DAILY_REPORTS_DEBT: '/api/merged-daily-reports?key=favDebt'
};

export default class NseIndia {
  constructor() {
    this.baseUrl = 'http://www.nseindia.com';
    this.cookies = '';
    this.cookieUsedCount = 0;
    this.cookieMaxAge = 60; // should be in seconds
    this.cookieExpiry = new Date().getTime() + (this.cookieMaxAge * 1000);
    this.noOfConnections = 0;
  }

  async getNseCookies() {
    if (this.cookies === '' || this.cookieUsedCount > 10 || this.cookieExpiry <= new Date().getTime()) {
      const response = await axios.get(this.baseUrl);
      const setCookies = response.headers['set-cookie'];
      const cookies = [];
      setCookies.forEach((cookie) => {
        const requiredCookies = ['nsit', 'nseappid'];
        const cookieKeyValue = cookie.split(';')[0];
        const cookieEntry = cookieKeyValue.split('=');
        if (requiredCookies.includes(cookieEntry[0])) {
          cookies.push(cookieKeyValue);
        }
      });
      this.cookies = cookies.join('; ');
      this.cookieUsedCount = 0;
      this.cookieExpiry = new Date().getTime() + (this.cookieMaxAge * 1000);
    }
    this.cookieUsedCount++;
    return this.cookies;
  }

  async getData(url) {
    let retries = 0;
    let hasError = false;
    do {
      while (this.noOfConnections >= 5) {
        await sleep(500);
      }
      this.noOfConnections++;
      try {
        const response = await axios.get(url, {
          headers: {
            Cookie: await this.getNseCookies()
          }
        });
        this.noOfConnections--;
        return response.data;
      } catch (error) {
        hasError = true;
        retries++;
        this.noOfConnections--;
        if (retries >= 10) { throw error; }
      }
    } while (hasError);
  }

  async getDataByEndpoint(apiEndpoint) {
    return this.getData(`${this.baseUrl}${apiEndpoint}`);
  }

  async getAllStockSymbols() {
    const { data } = await this.getDataByEndpoint(ApiList.MARKET_DATA_PRE_OPEN);
    return data.map(({ metadata: { symbol } }) => symbol).sort();
  }

  getEquityDetails(symbol) {
    return this.getDataByEndpoint(`/api/quote-equity?symbol=${encodeURIComponent(symbol)}`);
  }

  getEquityTradeInfo(symbol) {
    return this.getDataByEndpoint(
      `/api/quote-equity?symbol=${encodeURIComponent(symbol)}&section=trade_info`
    );
  }

  getEquityCorporateInfo(symbol) {
    return this.getDataByEndpoint(
      `/api/quote-equity?symbol=${encodeURIComponent(symbol)}&section=corp_info`
    );
  }

  async getEquityHistoricalData(symbol, range) {
    if (!range) {
      const data = await this.getEquityDetails(symbol);
      range = { start: new Date(data.metadata.listingDate), end: new Date() };
    }
    const dateRanges = this.getDateRangeChunks(range.start, range.end, 66);
    const promises = dateRanges.map(async (dateRange) => {
      const url = `/api/historical/cm/equity?symbol=${encodeURIComponent(symbol)}`
                + `&series=[%22EQ%22]&from=${dateRange.start}&to=${dateRange.end}`;
      const data = await this.getDataByEndpoint(url);
      return data;
    });
    return Promise.all(promises);
  }

  getEquitySeries(symbol) {
    return this.getDataByEndpoint(
      `/api/historical/cm/equity/series?symbol=${encodeURIComponent(symbol)}`
    );
  }
}
