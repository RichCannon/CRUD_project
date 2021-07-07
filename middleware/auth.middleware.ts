import config from 'config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../routes/models/User'

export type RequestWithId<T = {}, D = {}, S = {}, R = {}> = Request<T, D, S, R> & { myId?: string, myRole?: `admin` | `user` }

const middleware = async (req: RequestWithId, res: Response, next: NextFunction) => {

   if (req.method === `OPTIONS`) {
      return next()
   }

   try {
      const token = req.headers && req.headers.authorization ? req.headers.authorization.split(` `)[1] : ``


      if (!token) {
         return res.status(401).json({ message: `You need to log in` })
      }

      const { userId } = jwt.verify(token, config.get(`jwtSecretKey`)) as { userId: string }

      const user = await User.findOne({ _id: userId })


      if (!user) {
         res.status(400).json({ message: `User doesn't exist` })

      }

      req.myRole = user!.role
      req.myId = userId
      next()


   } catch (e) {
      res.status(401).json({ message: `You need to log in` })
   }
}

export { middleware as authMiddleware }