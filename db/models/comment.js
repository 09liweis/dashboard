import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CommentSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  ip: {
    type:String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
      this.created_at = currentDate;
  }
  next();
});

module.exports =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema)