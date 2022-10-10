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