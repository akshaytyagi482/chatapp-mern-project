import express from "express";
import { getuserside } from "../controllers/sidebaruser.controllers.js"
import protectroute from "../middleware/protectRoute.js";
const router = express.Router()

router.post('/',protectroute,getuserside)

export default router