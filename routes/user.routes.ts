import { Router, Response, Request } from "express";
import { check, validationResult } from "express-validator";
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
   async (req: RequestWithId, res: Response) => {
      try {

         if (req.myRole === `admin`) {
            const users = await User.find()

            return res.status(200).json(users.map(d => ({
               email: d.email,
               numOfProfiles: d.profiles.length,
               userName: d.userName,
               role: d.role,
               _id: `${d._id}`
            })))
         }
         else {
            return res.status(403).json({ message: `Permission denied` })
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
      check(`userName`, `Min userName length 5 symbols and max 25`)
         .isLength({ min: 5, max: 25 }),
      check(`email`, `Invalid email`).isEmail(),
   ],
   async (req: RequestWithId<{}, {}, PatchUserData>, res: Response) => {
      try {

         const { userId, ...restBody } = req.body


         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: `Wrong modify profile data format`
            })
         }

         if (req.myRole !== `admin`) {
            return res.status(403).json({ errors: [{ msg: `You don't have permission`, param: `auth` }] })

         }

         if (!userId) {
            return res.status(404).json({ errors: [{ msg: `This user doesn't exist`, param: `user` }] })
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

router.delete(
   `/delete`,
   [
      authMiddleware,
   ],
   async (req: RequestWithId<{}, {}, DeleteUserT>, res: Response) => {
      try {


         const { userId } = req.body

         if (req.myRole !== `admin`) {
            return res.status(403).json({ errors: [{ msg: `You don't have permission`, param: `user` }] })

         }

         const user = await User.findOne({ _id: userId })

         if (!user) {
            return res.status(404).json({ errors: [{ msg: `User not found`, param: `user` }] })
         }

         const data = await Profiles.deleteMany({
            _id: {
               "$in": user.profiles
            }
         })
         console.log(data)


         if (!userId) {
            return res.status(404).json({ errors: [{ msg: `This user doesn't exist`, param: `user` }] })
         }

         await User.deleteOne({ _id: userId })
         res.json({ message: `User deleted` })

      } catch (e) {
         console.log(e)
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })

export { router as userRouter }