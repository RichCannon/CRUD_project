import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'

import { User } from './models/User'

const router = Router()

type ReqRegisterT = {
   email: string
   password: string
   role: `admin` | `user`
   userName: string
}

type ReqLoginT = {
   email: string
   password: string
}

router.post(
   `/register`,
   [
      check(`email`, `Invalid email`).isEmail(),
      check(`password`, `Min password length 5 symbols and max 25`)
         .isLength({ min: 5, max: 25 }),
      check(`userName`, `Min userName length 5 symbols and max 25`)
         .isLength({ min: 5, max: 25 })
   ],
   async (req: Request<{}, {}, ReqRegisterT>, res: Response) => {
      try {
         console.log(`BODY:`,req.body)
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: `Wrong registration data format`
            })
         }

         const { email, password, role, userName } = req.body

         const candidate = await User.findOne({ email })

         if (candidate) {
            return res.status(400).json({ message: `This user alreasy exist` })
         }

         const hashedPass = await bcrypt.hash(password, 11)
         const user = new User({ email, password: hashedPass, role, userName })

         await user.save()

         res.status(201).json({ message: `User created succesfuly!` })


      } catch (e) {
         res.status(500).json({ message: `Server error: ${e.message}` })
      }
   })


router.post(
   `/login`,
   [
      check(`email`, `Enter correct email`).normalizeEmail().isEmail(),
      check(`password`, `Enter password`).exists()
   ],
   async (req: Request<{}, {}, ReqLoginT>, res: Response) => {
      try {

         const errors = validationResult(req)


         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: `Wrong registration data format`
            })
         }

         const { email, password } = req.body

         const user = await User.findOne({ email })

         if (!user) {
            return res.status(400).json({ message: `User doesn't exist` })
         }

         const isMatchPass = await bcrypt.compare(password, user.password)

         if (!isMatchPass) {
            return res.status(400).json({ message: `Wrong password or email (password)` })
         }



         const token = jwt.sign(
            { userId: user.id },
            config.get(`jwtSecretKey`),
            { expiresIn: `30d` }
         )

         res.json({ token, userId: user.id })


      } catch (e) {
         res.status(500).json({ message: `Server error: ${e.message}` })
      }
   })

export { router as authRouter }