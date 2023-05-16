import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

const WatchlistDetailPage = ({ user, search, setSearch, handleSubmit }) => {
  return (
    <>
      <h3>Watchlist Details</h3>
      <Sidebar user={user} />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default WatchlistDetailPage;
