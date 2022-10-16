import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export async function fetchData({uri,ql}) {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache()
  });
  const {data} = await client.query({
    query: gql`
      ${ql}
    `
  });
  return {data};
}

export async function fetchAPI({url,body}) {
  const opt = {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(url,opt);
  const data = await response.json();
  return data;
}