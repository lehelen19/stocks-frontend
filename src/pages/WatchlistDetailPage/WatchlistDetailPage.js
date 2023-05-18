import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getWatchlistDetails } from '../../utilities/watchlists-service';
import { getStockDetail } from '../../utilities/stocks-service';

const WatchlistDetailPage = ({
  user,
  search,
  setSearch,
  handleSubmit,
  setUser,
}) => {
  const [watchlistDetails, setWatchlistDetails] = useState(null);
  const [stocksDetails, setStocksDetails] = useState(null);
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

  useEffect(() => {
    const fetchStockDetails = async (symbol) => {
      try {
        const foundStock = await getStockDetail(symbol);
        console.log(foundStock);
        setStocksDetails((stocksDetails) => ({
          ...stocksDetails,
          [symbol]: foundStock['Global Quote'],
        }));
      } catch (error) {
        setError(error);
      }
    };

    if (watchlistDetails && watchlistDetails.stocks.length) {
      watchlistDetails.stocks.forEach((symbol) => fetchStockDetails(symbol));
    }
  }, [watchlistDetails]);

  const roundNumber = (str) => {
    return Math.round((Number(str) + Number.EPSILON) * 100) / 100;
  };

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
        <div>
          {error && (
            <h2 className="text-red-600 text-center m-4 text-xl">{error}</h2>
          )}

          <h2 className="text-teal-600 text-center m-4 text-xl capitalize">
            {!!watchlistDetails && watchlistDetails.name}
          </h2>
          <section>
            {!!watchlistDetails &&
              !!stocksDetails &&
              watchlistDetails.stocks.map((stock) => {
                if (stocksDetails[stock]) {
                  return (
                    <article key={stock}>
                      <h3 className="uppercase">
                        {stocksDetails[stock]['01. symbol']}
                      </h3>
                      <li>
                        Price: ${roundNumber(stocksDetails[stock]['05. price'])}
                      </li>
                      <li>
                        Change Percentage:{' '}
                        {stocksDetails[stock]['10. change percent']}
                      </li>
                    </article>
                  );
                } else {
                  return <p key={stock}>{stock.name}</p>;
                }
              })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default WatchlistDetailPage;
