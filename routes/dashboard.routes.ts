import {
   Router,
   Request,
   Response
} from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { Profiles } from "./models/Profiles"
import { User } from "./models/User"

const router = Router()

router.get(`/`, authMiddleware, async (req: Request<{}, {}, {}>, res: Response) => {
   try {

      const usersCount = await User.countDocuments()
      const profileCount = await Profiles.countDocuments()

      // Check if differenct between birthdate and date now in ms
      // greater than {ms18years}, return {isOver18} true, else false

      const ms18years = 568080000000 // 18 years old in ms

      const profileOver18 = await Profiles.aggregate([{
         "$project": {
            isOver18: {
               "$gt": [
                  { "$subtract": [Date.now(), "$birthdate"] }, ms18years
               ]
            }
         }
      }])

      const mapOver18 = profileOver18.filter(d => d.isOver18)

      res.json({ usersCount, profileCount, profileOver18: mapOver18.length })

   } catch (e) {
      console.log(e)
      res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
   }

})

export { router as dashboardRouter }