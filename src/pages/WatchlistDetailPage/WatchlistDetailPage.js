import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getWatchlistDetails } from '../../utilities/watchlists-service';
import { getStockDetail } from '../../utilities/stocks-service';

const WatchlistDetailPage = ({ user, setUser }) => {
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
    let ignore = false;

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

    if (watchlistDetails && watchlistDetails.stocks.length && !ignore) {
      watchlistDetails.stocks.forEach((symbol) => fetchStockDetails(symbol));
    }

    return () => {
      ignore = true;
    };
  }, [watchlistDetails]);

  const roundNumber = (str) => {
    return Math.round((Number(str) + Number.EPSILON) * 100) / 100;
  };

  return (
    <div className="flex h-screen">
      <div className="h-full">
        <Sidebar user={user} setUser={setUser} />
      </div>
      <div className="flex-1 bg-teal-50">
        <SearchBar />
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
                    <article
                      className='flex flex-col border-t border-b border-gray-200 py-2'
                      key={stock}>
                      <div className="grid grid-cols-3 gap-4">
                        <h3>
                          <Link
                            className="uppercase ml-4 col-span-1 font-bold cursor-pointer text-teal-600 hover:underline hover:italic"
                            to={`/stocks/${stock}`}
                          >
                            {stocksDetails[stock]['01. symbol']}
                          </Link>
                        </h3>
                        <p className="col-span-1 text-gray-700">
                          Price: ${roundNumber(stocksDetails[stock]['05. price'])}
                        </p>
                        <p className="col-span-1 text-gray-700">
                          Change(%): {stocksDetails[stock]['10. change percent']}
                        </p>
                      </div>
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
