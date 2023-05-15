import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getStockDetail } from '../../utilities/users-service';
import './HomePage.css';

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
    } catch {
      setError('Search for stock failed.');
    }
  };

  return (
    <div>
      HomePage
      <Sidebar
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
        error={error}
      />
      {stockDetails}
    </div>
  );
};

export default HomePage;
