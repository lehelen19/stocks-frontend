import React from 'react';
import SearchBar from './SearchBar/SearchBar';

const Sidebar = ({ setSearch }) => {
  return (
    <div>
      <div>Side Bar</div>
      <SearchBar setSearch={setSearch} />
    </div>
  );
};

export default Sidebar;
