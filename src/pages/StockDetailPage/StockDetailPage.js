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
    // fetchStockDetails();
    setStockDetails(symbol);
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

  const loaded = () => {
    return (
      <>
        <h1>{stockDetails}</h1>
        {/* <h1>{stockDetails['01. symbol']}</h1>
        <div>Price: ${stockDetails['02. open']}</div>
        <div>Volume: {stockDetails['06. volume']}</div>
        <div>Change Percent: {stockDetails['10. change percent']}</div>
         */}

        <form onSubmit={handleAddStockSubmit}>
          <label>
            <select
              value={selectedWatchlist}
              onChange={(e) => setSelectedWatchlist(e.target.value)}
            >
              {watchlists &&
                watchlists?.map((watchlist) => (
                  <option value={watchlist._id} key={watchlist._id}>
                    {watchlist.name}
                  </option>
                ))}
            </select>
          </label>
          <button type="submit">Add to watchlist</button>
        </form>
      </>
    );
  };

  return (
    <div className="grid grid-cols-3">
      <div>
        <Sidebar user={user} setUser={setUser} />
      </div>
      <section className="col-span-2  bg-gray-300">
        <h1>Stock Detail Page</h1>
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
