import mongoose from "mongoose";

const Movie = mongoose.Schema({
  title: String,
  douban_id: String,
  douban_rating: Number,
  poster: String,
  imdb_id: String,
  imdb_rating: Number,
  visual_type: String,
  genres: [String],
  languages: [String],
  countries: [String],
  current_episode: {
    type: Number,
    default: 0,
  },
  episodes: {
    type: Number,
    default: 1,
  },
  date_watched: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Movie || mongoose.model("Visual", Movie);