import React, { useEffect, useState } from 'react';
import {
  getWatchlists,
  createWatchlist,
  deleteWatchlist,
  updateWatchlistName,
} from '../../utilities/watchlists-service';
import { logOut } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

function Sidebar({ user, setUser }) {
  const [watchlists, setWatchlists] = useState(null);
  const [watchlistName, setWatchlistName] = useState('');
  const [editWatchlistName, setEditWatchlistName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  //   RENDER ERROR
  const [error, setError] = useState('');

  const fetchWatchlists = async () => {
    try {
      const foundWatchlists = await getWatchlists();
      setWatchlists(foundWatchlists);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logOut();
    setUser(null);
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

  const handleEditChange = (e) => {
    setEditWatchlistName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWatchlist(watchlistName);
      setWatchlistName('');
      fetchWatchlists();
    } catch (err) {
      setError('New watchlist creation failed - try again');
    }
  };

  const handleDeleteWatchlist = async (_id) => {
    try {
      await deleteWatchlist(_id);
      fetchWatchlists();
    } catch (error) {
      setError('Failed to delete watchlist.');
    }
  };

  const handleStartEditing = async (id, newName) => {
    const watchlist = watchlists.find((watchlist) => watchlist._id === id);
    if (watchlist) {
      setEditWatchlistName(watchlist.name);
      setEditingId(id);
    }
  };

  const handleFinishEditing = async (id, newName) => {
    try {
      await updateWatchlistName(id, newName);
      setEditingId(null);
      fetchWatchlists();
    } catch (error) {
      console.log(error);
    }
  };

  const loading = () => {
    return <p className="text-white">Loading watchlists...</p>;
  };

  const loaded = () => {
    return (
      watchlists &&
      watchlists.map((watchlist) => {
        const { name, _id } = watchlist;
        return (
          <div key={_id}>
            {editingId === _id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFinishEditing(_id, editWatchlistName);
                }}
              >
                <input
                  className="rounded-md"
                  type="text"
                  value={editWatchlistName}
                  onChange={handleEditChange}
                  autoFocus
                />
                <button
                  className="rounded-md px-2 py-1  ml-2 bg-teal-600 hover:bg-teal-700 text-white"
                  type="submit"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <div className="bg-teal-600 rounded-lg p-2 mt-5 lg:mt-5 text-gray-100 cursor-pointer">
                  <Link
                    to={`/watchlists/${_id}`}
                    className="block lg:inline-block text-teal-200 hover:text-white mr-4"
                  >
                    <p>{name}</p>
                  </Link>
                  <div className="flex justify-end">
                    <button
                      className="mr-4 rounded-md px-2 text-white text-sm bg-teal-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
                      onClick={() => handleStartEditing(_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="mr-4 rounded-md px-2 text-white text-sm bg-teal-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
                      onClick={() => handleDeleteWatchlist(_id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })
    );
  };
  return (
    <div className="bg-teal-500 py-6 px-8 max-w-64 min-h-screen">
      <h2 className="text-white font-bold text-2xl capitalize text-center">
        Welcome, {user.username}!
      </h2>

      <button
        onClick={handleClick}
        className="block tracking-wide mt-4 mb-2 text-white-100 underline text-white hover:text-gray-500 hover:bg-gray-100 hover:italic"
      >
        Create new watchlist
      </button>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            className="bg-white border-none w-full text-gray-700 p-1 leading-tight focus:outline-none rounded-sm"
            type="text"
            value={watchlistName}
            onChange={handleChange}
            placeholder="New watchlist name..."
          />
          <button className="hidden">Submit</button>
        </form>
      )}
      <nav>
        <h2 className="text-white font-semibold text-xl my-2">Watchlists</h2>
        {watchlists ? loaded() : loading()}
        <div className="absolute bottom-5">
          <button
            className="text-white bottom-0 hover:underline bg-teal-900 hover:bg-teal-800 rounded-md px-4 py-2 "
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
