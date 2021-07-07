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

      const usersCount = await User.count()
      const profileCount = await Profiles.count()

      res.json({ usersCount, profileCount })

   } catch (e) {
      res.status(500).json({ errors: [{ msg: `Server error`, param: `server` }] })
   }

})

export { router as dashboardRouter }