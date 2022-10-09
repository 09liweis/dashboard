import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  # Transactions
  type Transaction {
    id: ID
    title: String
    price: Float
    date: String
    category: String
  }

  input TransactionInput {
    title: String
    price: Float!
    date: String!
    category: String!
  }

  type Query {
    getTransactions(category:String,date:String): [Transaction]
    getTransaction(id: ID!): Transaction
  }

  type Mutation {
    #Transactions
    newTransaction(input: TransactionInput): Transaction
    updateTransaction(id: ID!, input: TransactionInput): Transaction
    deleteTransaction(id: ID!): String
  }
`

module.exports = typeDefs