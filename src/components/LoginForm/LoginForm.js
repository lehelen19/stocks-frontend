import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      navigate('/stocks/ADBE');
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">PortfolioPal</h1>
      <div className="flex justify-center">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col p-10"
        >
          <h1 className="block uppercase tracking-wide font-bold">
            Welcome back
          </h1>
          <hr className="m-2" />
          <label
            htmlFor="username"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            id="username"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <label
            htmlFor="password"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            id="password"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <button
            type="submit"
            className="block uppercase tracking-wide text-gray-700 m-5 border-2 p-1"
          >
            LOG IN
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
