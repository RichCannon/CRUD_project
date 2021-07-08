import { Router, Response, Request } from "express";
import { check } from "express-validator";
import { RoleT } from "../client/src/types/types";

import { authMiddleware, RequestWithId } from "../middleware/auth.middleware";
import { Profiles } from "./models/Profiles";
import { User } from "./models/User";

const router = Router()


type GetProfileParams = {
   id: string
}

router.get(
   `/:id`,
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


type PatchUserData = {
   userName: string
   email: string
   role: RoleT
   userId: string
}

router.patch(
   `/modify`,
   [
      authMiddleware,
      check(`email`, `Enter data`).notEmpty(),
      check(`userName`, `Enter data`).notEmpty(),
   ],
   async (req: RequestWithId<{}, {}, PatchUserData>, res: Response) => {
      try {


         const { userId, ...restBody } = req.body

         if (req.myRole !== `admin`) {
            return res.status(403).json({ message: `You don't have permission` })
         }


         if (!userId) {
            return res.status(404).json({ message: `This user doesn't exist` })
         }

         await User.updateOne({ _id: userId }, restBody)
         res.json({ message: `User modified succesfully` })

      } catch (e) {
         console.log(e)
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })


type DeleteUserT = {
   userId: string
}


// 60e6c06ef76f5740d64906cd
// 60e6d3db0e4b135370d7b6a1
router.delete(
   `/delete`,
   [
      authMiddleware,
   ],
   async (req: RequestWithId<{}, {}, DeleteUserT>, res: Response) => {
      try {


         const { userId } = req.body

         if (req.myRole !== `admin`) {
            return res.status(403).json({ message: `You don't have permission` })
         }

         const user = await User.findOne({ _id: userId })

         if (!user) {
            return res.status(404).json({ message: `User not found` })
         }

         const data = await Profiles.deleteMany({
            _id: {
               "$in": user.profiles
            }
         })
         console.log(data)


         if (!userId) {
            return res.status(404).json({ message: `This user doesn't exist` })
         }

         await User.deleteOne({ _id: userId })
         res.json({ message: `User modified deleted` })

      } catch (e) {
         console.log(e)
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })

export { router as userRouter }