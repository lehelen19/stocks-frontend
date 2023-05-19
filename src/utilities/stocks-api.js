import sendRequest from './send-request';

const BASE_URL = 'https://portfoliopal-backend.herokuapp.com/api/stocks';

export function getStockDetail(stock) {
  return sendRequest(`${BASE_URL}/${stock}`);
}
