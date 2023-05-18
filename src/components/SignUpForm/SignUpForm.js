import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: '',
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;

      const user = await signUp(formData);

      this.props.setUser(user);
      return <Navigate to="/stocks/ADBE" />;
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disabled = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="flex justify-center">
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="w-full max-w-sm flex flex-col p-10"
          >
            <h1 className="block uppercase tracking-wide font-bold">
              Register
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
              value={this.state.username}
              onChange={this.handleChange}
              required
              id="username"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <label
              htmlFor="email"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              id="email"
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
              value={this.state.password}
              onChange={this.handleChange}
              required
              id="password"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <label
              htmlFor="confirm"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
              id="confirm"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <button
              type="submit"
              disabled={disabled}
              className="block uppercase tracking-wide text-gray-700 m-5 border-2 p-1"
            >
              Sign Up
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
