import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';

import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [userStatus, setUserStatus] = useState(true);
  return (
    <main>
      <div className="auth-page">
        {userStatus ? (
          <>
            <div className="left">
              <button
                className="hover:underline italic"
                onClick={() => setUserStatus(!userStatus)}
              >
                Want to create an account?
              </button>
            </div>
            <LoginForm setUser={setUser} />
          </>
        ) : (
          <>
            <div className="left">
              <button
                className="hover:underline italic"
                onClick={() => setUserStatus(!userStatus)}
              >
                Already have an account?
              </button>
            </div>
            <SignUpForm setUser={setUser} />
          </>
        )}
      </div>
    </main>
  );
}
