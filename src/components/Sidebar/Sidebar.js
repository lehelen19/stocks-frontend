import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { getWatchlists } from '../../utilities/watchlists-service';
// import CreateWatchlistButton from './CreateWatchlistButton';
// import WatchlistList from './WatchlistList';

function Sidebar({ user }) {
  const [watchlists, setWatchlists] = useState(null);
  const [newWatchlist, setNewWatchlist] = useState('');
  const [showInput, setShowInput] = useState(false);

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
    setNewWatchlist(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted!');
  };

  return (
    <div className="user-sidebar">
      <h3>Welcome, {user.username}!</h3>

      <button onClick={handleClick}>Create new watchlist</button>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newWatchlist}
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
