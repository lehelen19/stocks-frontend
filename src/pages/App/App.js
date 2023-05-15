import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import StockDetailPage from '../../components/StockDetail/StockDetail';

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          {/* <NavBar user={user} setUser={setUser} /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks/:symbol" element={<StockDetailPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
