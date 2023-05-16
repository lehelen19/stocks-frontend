import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import CreateWatchlistButton from './CreateWatchlistButton';
import WatchlistList from './WatchlistList';

function Sidebar({user}) {
    
    const [watchlists, setWatchlists] = useState([]);

    return (
        <div className="user-sidebar">
            <h3>Welcome, {username}</h3>
            <SearchBar />
            <CreateWatchlistButton onCreate={create} /> 
            <WatchlistList watchlists={watchlists} />
        </div>
    );
}

export default Sidebar