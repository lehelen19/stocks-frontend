import React, { useEffect, useState } from 'react';
import {
    getWatchlists,
    createWatchlist,
} from '../../utilities/watchlists-service';
import { Link } from 'react-router-dom';

function Sidebar({ user }) {
    const [watchlists, setWatchlists] = useState(null);
    const [watchlistName, setWatchlistName] = useState('');
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
            fetchWatchlists();
        } catch (err) {
            setError('New watchlist creation failed - try again');
        }
    };
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
                            <Link to={`/watchlists/${_id}`} key={_id}>
                                <p>{name}</p>
                            </Link>
                        );
                    })}
            </section>
        </div>
    );
}

export default Sidebar;
