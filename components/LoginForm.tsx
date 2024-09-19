import { useState, useRef, useEffect } from 'react';
import { fetchToken, fetchUser, setAuthToken } from '../helpers';
import { LoginFormProps } from '../types';
import Loading from './Loading';

export default function LoginForm({ setUser, setShowLogin }: LoginFormProps) {
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
      setAuthToken(response.token);
      const userResponse = await fetchUser();
      setLoginLoading(false);
      if (userResponse?.user) {
        setUser(userResponse.user);
      }
    }
  };
  return (
    <section className="fixed w-full h-full flex justify-center items-center top-0 left-0">
      <section
        onClick={() => setShowLogin(false)}
        className="fixed bg-black/75 w-full h-full top-0 left-0"
      ></section>
      <form
        className="rounded bg-white p-3 mx-auto w-96 relative z-1"
        onSubmit={handleLogin}
      >
        <input
          ref={usernameInput}
          className="border w-full p-2 rounded mb-2"
          placeholder="User Name"
        />
        <input
          type="password"
          ref={passwordInput}
          className="border w-full p-2 rounded mb-2"
          placeholder="Password"
        />
        <button className="button">
          {loginLoading ? <Loading /> : 'Login'}
        </button>
        <a href="https://github.com/login/oauth/authorize?client_id=105591674a9b55dc8196" className="button"><i className="fa-brands fa-github"></i> Github Login</a>
      </form>
    </section>
  );
}
