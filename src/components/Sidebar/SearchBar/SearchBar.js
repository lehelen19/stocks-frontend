import { useState } from 'react';

const SearchBar = () => {
  const [stock, setStock] = useState('');

  const handleChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Search for ticker symbol..."
            value={stock}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchBar;
