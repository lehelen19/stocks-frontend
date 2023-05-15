import React from 'react';
import SearchBar from './SearchBar/SearchBar';

const Sidebar = ({ setSearch, search, error, handleSubmit }) => {
  return (
    <div>
      <div>Side Bar</div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        error={error}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Sidebar;
