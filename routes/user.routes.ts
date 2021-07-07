import { Router, Response, Request } from "express";

import { authMiddleware, RequestWithId } from "../middleware/auth.middleware";
import { User } from "./models/User";

const router = Router()


type GetProfileParams = {
   id: string
}

router.get(`/:id`,
   authMiddleware,
   async (req: RequestWithId<GetProfileParams, {}, {}>, res: Response) => {
      try {
         const userId = req.params.id

         if (!userId) {
            res.status(400).json({ message: `Empty user id` })
         }

         const user = await User.findOne({ _id: userId })

         if (!user) {
            return res.status(400).json({ message: `This user doesn't exist` })
         }


         res.json({ userName: user.userName, email: user.email, role: user.role })

      } catch (e) {

      }
   })

router.get(
   `/`,
   authMiddleware,
   async (req: RequestWithId<{}, {}, {}>, res: Response) => {
      try {

         if (req.myRole === `admin`) {
            const users = await User.find()
            
            res.json(users.map(d => ({
               email: d.email,
               numOfProfiles: d.profiles.length,
               userName: d.userName,
               role: d.role,
               _id: `${d._id}`
            })))
         }
         else {
            res.status(403).json({ message: `Permission denied` })
         }
      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })

export { router as userRouter }