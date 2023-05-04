// import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

// export async function fetchTransactions({ql}) {
//   const uri = process.env.GRAPHQL_URI;
//   const client = new ApolloClient({
//     uri,
//     cache: new InMemoryCache()
//   });
//   const {data} = await client.query({
//     query: gql`
//       ${ql}
//     `
//   });
//   return {list:data.getTransactions};
// }

export function getAuthToken() {
  return localStorage.getItem('auth-token');
}

export async function fetchAPI({ method = 'POST', url, body = {} }) {
  const opt = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': getAuthToken(),
    },
  };
  if (Object.keys(body).length) {
    opt.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, opt);
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
}

export async function fetchUser() {
  const userResponse = await fetchAPI({
    url: 'https://samliweisen.onrender.com/api/user/detail',
    body: {},
  });
  return userResponse;
}

export async function fetchToken({ eml, pwd }) {
  const response = await fetchAPI({
    url: 'https://samliweisen.onrender.com/api/user/login',
    body: { eml, pwd },
  });
  return response;
}

export async function checkUserToken() {
  const authToken = getAuthToken();
  if (authToken) {
    const userResponse = await fetchUser();
    return userResponse;
  }
  return null;
}

export const LANGUAGES = {
  en: {
    home: 'Home',
    knowledges: 'KnowLedges',
    expense: 'Expense',
    logout: 'Log Out',
    addNew: 'Add New',
    subscription: 'Subscription',
    todos: 'Todos',
    comments: 'Comments',
    blogs: 'Blogs',
    updating: 'Updating',
    update: 'Update',
    lost: 'Are you lost?'
  },
  zh: {
    home: '页面',
    knowledges: '芝士',
    expense: '消费',
    logout: '登出',
    total: '总计',
    addNew: '添加',
    subscription: '订阅',
    todos: '待办事项',
    comments: '评论',
    blogs: '博客',
    updating: '更新中',
    update: '更新',
    lost:'你迷路了吗?'
  },
};

export function getLanguageKeys() {
  return [
    { k: 'en', v: 'English' },
    { k: 'zh', v: '中文' },
  ];
}

export function getLanguages(lang) {
  return LANGUAGES[lang];
}

export function getTranslate(lang, key) {
  return lang[key] || key;
}
