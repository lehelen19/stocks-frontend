import * as watchlistsAPI from './watchlists-api';

export async function getWatchlists() {
    const watchlists = await watchlistsAPI.getWatchlists();
    return watchlists;
}

// export async function deleteWatchlist() {
//     const deleteWL = await watchlistsAPI.deleteWatchlist()
//     return deleteWL;
// }

export async function createWatchlist(watchlistName) {
  const newWatchlist = await watchlistsAPI.createWatchlist(watchlistName);
  return newWatchlist;
}
