import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const VisualSchema = new Schema({
  douban_id:{
    type:String,
    unique:true
  },
  douban_rating:{
    type:Number
  },
  title: {
    type:String
  },
  imdb_id:{
    type:String
  },
  imdb_rating:{
    type:Number
  },
  release_date:{
    type:String
  },
  visual_type:{
    type:String
  },
  poster:{
    type:String
  },
  current_episode:{
    type:Number
  },
  episodes:{
    type:Number
  },
  date_watched:{
    type: Date
  },
  date_updated:{
    type: Date
  }
});

VisualSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.date_updated = currentDate;
  if (!this.date_watched) {
      this.date_watched = currentDate;
  }
  next();
});

module.exports =
  mongoose.models.Visual || mongoose.model('Visual', VisualSchema)