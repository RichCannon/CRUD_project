import config from 'config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export type RequestWithId<T = {}, D = {}, S = {}, R = {}> = Request<T, D, S, R> & { myId?: string }

const middleware = (req: RequestWithId, res: Response, next: NextFunction) => {

   if (req.method === `OPTIONS`) {
      return next()
   }

   try {
      const token = req.headers && req.headers.authorization ? req.headers.authorization.split(` `)[1] : ``

      if (!token) {
         return res.status(401).json({ message: `You need to log in` })
      }

      const decoded = jwt.verify(token, config.get(`jwtSecretKey`)) as { userId: string }

      req.myId = decoded.userId
      next()

   } catch (e) {
      return res.status(401).json({ message: `You need to log in` })
   }
}

export { middleware as authMiddleware }