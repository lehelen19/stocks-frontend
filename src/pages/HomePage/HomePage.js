import Sidebar from '../../components/Sidebar/Sidebar';
import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomePage = ({ search, setSearch, handleSubmit, user, setUser }) => {
  return (
    <div className="grid grid-cols-3">
      <div>
        <Sidebar user={user} setUser={setUser} />
      </div>
      <section className="col-span-2 flex justify-around bg-gray-300">
        <h1>Home Page</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
};

export default HomePage;
