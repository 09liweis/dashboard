import type { NextApiRequest, NextApiResponse } from 'next';
import Movie from "../../Models/Movie";
import connectDB from "../../lib/connectDB"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB()
    const limit = 10;
    let page: string = req.query.page ? req.query.page.toString() : "1";
    const skip: number = (parseInt(page) - 1) * limit;
    const movies = await Movie.find().skip(skip).limit(limit).sort("-date_updated");
    const total = await Movie.countDocuments();
    return res.status(200).json({ total, page, movies })
  } catch (error: any) {
    return res.status(500).json({ error: error.toString() });
  }
}