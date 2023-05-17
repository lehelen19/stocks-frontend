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
  const [error, setError] = useState('');

  const fetchWatchlists = async () => {
    try {
      const foundWatchlists = await getWatchlists();
      setWatchlists(foundWatchlists);
    } catch (error) {
      console.log(error);
    }
  };

  const { symbol } = useParams();

  const fetchStockDetails = async () => {
    try {
      const foundStock = await getStockDetail(symbol);
      setStockDetails(foundStock['Global Quote']);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, [symbol]);

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleAddStockSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStock(selectedWatchlist, symbol);
    } catch (error) {
      setError(error);
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
    return (
      <>
        <h2 className="uppercase text-2xl my-5">
          {stockDetails['01. symbol']}
        </h2>
        <form onSubmit={handleAddStockSubmit}>
          <label>
            <select
              value={selectedWatchlist}
              onChange={(e) => setSelectedWatchlist(e.target.value)}
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
        </form>
        <ul>
          <li>Price: ${roundNumber(stockDetails['05. price'])}</li>
          <li>Open: ${roundNumber(stockDetails['02. open'])}</li>
          <li>High: ${roundNumber(stockDetails['03. high'])}</li>
          <li>Low: ${roundNumber(stockDetails['04. low'])}</li>
          <li>
            Latest Trading Day:{' '}
            {displayDate(stockDetails['07. latest trading day'])}
          </li>
          <li>
            Previous Close: ${roundNumber(stockDetails['08. previous close'])}
          </li>
          <li>Volume: {stockDetails['06. volume']}</li>
          <li>Change Percent: {stockDetails['10. change percent']}</li>
        </ul>
      </>
    );
  };

  return (
    <div className="flex h-screen">
      <div className='h-full' >
        <Sidebar user={user} setUser={setUser} />
      </div>
      <section className="flex-1 bg-teal-50">
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
        <div>
          {stockDetails ? loaded() : loading()}
          <p className="error-message">&nbsp;{error}</p>
        </div>
      </section>
    </div>
  );
};

export default StockDetailPage;
