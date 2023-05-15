import { sendRequest } from './send-request';

const BASE_URL = '/api/stocks';

function getStockDetail(stock) {
  return sendRequest(`${BASE_URL}/${stock}`);
}

module.exports = { getStockDetail };
