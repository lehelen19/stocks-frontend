import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStockDetail } from '../../utilities/stocks-service';
import { getWatchlists, addStock } from '../../utilities/watchlists-service';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

const StockDetailPage = ({ user, setUser }) => {
  const [stockDetails, setStockDetails] = useState(null);
  const [watchlists, setWatchlists] = useState(null);
  const [selectedWatchlist, setSelectedWatchlist] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchWatchlists = async () => {
    try {
      const foundWatchlists = await getWatchlists();
      setWatchlists(foundWatchlists);
    } catch {
      setError({ watchlist: 'Watchlist could not be found.' });
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const { symbol } = useParams();

  useEffect(() => {
    let ignore = false;

    const fetchStockDetails = async () => {
      try {
        const foundStock = await getStockDetail(symbol);
        setStockDetails(foundStock['Global Quote']);
        setSuccess(false);
      } catch {
        setError({ detail: 'Stock details could not be fetched.' });
      }
    };

    if (!ignore) fetchStockDetails();

    return () => {
      ignore = true;
    };
  }, [symbol]);

  const handleAddStockSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStock(selectedWatchlist, symbol);
      setSuccess(true);
    } catch {
      setSuccess(false);
      setError({ stock: 'Stock could not be added to the watchlist.' });
    }
  };

  const loading = () => {
    return <h2 className="text-white m-4">Loading...</h2>;
  };

  const roundNumber = (str) => {
    str = str.replace('%', '');
    return (Math.round((Number(str) + Number.EPSILON) * 100) / 100).toFixed(2);
  };

  const displayDate = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
  };

  const loaded = () => {
    if (Object.keys(stockDetails).length === 0) {
      return (
        <p className="text-lg mx-2 my-5">
          Stock could not be found! Make sure the ticker symbol is valid.
        </p>
      );
    }
    return (
      <>
        <div className="my-4 mx-5 grid grid-cols-2 gap-4">
          <div className="my-5 py-2 px-4 bg-stone-200 rounded-md text-center">
            <h2 className="uppercase text-2xl my-2 tracking-wide block">
              {stockDetails['01. symbol']}
            </h2>
            <p className="text-xl">${roundNumber(stockDetails['05. price'])}</p>
            <p className="text-md">
              {stockDetails['10. change percent'] < 0 ? (
                <span className="text-red-600">
                  -{roundNumber(stockDetails['10. change percent'])}%
                </span>
              ) : (
                <span className="text-green-600">
                  +{roundNumber(stockDetails['10. change percent'])}%
                </span>
              )}
            </p>
          </div>
          <div className="my-5 py-2 px-4 bg-stone-200 rounded-md grid grid-cols-2 text-center">
            <div className="flex flex-col justify-evenly">
              <p className="text-sm font-medium">Previous Close</p>
              <p>${roundNumber(stockDetails['08. previous close'])}</p>
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-sm font-medium">Open</p>
              <p>${roundNumber(stockDetails['02. open'])}</p>
            </div>
          </div>
          <div className="col-span-2 py-2 px-4 bg-stone-200 rounded-md text-center">
            <h3 className="text-xl mb-2">Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <p>Latest Trading Day</p>
              <p>{displayDate(stockDetails['07. latest trading day'])}</p>

              <p>High</p>
              <p>${roundNumber(stockDetails['03. high'])}</p>

              <p>Low</p>
              <p>${roundNumber(stockDetails['04. low'])}</p>

              <p>Volume</p>
              <p>{stockDetails['06. volume']}</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleAddStockSubmit} className="mb-6 mx-4">
          <label>
            <select
              value={selectedWatchlist}
              onChange={(e) => {
                setSuccess(false);
                setSelectedWatchlist(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-teal-500 focus:border-teal-500 px-2 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            >
              <option value="" disabled="disabled"></option>
              {watchlists &&
                watchlists?.map((watchlist) => (
                  <option value={watchlist._id} key={watchlist._id}>
                    {watchlist.name}
                  </option>
                ))}
            </select>
          </label>
          <button
            type="submit"
            className="mx-2 text-sm bg-white hover:bg-gray-100 text-gray-800 px-2 py-1.5 border border-gray-400 rounded-sm shadow"
          >
            Add to watchlist
          </button>
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-2 py-3 my-4 rounded relative"
              role="alert"
            >
              Watchlist has been updated!
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setSuccess(false)}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          {error && !!('stock' in error) && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-2 py-3 rounded relative my-4"
              role="alert"
            >
              {error.stock}
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setError(null)}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
        </form>
      </>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="h-full">
        <Sidebar user={user} setUser={setUser} />
      </div>
      <section className="flex-1 bg-teal-50 h-full">
        <SearchBar />
        <div>{stockDetails ? loaded() : loading()}</div>
      </section>
    </div>
  );
};

export default StockDetailPage;
