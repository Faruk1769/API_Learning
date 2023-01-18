import 'reflect-metadata'
import express, { response } from 'express'
import ProfileController from '../controller/ProfileController'
const router = express.Router()

router.post('/create-profile', ProfileController.createProfile)

router.get('/get-profile', ProfileController.getProfile)

router.put('/update-profile', ProfileController.updateProfile)

router.delete('/delect-profile', ProfileController.delectProfile)

export = router