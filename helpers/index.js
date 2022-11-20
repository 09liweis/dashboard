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

export async function fetchAPI({method='POST',url,body}) {
  const opt = {
    method,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (Object.keys(body).length) {
    opt.body = JSON.stringify(body);
  }
  const response = await fetch(url,opt);
  const data = await response.json();
  return data;
}