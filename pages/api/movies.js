import Movie from "../../Models/Movie";
import connectDB from "../../lib/connectDB"

export default async function handler(req, res) {
  try {
    await connectDB()
    const movies = await Movie.find().limit(50).sort("-date_updated");
    res.status(200).json({ movies })
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}