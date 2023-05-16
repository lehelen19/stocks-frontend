import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {
  getWatchlists,
  createWatchlist,
} from '../../utilities/watchlists-service';
// import CreateWatchlistButton from './CreateWatchlistButton';
// import WatchlistList from './WatchlistList';

function Sidebar({ user }) {
  const [watchlists, setWatchlists] = useState(null);
  const [watchlistName, setWatchlistName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');

  const fetchWatchlists = async () => {
    try {
      const foundWatchlists = await getWatchlists();
      setWatchlists(foundWatchlists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleChange = (e) => {
    setWatchlistName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted!');
    try {
      await createWatchlist(watchlistName);
      fetchWatchlists();
    } catch (err) {
      setError('New watchlist creation failed - try again');
    }
  };

  return (
    <div className="user-sidebar">
      <h3>Welcome, {user.username}!</h3>

      <button onClick={handleClick}>Create new watchlist</button>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={watchlistName}
            onChange={handleChange}
            placeholder="New watchlist name..."
          />
          <button>Submit</button>
        </form>
      )}
      <p>Watchlists: {watchlists}</p>
    </div>
  );
}

export default Sidebar;
