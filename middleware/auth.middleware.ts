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
         throw Error(`You need to log in`)

      }

      const { userId, createdAt } = jwt.verify(token, config.get(`jwtSecretKey`)) as { userId: string, createdAt: number }

      const user = await User.findOne({ _id: userId })



      if (+new Date(user!.lastTokenTimestamp) !== createdAt) {

         return res.status(401).json({ errors: [{ msg: `Invalid token`, param: `auth` }] })
      }

      if (!user) {
         return res.status(400).json({ errors: [{ msg: `User doesn't exist`, param: `auth` }] })

      }

      req.myRole = user!.role
      req.myId = userId
      next()


   } catch (e) {
      res.status(401).json({ errors: [{ msg: e.message || `You need to log in`, param: `auth` }] })
   }
}

export { middleware as authMiddleware }