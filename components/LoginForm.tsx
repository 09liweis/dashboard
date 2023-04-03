import { useState, useRef, useEffect } from 'react';
import { buttonStyle } from '../constants';
import { fetchToken, fetchUser } from '../helpers';
import { LoginFormProps } from '../types';
import Loading from './Loading';

export default function LoginForm({ setUser }: LoginFormProps) {
  const [loginLoading, setLoginLoading] = useState(false);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      eml: usernameInput?.current?.value,
      pwd: passwordInput?.current?.value,
    };
    setLoginLoading(true);
    const response = await fetchToken(body);
    if (response.token) {
      localStorage.setItem('auth-token', response.token);
      const userResponse = await fetchUser();
      setLoginLoading(false);
      if (userResponse?.user) {
        setUser(userResponse.user);
      }
    }
  };
  return (
    <section className="fixed bg-black w-full h-full flex justify-center items-center top-0 left-0">
      <form className="bg-white p-3 mx-auto w-96" onSubmit={handleLogin}>
        <input
          ref={usernameInput}
          className="border w-full p-3 rounded mb-2"
          placeholder="User Name"
        />
        <input
          ref={passwordInput}
          className="border w-full p-3 rounded mb-2"
          placeholder="Password"
        />
        <button className={buttonStyle}>
          {loginLoading ? <Loading /> : 'Login'}
        </button>
      </form>
    </section>
  );
}
