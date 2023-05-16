import * as watchlistsAPI from './watchlists-api';

export async function getWatchlists() {
  const watchlists = await watchlistsAPI.getWatchlists();
  return watchlists;
}

export async function createWatchlist(watchlistName) {
  const newWatchlist = await watchlistsAPI.createWatchlist(watchlistName);
  return newWatchlist;
}

export async function getWatchlistDetails(id) {
  const watchlistDetails = await watchlistsAPI.getWatchlistDetails(id);
  return watchlistDetails;
}
