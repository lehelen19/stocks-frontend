import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import StockDetailPage from '../StockDetailPage/StockDetailPage';
import WatchlistDetailPage from '../WatchlistDetailPage/WatchlistDetailPage';

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} setUser={setUser} />}
            />
            <Route
              path="/stocks/:symbol"
              element={<StockDetailPage user={user} setUser={setUser} />}
            />
            <Route
              path="/watchlists/:id"
              element={<WatchlistDetailPage user={user} setUser={setUser} />}
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
