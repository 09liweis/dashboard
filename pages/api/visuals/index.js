import VisualModel from '../../../db/models/visual';

import connectDb from '../../../db/config'

connectDb()

export default async function handler(req,res) {
  try {
    const query = {};
    const opts = {limit:20};
    const visuals = await VisualModel.find(query,'',opts).sort('-date_updated')
    return res.status(200).json({ visuals})
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }

}
