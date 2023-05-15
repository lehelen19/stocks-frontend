import { useState } from 'react';
import { getStockDetail } from '../../../utilities/users-service';

const SearchBar = () => {
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const foundStock = await getStockDetail(stock);
    } catch {
      setError('Search for stock failed.');
    }
  };

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
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
};

export default SearchBar;
