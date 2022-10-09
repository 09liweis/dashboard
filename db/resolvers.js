const Transaction = require('./models/transaction')

const resolvers = {
  Query: {
    // transactions
    getTransactions: async (_,{date,category}) => {
      try {
        var query = {}
        if (category) {
          query.category = category
        }
        const transactions = await Transaction.find(query)

        return transactions
      } catch (err) {
        console.log(err)
      }
    },
    getTransaction: async (_, { id }) => {
      const transaction = await Transaction.findById(id)

      if (!transaction) {
        throw new Error('Transaction not found')
      }

      return transaction
    },
  },

  Mutation: {
    // transactions
    newTransaction: async (_, { input }) => {
      try {
        const transaction = new Transaction(input)

        const result = await transaction.save()

        return result
      } catch (err) {
        console.log(err)
      }
    },
    updateTransaction: async (_, { id, input }) => {
      let transaction = await Transaction.findById(id)

      if (!transaction) {
        throw new Error('Transaction not found')
      }

      transaction = await Transaction.findOneAndUpdate({ _id: id }, input, {
        new: true,
      })

      return transaction
    },
    deleteTransaction: async (_, { id }) => {
      const transaction = await Transaction.findById(id)

      if (!transaction) {
        throw new Error('Producto no encontrado')
      }

      await Transaction.findOneAndDelete({ _id: id })

      return 'Producto eliminado'
    },
  },
}

module.exports = resolvers