import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getStockDetail } from '../../utilities/stocks-service';
import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import StockDetailPage from '../StockDetailPage/StockDetailPage';

const HomePage = ({ search, setSearch, handleSubmit }) => {
  return (
    <div>
      HomePage
      <Sidebar />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
