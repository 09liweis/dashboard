// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(os.cpus()[0]);
  let currentOS = {
    name: os.type(),
    architecture: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version(),
  };

  console.log(currentOS);
  console.log(`The server has been up for ${os.uptime()} seconds.`);
  console.log(os.userInfo());
  console.log(os.networkInterfaces());

  res.status(200).json({ name: 'John Doe' });
}
