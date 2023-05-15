import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getStockDetail } from '../../utilities/stocks-service';
import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomePage = () => {
  // Need info to get request
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [stockDetails, setStockDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const foundStock = await getStockDetail(search);
      setStockDetails(foundStock);
      setSearch('');
    } catch {
      setError('Search for stock failed.');
    }
  };

  return (
    <div>
      HomePage
      <Sidebar />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
        error={error}
      />
      {stockDetails ? JSON.stringify(stockDetails) : null}
    </div>
  );
};

export default HomePage;
