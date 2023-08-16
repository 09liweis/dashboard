import { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { fetchAPI, setAuthToken } from '../../helpers/index';
import { USER_AUTH_API } from '../../constants';

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { name, code } = router.query;

  const fetchGithubUser = async () => {
    const response = await fetchAPI({ url: USER_AUTH_API, body: { requestToken: code } });
    if (response.token) {
      setAuthToken(response.token);
      location.href = '/'
    }
  }

  useEffect(() => {
    if (name === 'github') {
      fetchGithubUser();
    }
  }, [code]);
  return (
    <section>Auth Page</section>
  )
}

export default AuthPage;