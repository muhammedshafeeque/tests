import express from 'express'
import { getUsers } from '../Controller/userController.js'
const router=express.Router()
router.get('/users',getUsers)
export const userRouters=router