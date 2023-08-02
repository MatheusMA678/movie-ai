import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default function Hello(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name } = req.query
    return res.send({ hello: name })
  } catch (error) {
    return res.status(400).send({ error })
  }
}
