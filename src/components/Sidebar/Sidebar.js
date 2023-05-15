import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CreateWatchlistButton from './CreateWatchlistButton';
import WatchlistList from './WatchlistList';

function Sidebar() {
    const [username, setUsername] = useState('');
    const [watchlists, setWatchlists] = useState([]);
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/users/check-token', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUsername(userData.user.username);
            }
        } catch (error) {
            console.log('Error fetching user data', error);
        }
    }

    return (
        <div className="user-sidebar">
            <h3>Welcome, {username}</h3>
            <SearchBar />
            <CreateWatchlistButton onCreate={create} />
            <WatchlistList watchlists={watchlists} />
        </div>
    );
}

export default Sidebar;