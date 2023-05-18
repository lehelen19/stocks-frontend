import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStockDetail } from '../../utilities/stocks-service';
import { getWatchlists, addStock } from '../../utilities/watchlists-service';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

const StockDetailPage = ({
  search,
  setSearch,
  handleSubmit,
  user,
  setUser,
}) => {
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

  const { symbol } = useParams();

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const foundStock = await getStockDetail(symbol);
        setStockDetails(foundStock['Global Quote']);
        setSuccess(false);
      } catch {
        setError({ detail: 'Stock details could not be fetched.' });
      }
    };
    fetchStockDetails();
  }, [symbol]);

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleAddStockSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStock(selectedWatchlist, symbol);
      setSuccess(true);
    } catch {
      setSuccess(false);
      setError({ stock: 'Stock is already in the watchlist.' });
    }
  };

  const loading = () => {
    return <h2>Loading...</h2>;
  };

  const roundNumber = (str) => {
    return Math.round((Number(str) + Number.EPSILON) * 100) / 100;
  };

  const displayDate = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
  };

  const loaded = () => {
    if (Object.keys(stockDetails).length === 0) {
      return (
        <p className="text-lg m-2">
          Stock could not be found. Make sure you inputted a valid ticker
          symbol.
        </p>
      );
    }
    return (
      <>
        <div className="">
          <h2 className="uppercase text-2xl my-5">
            {stockDetails['01. symbol']}
          </h2>
          <form onSubmit={handleAddStockSubmit} className="mb-6">
            <label>
              <select
                value={selectedWatchlist}
                onChange={(e) => {
                  setSuccess(false);
                  setSelectedWatchlist(e.target.value);
                }}
                className="px-2 py-1"
              >
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
              className="mx-2 bg-white hover:bg-gray-100 text-gray-800 px-2 py-1 border border-gray-400 rounded shadow"
            >
              Add to watchlist
            </button>
            {success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-2 py-3 rounded relative"
                role="alert"
              >
                Watchlist has been updated
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
                className="bg-red-100 border border-red-400 text-red-700 px-2 py-3 rounded relative"
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
          <div className="flex">
            <div className="w-1/2">
              <ul>
                <li>Price: ${roundNumber(stockDetails['05. price'])}</li>
                <li>Open: ${roundNumber(stockDetails['02. open'])}</li>
                <li>High: ${roundNumber(stockDetails['03. high'])}</li>
                <li>Low: ${roundNumber(stockDetails['04. low'])}</li>
              </ul>
            </div>
            <div className="w-1/2">
              <ul>
                <li>
                  Latest Trading Day:{' '}
                  {displayDate(stockDetails['07. latest trading day'])}
                </li>
                <li>
                  Previous Close: $
                  {roundNumber(stockDetails['08. previous close'])}
                </li>
                <li>Volume: {stockDetails['06. volume']}</li>
                <li>Change Percent: {stockDetails['10. change percent']}</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="h-full">
        <Sidebar user={user} setUser={setUser} />
      </div>
      <section className="flex-1 bg-teal-50">
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
        <div>{stockDetails ? loaded() : loading()}</div>
      </section>
    </div>
  );
};

export default StockDetailPage;
