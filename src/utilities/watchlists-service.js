import * as watchlistsAPI from './watchlists-api';

export async function getWatchlists() {
    const watchlists = await watchlistsAPI.getWatchlists();
    return watchlists;
}

export async function deleteWatchlist(_id) {
    const erasedWatchlist = await watchlistsAPI.deleteWatchlist(_id);
    return erasedWatchlist;
}

export async function createWatchlist(watchlistName) {
    const newWatchlist = await watchlistsAPI.createWatchlist(watchlistName);
    return newWatchlist;
}

export async function getWatchlistDetails(id) {
    const watchlistDetails = await watchlistsAPI.getWatchlistDetails(id);
    return watchlistDetails;
}

export async function updateWatchlistName(id, newName) {
    const watchlistNameUpdate = await watchlistsAPI.updateWatchlistName(id, newName);
    return watchlistNameUpdate;
}

export async function addStock(id, symbol) {
  const updatedWatchlist = await watchlistsAPI.addStock(id, symbol);
  return updatedWatchlist;
}
