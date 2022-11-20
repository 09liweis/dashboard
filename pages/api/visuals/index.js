import VisualModel from '../../../db/models/visual';

import connectDb from '../../../db/config'

connectDb()

export default async function handler(req,res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  const method = req.method;
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
      const doc = await Character.findOneAndUpdate(filter, update, {
        returnOriginal: false
      });

      return res.status(200).json({visual:doc});
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }

}
