import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { logout, getWatchlists } from '../../utilities/watchlists-service';
// import CreateWatchlistButton from './CreateWatchlistButton';
// import WatchlistList from './WatchlistList';

function Sidebar({ user }) {
    const [watchlists, setWatchlists] = useState(null);

    const fetchWatchlists = async () => {
        try {
            const foundWatchlists = await getWatchlists();
            setWatchlists(foundWatchlists);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        fetchWatchlists();
    }, []);

    return (
        <div className="user-sidebar">
            <h3>Welcome, {user.username}!</h3>
            <button onClick={handleLogout}>Logout</button>
            {/* <CreateWatchlistButton onCreate={create} />  */}
            {/* <WatchlistList watchlists={watchlists} /> */}
        </div>
    );
}

export default Sidebar;
