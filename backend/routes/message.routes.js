import express from 'express'
import { getmessage, messagesend }  from '../controllers/message.controller.js'
import protectroute from '../middleware/protectRoute.js'
const router = express.Router()
router.post('/:id',protectroute,getmessage)
router.post('/send/:id',protectroute,messagesend) 

export default router