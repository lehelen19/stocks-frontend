import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getWatchlistDetails } from '../../utilities/watchlists-service';

const WatchlistDetailPage = ({ user, search, setSearch, handleSubmit }) => {
  const [watchlistDetails, setWatchlistDetails] = useState(null);
  const [error, setError] = useState('');

  const { id } = useParams();

  const fetchWatchlistDetails = async () => {
    try {
      const foundWatchlist = await getWatchlistDetails(id);
      setWatchlistDetails(foundWatchlist);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchWatchlistDetails();
  }, []);

  return (
    <>
      <h3>Watchlist Details</h3>
      {watchlistDetails &&
        watchlistDetails.stock?.forEach((stock) => <p>{stock}</p>)}
      <Sidebar user={user} />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default WatchlistDetailPage;
