import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const TransactionSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: 'Price is required for transaction'
  },
  date: {
    type: String,
    required: 'Date is required for transaction'
  },
  uid: {
    type: Schema.Types.ObjectId
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  },
  category: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  }
})

TransactionSchema.index({ name: 'text' })

module.exports =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)