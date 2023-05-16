import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStockDetail } from '../../utilities/stocks-service';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

const StockDetailPage = ({ search, setSearch, handleSubmit, user }) => {
  const [stockDetails, setStockDetails] = useState(null);
  const [error, setError] = useState('');

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
        <form>
          <label>
            <select>
              <option>Watchlist 1</option>
              <option defaultValue={2}>Watchlist 2</option>
            </select>
          </label>
          <button>Add to watchlist</button>
        </form>
      </>
    );
  };

  return (
    <>
      <Sidebar user={user} />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />
      {stockDetails ? loaded() : loading()}
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
};

export default StockDetailPage;
