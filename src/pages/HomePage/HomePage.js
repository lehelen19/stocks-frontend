import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './HomePage.css';
import SearchBar from '../../components/Sidebar/SearchBar/SearchBar';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [stockDetails, setStockDetails] = useState(null);

  return (
    <div>
      HomePage
      <Sidebar />
      <SearchBar />
    </div>
  );
};

export default HomePage;
