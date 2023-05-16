import * as watchlistsAPI from './watchlists-api';

export async function getWatchlists() {
    const watchlists = await watchlistsAPI.getWatchlists();
    return watchlists;
}

export async function deleteWatchlist(_id) {
    const eraseWatchlist = await watchlistsAPI.deleteWatchlist(_id);
    return eraseWatchlist;
}

export async function createWatchlist(watchlistName) {
    const newWatchlist = await watchlistsAPI.createWatchlist(watchlistName);
    return newWatchlist;
}
