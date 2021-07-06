import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { RequestWithId } from '../middleware/auth.middleware'
import { authRouter } from './auth.routes'


import { Profiles, ProfilesT } from './models/Profiles'
import { User } from './models/User'

//   /api/profiles
const router = Router()


type ProfilesCreateReq = ProfilesT



router.post(
   `/create`,
   authRouter,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {

         const profiles = new Profiles({ ...req.body, owner: req.myId })

         await profiles.save()
         res.status(201).json({message: `Profile succesfully created`})

      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })


router.get(
   `/:id`,
   authRouter,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {
         res.json({ data: `data` })
      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })

router.get(
   `/`,
   authRouter,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {

         const profiles = await Profiles.find({ owner: req.myId })

         res.json(profiles)

      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })



router.delete(
   `/delete`,
   authRouter,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {

      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })




router.get(
   `/users`,
   authRouter,
   async (req: RequestWithId<{}, {}, ProfilesCreateReq>, res: Response) => {
      try {
         const users = await User.find()

         res.json(users)
      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })


export { router as profilesRouter }