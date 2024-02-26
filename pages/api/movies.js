import Movie from "../../Models/Movie";
import connectDB from "../lib/connectDB"

export default async function handler(req, res) {
  await connectDB()
  const movies = await Movie.find().sort("-date_updated");
  res.status(200).json({ movies })
}