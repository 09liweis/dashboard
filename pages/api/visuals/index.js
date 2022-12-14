import NextCors from 'nextjs-cors';
import VisualModel from '../../../db/models/visual';

import connectDb from '../../../db/config'

connectDb()

export default async function handler(req,res) {
  const method = req.method;
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    if (method == 'GET') {
      const query = {};
      const opts = {limit:20};
      const visuals = await VisualModel.find(query,'',opts).sort('-date_updated')
      return res.status(200).json({ visuals})
    } else if (method == 'POST') {
      const update = req.body;
      if (!update.douban_id) {
        return res.status(200).json({msg:'No douban id'});
      }
      const filter = {douban_id:update.douban_id};
      update.date_updated = new Date();
      if (!update._id) {
        update.date_watched = new Date();
      }
      const doc = await VisualModel.findOneAndUpdate(filter, update, { new: true, upsert: true });

      return res.status(200).json({visual:doc});
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }

}
