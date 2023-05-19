import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';

export default function AuthPage({ setUser }) {
  const [userStatus, setUserStatus] = useState(true);
  return (
    <main>
      <div className="auth-page">
        {userStatus ? (
          <>
            <div className="left mt-4">
              <div className="image-container ml-4 w-16 h-16">
                <img
                  className="object-contain w-full h-full mt-2 rounded-md"
                  src={process.env.PUBLIC_URL + '/img/pink.avif'}
                  alt="A cartoon astronaut sitting on a planet with a laptop."
                />
              </div>

              <button
                className="underline hover:italic ml-4 text-sm"
                onClick={() => setUserStatus(!userStatus)}
              >
                Don't have an account?
              </button>
            </div>

            <LoginForm setUser={setUser} />
          </>
        ) : (
          <>
            <div className="left mt-4">
              <div className="image-container ml-4 w-16 h-16">
                <img
                  className="object-contain w-full h-full mt-2 rounded-md"
                  src={process.env.PUBLIC_URL + '/img/dab.avif'}
                  alt="A cartoon astronaut dabbing."
                />
              </div>
              <button
                className="underline hover:italic ml-4 text-sm"
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
