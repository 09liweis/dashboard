// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  error?: string,
  msg?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    return res.status(200).json({msg:'GET request'});
  } else if (req.method === 'POST') {
    const email:string = req.body;
    if (!email || !email.length) {
      res.status(200).json({ error: "Please enter a email address" })
    }
    try {
      const { url, data, headers } = getRequestParams(email);
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      res.status(200).json({
        msg: 'You have successfully subscribed',
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error:"Please try again!!",
      });
    }
  }
}

function getRequestParams(email:string) {
  const API_KEY:string = process.env.MAILCHIMP_API_KEY as string;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const DATACENTER:string = API_KEY?.split('-')[1];
  const API_URL:string = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString('base64');
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64ApiKey}`,
  };
  return { url:API_URL, data, headers };

}