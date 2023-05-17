import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import StockDetailPage from '../StockDetailPage/StockDetailPage';
import WatchlistDetailPage from '../WatchlistDetailPage/WatchlistDetailPage';

function App() {
  const [user, setUser] = useState(getUser());
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch('');
    navigate(`/stocks/${search}`);
  };

  return (
    <main className="App">
      {user ? (
        <>
          {/* <NavBar user={user} setUser={setUser} /> */}
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  user={user}
                  setUser={setUser}
                  search={search}
                  setSearch={setSearch}
                  handleSubmit={handleSubmit}
                />
              }
            />
            <Route
              path="/stocks/:symbol"
              element={
                <StockDetailPage
                  user={user}
                  setUser={setUser}
                  search={search}
                  setSearch={setSearch}
                  handleSubmit={handleSubmit}
                />
              }
            />
            <Route
              path="/watchlists/:id"
              element={
                <WatchlistDetailPage
                  user={user}
                  setUser={setUser}
                  search={search}
                  setSearch={setSearch}
                  handleSubmit={handleSubmit}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
