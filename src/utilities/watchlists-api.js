import sendRequest from "./send-request";

const BASE_URL = "/api/watchlists"

export function getWatchlists() {
    return sendRequest(BASE_URL);
}

export function deleteWatchlist