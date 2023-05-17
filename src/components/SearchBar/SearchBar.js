const SearchBar = ({ handleSubmit, search, setSearch, error }) => {
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
            onChange={handleChange}
            required
            className="border-2 border-stone-100 rounded-md shadow-md mr-2 ml-1 py-1 px-1"
          />
        </label>
        <button
          type="submit"
          className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-1 border border-gray-400 rounded shadow"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
