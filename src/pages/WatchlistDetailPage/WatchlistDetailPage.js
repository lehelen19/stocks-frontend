import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getWatchlistDetails } from '../../utilities/watchlists-service';

const WatchlistDetailPage = ({
  user,
  search,
  setSearch,
  handleSubmit,
  setUser,
}) => {
  const [watchlistDetails, setWatchlistDetails] = useState(null);
  const [error, setError] = useState('');

  const { id } = useParams();

  const fetchWatchlistDetails = async (id) => {
    try {
      const foundWatchlist = await getWatchlistDetails(id);
      setWatchlistDetails(foundWatchlist);
    } catch {
      setError('Watchlist could not be found.');
    }
  };

  useEffect(() => {
    fetchWatchlistDetails(id);
  }, [id]);

  return (
    <div className="flex h-screen">
      <div className="h-full" >
        <Sidebar user={user} setUser={setUser} />
      </div>
      <div className="flex-1 bg-teal-50">
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
        <section>
          <h3 className="text-teal-600 text-center m-4 text-xl">
            <p>{error}</p>
            {!!watchlistDetails && watchlistDetails.name}
          </h3>
          {!!watchlistDetails &&
            watchlistDetails.stocks.map((stock) => (
              <article 
              className="border-t border-b border-gray-300 p-4 w-full"
              key={stock}>{stock}</article>
            ))}
        </section>
      </div>
    </div>
  );
};

export default WatchlistDetailPage;
