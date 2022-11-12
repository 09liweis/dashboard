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