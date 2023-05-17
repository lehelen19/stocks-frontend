import Sidebar from '../../components/Sidebar/Sidebar';
import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomePage = ({ search, setSearch, handleSubmit, user, setUser }) => {
  return (
    <div className="flex h-screen">
      <div className='h-full' >
        <Sidebar user={user} setUser={setUser} />
      </div>
      <section className="flex-1 bg-teal-50">
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
