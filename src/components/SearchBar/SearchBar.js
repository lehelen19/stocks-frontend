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
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchBar;
