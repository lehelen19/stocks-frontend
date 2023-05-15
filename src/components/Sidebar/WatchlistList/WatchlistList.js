function WatchlistList({ watchlists }) {
    if (!watchlists) {
        return <div>Loading...</div>;
    }

    if (watchlists.length === 0) {
        return <div>No watchlists found.</div>;
    }

    return (
        <div className="watchlist-list">
            <h4>Watchlists:</h4>
            <ul>
                {watchlists.map((watchlist) => (
                    <li key={watchlist.id}>{watchlist.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default WatchlistList;