import { useState, useRef, useEffect } from 'react';
import { motion } from "motion/react"
import { fetchToken, fetchUser, setAuthToken } from '../helpers';
import { LoginFormProps } from '../types';
import Loading from './Loading';

export default function LoginForm({ setUser, setShowLogin }: LoginFormProps) {
  const [loginLoading, setLoginLoading] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    emailInput.current?.focus();
  },[]);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      eml: emailInput?.current?.value,
      pwd: passwordInput?.current?.value,
    };
    setLoginLoading(true);
    setMsg('');
    const response = await fetchToken(body);
    if (response.token) {
      setAuthToken(response.token);
      const userResponse = await fetchUser();
      setLoginLoading(false);
      if (userResponse?.user) {
        setUser(userResponse.user);
      }
    } else {
      setLoginLoading(false);
      setMsg(response.msg);
    }
  };

  return (
    <motion.section className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />
      
      <motion.form
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden"
        onSubmit={handleLogin}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center mt-2 text-blue-100">Please sign in to continue</p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="emal" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                id="emal"
                ref={emailInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                required
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                ref={passwordInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                required
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {msg && <div className='text-red-600 p-1 text-center'>{msg}</div>}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loginLoading ? <Loading /> : 'Sign In'}
          </button>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <a
            href="https://github.com/login/oauth/authorize?client_id=105591674a9b55dc8196"
            className="w-full py-3 px-4 flex items-center justify-center space-x-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>Continue with GitHub</span>
          </a> */}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-all hover:rotate-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.form>
    </motion.section>
  );
}