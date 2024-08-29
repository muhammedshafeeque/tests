import express from 'express'
import { doLogin, doSignup } from '../Controller/AuthController.js'
const router=express.Router()
router.post('/signup',doSignup)
router.post('/login',doLogin)
export const authRouters=router