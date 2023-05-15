import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './HomePage.css';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [stockDetails, setStockDetails] = useState(null);

  return (
    <div>
      HomePage
      <Sidebar setSearch={setSearch} />
    </div>
  );
};

export default HomePage;
