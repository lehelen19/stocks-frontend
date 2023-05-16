import sendRequest from './send-request';

const BASE_URL = '/api/watchlists';

export function getWatchlists() {
    return sendRequest(BASE_URL);
}

export function createWatchlist(watchlistName) {
    return sendRequest(BASE_URL, 'POST', { name: watchlistName });
}
