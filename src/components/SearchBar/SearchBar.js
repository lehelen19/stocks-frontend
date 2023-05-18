import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch('');
    navigate(`/stocks/${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Search for ticker symbol..."
            value={search}
            maxLength={5}
            onChange={handleChange}
            required
            className="border-2 border-stone-100 rounded-md shadow-md mr-2 ml-1 py-1 px-1"
          />
        </label>
        <button type="submit" className="hidden">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
