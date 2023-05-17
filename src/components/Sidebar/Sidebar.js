import React, { useEffect, useState } from 'react';
import {
    getWatchlists,
    createWatchlist,
    deleteWatchlist,
    updateWatchlistName
} from '../../utilities/watchlists-service';
import { logOut } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

function Sidebar({ user, setUser }) {
    const [watchlists, setWatchlists] = useState(null);
    const [watchlistName, setWatchlistName] = useState('');
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
            console.log(error);
        }
    };

    const handleStartEditing = async (id, newName) => {
        setEditingId(id);
    }
    const handleFinishEditing = async (id, newName) => {
        try {
            await updateWatchlistName(id, newName);
            setEditingId(null);
            fetchWatchlists();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="user-sidebar">
            <h1>Welcome, {user.username}!</h1>

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
            <section>
                <h2>Watchlists</h2>
                {watchlists &&
                    watchlists.map((watchlist) => {
                        const { name, _id } = watchlist;
                        return (
                            <div key={_id}>
                                {editingId === _id ?
                                    (
                                        <input
                                            type='text'
                                            value={watchlistName}
                                            onChange={handleChange}
                                            onBlur={() => handleFinishEditing(_id, watchlistName)}
                                            autoFocus
                                        />
                                    ) : (
                                        <div>
                                            <Link to={`/watchlists/${_id}`}>
                                                <p>{name}</p>
                                            </Link>
                                            <button onClick={() => handleStartEditing(_id)}>
                                                Edit</button>
                                            <button onClick={() => handleDeleteWatchlist(_id)}>X</button>
                                        </div>
                                    )}
                            </div>

                        );
                    })}
            </section>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Sidebar;
