import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

import { authMiddleware, RequestWithId } from '../middleware/auth.middleware'
import { birthdateValidate } from '../middleware/validators'
import { authRouter } from './auth.routes'


import { Profiles, ProfilesT } from './models/Profiles'
import { User } from './models/User'

//   /api/profiles
const router = Router()


type ProfilesCreateReq = ProfilesT


// Request to create profile
router.post(
   `/create`,
   [
      authMiddleware,
      check(`name`, `Enter data`).notEmpty(),
      check(`city`, `Enter data`).notEmpty(),
      check(`birthdate`, `Date must be DD.MM.YYYY`).custom(birthdateValidate),
   ],
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {


         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: `Wrong create profile data format`
            })
         }

         const profiles = new Profiles({ ...req.body, owner: req.myId })
         await User.updateOne({ _id: req.myId }, {
            "$push": {
               profiles: profiles._id
            }
         })

         await profiles.save()
         res.status(201).json({ message: `Profile succesfully created` })

      } catch (e) {
         console.log(e)
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })


type ProfilesModifyReq = ProfilesCreateReq & {
   _id: string
   owner: string
}

// Request to modify profile
router.patch(
   `/modify`,
   [
      authMiddleware,
      check(`name`, `Enter data`).notEmpty(),
      check(`city`, `Enter data`).notEmpty(),
      check(`birthdate`, `Date must be DD.MM.YYYY`).custom(birthdateValidate),
   ],
   async (req: RequestWithId<{}, {}, ProfilesModifyReq>, res: Response) => {
      try {

         const { _id, owner, ...restBody } = req.body
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: `Wrong edit profile data format`
            })
         }

         const profile = await Profiles.findOne({ _id })

         if (!profile) {
            throw { errors: [{ msg: `Profile doesn't exit`, param: `server` }] }
         }

         if (`${profile.owner}` === req.myId || req.myRole === `admin`) {
            await Profiles.updateOne({ _id }, restBody)
            res.json({ message: `Profile succesfully updated!` })
         }
         else {
            res.status(400).json({ errors: [{ msg: `Profile is not yours`, param: `server` }] })
         }

         // res.status(201).json({ message: `Profile succesfully modified` })

      } catch (e) {
         console.log(e)
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })


router.get(
   `/:id`,
   authMiddleware,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {
         res.json({ data: `data` })
      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })


// Get my profiles
router.get(
   `/`,
   authMiddleware,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {

         const profiles = await Profiles.find({ owner: req.myId })

         res.json(profiles)

      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })



type DeleteProfileReq = {
   _id: string
}


router.delete(
   `/delete`,
   authMiddleware,
   async (req: RequestWithId<{}, {}, DeleteProfileReq>, res: Response) => {
      try {

         const profile = await Profiles.findOne({ _id: req.body._id })

         if (!profile) {
            return res.status(400).json({ message: `This profile doesn't exist` })
         }

         if (`${profile.owner}` === req.myId || req.myRole === `admin`) {
            await Profiles.deleteOne({ _id: req.body._id })
            await User.updateOne({ _id: req.myId }, {
               "$pull": {
                  profiles: req.body._id
               }
            })
            res.json({ message: `Profile succesfully deleted!` })
         }
         else {
            return res.status(400).json({ errors: [{ msg: `Profile is not yours`, param: `server` }] })
         }

         // res.status(201).json({ message: `Profile succesfully modified` })

      } catch (e) {
         console.log(e)
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })







export { router as profilesRouter }