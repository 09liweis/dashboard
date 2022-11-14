import CommentModel from '../../db/models/comment';

import connectDb from '../../db/config'

connectDb()

export default async function handler(req,res) {
  try {
    const comments = await CommentModel.find({},'',{}).sort('-created_at')
    return res.status(200).json({ comments })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }

}
