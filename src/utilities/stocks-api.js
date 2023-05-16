import sendRequest from './send-request';

const BASE_URL = '/api/stocks';

export function getStockDetail(stock) {
  return sendRequest(`${BASE_URL}/${stock}`);
}
