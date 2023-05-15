import * as stocksAPI from './stocks-api';

export async function getStockDetail(stock) {
  const stockDetail = await stocksAPI.getStockDetail(stock);
  return stockDetail;
}
