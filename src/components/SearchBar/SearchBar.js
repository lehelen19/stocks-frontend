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
            className="border-2 border-stone-100 rounded-md shadow-md ml-5 mt-4 py-1 px-1"
          />
        </label>
        <button
          type="submit"
          className="bg-white hidden ml-2 hover:bg-gray-100 text-gray-800 py-1 px-1 border border-gray-400 rounded shadow"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
