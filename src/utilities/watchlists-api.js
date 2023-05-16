import sendRequest from './send-request';

const BASE_URL = '/api/watchlists';

export function getWatchlists() {
  return sendRequest(BASE_URL);
}

export function createWatchlist(watchlistName) {
  return sendRequest(BASE_URL, 'POST', { name: watchlistName });
}

export function deleteWatchlist(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function getWatchlistDetails(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function updateWatchlistName(id, newName) {
  return sendRequest(`${BASE_URL}/${id}`, 'POST', { name: newName });
}
