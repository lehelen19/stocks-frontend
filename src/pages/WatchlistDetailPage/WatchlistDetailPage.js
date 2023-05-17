import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getWatchlistDetails } from '../../utilities/watchlists-service';

const WatchlistDetailPage = ({ user, search, setSearch, handleSubmit }) => {
  const [watchlistDetails, setWatchlistDetails] = useState(null);
  const [error, setError] = useState('');

  const { id } = useParams();

  const fetchWatchlistDetails = async (id) => {
    try {
      const foundWatchlist = await getWatchlistDetails(id);
      setWatchlistDetails(foundWatchlist);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchWatchlistDetails(id);
  }, [id]);

  return (
    <div className="grid grid-cols-3">
      <Sidebar user={user} />
      <section className="col-span-2 flex flex-col justify-around bg-gray-300">
        <h3>Watchlist Details</h3>
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
        <div>
          Stocks in this watchlist
          {!!watchlistDetails &&
            watchlistDetails.stocks.map((stock) => <p key={stock}>{stock}</p>)}
        </div>
      </section>
    </div>
  );
};

export default WatchlistDetailPage;
