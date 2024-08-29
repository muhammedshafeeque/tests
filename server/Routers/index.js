import express from 'express'
import { authRouters } from './auth.js'
import { userRouters } from './user.js'

const router=express.Router()
router.use('/auth',authRouters)
router.use('/user',userRouters)

export default router