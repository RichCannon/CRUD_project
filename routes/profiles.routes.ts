import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

import { authMiddleware, RequestWithId } from '../middleware/auth.middleware'
import { birthdateGtThDateNow, birthdateValidate } from '../middleware/validators'


import { Profiles, ProfilesT } from './models/Profiles'
import { User } from './models/User'

//   /api/profiles
const router = Router()


type ProfilesCreateReq = {
   name: string,
   gender: `male` | 'female'
   birthdate: string
   city: string
   owner?: string
   _id?: string
}


const birthdateToMs = (date: string) => {
   const frmtdBirthdateArr = date.split(`.`)
   return +new Date(+frmtdBirthdateArr[2], +frmtdBirthdateArr[1] - 1, +frmtdBirthdateArr[0])
}






// Request to create profile
router.post(
   `/create`,
   [
      authMiddleware,
      check(`name`, `Enter data`).notEmpty(),
      check(`city`, `Enter data`).notEmpty(),
      check(`birthdate`, `Date must be DD.MM.YYYY`).custom(birthdateValidate),
      check(`birthdate`, `Birthdate can't be greater than today date`).custom(birthdateGtThDateNow),
      
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

         const { birthdate, ...restBody } = req.body

         const msBirthdate = birthdateToMs(birthdate)

         // if (msBirthdate >= Date.now()) {
         //    return res.status(400).json({ errors: [{ msg: `Birthdate can't be greater than today date`, param: `birthdate` }] })
         // }

         const profiles = new Profiles({ ...restBody, birthdate: msBirthdate, owner: req.myId })
         // Add objectId of profile to users profile
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
      check(`birthdate`, `Birthdate can't be greater than today date`).custom(birthdateGtThDateNow),
   ],
   async (req: RequestWithId<{}, {}, ProfilesModifyReq>, res: Response) => {
      try {

         const { _id, birthdate, ...restBody } = req.body


         const msBirthdate = birthdateToMs(birthdate)

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

         // Update profile if you are owner or admin
         if (`${profile.owner}` === req.myId || req.myRole === `admin`) {
            await Profiles.updateOne({ _id }, { ...restBody, birthdate: msBirthdate })
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




// Get my profiles
router.get(
   `/:id?`,
   authMiddleware,
   async (req: RequestWithId<{ id: string }, {}, ProfilesCreateReq>, res: Response) => {
      try {

         // Get profiles of user 
         // If you are admin you can get profiles of all users 
         // If you are user you get only yours profile
         const profiles = await Profiles.find(
            {
               owner: req.params.id && (req.myRole === `admin`)
                  ? req.params.id
                  : req.myId
            }
         )

         res.json(profiles)

      } catch (e) {
         res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
      }
   })



type DeleteProfileReq = {
   _id: string
   userId: string
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
            // Remove objectId from users profile
            await User.updateOne({ _id: req.body.userId }, {
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