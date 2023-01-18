import 'reflect-metadata'
import express, { response } from 'express'
import UserController from '../controller/UserController'
import TaskController from '../controller/TaskController'
import extractJWT from '../middleware/extractJWT'
const router = express.Router()

// Get for call from db or static pages
//task table
router.get('/get-task', extractJWT, TaskController.getTask)

// Post for form submit or insert data to database
//task table
router.post('/create-task', TaskController.createTask)

//User table
router.get('/get-user', UserController.getUser)

//user table
router.post('/create-user', UserController.createUser)

// Update a user
router.put('/update-user', UserController.updateUser)

router.delete('/delect-user', UserController.delectUser)

router.post('/login', UserController.login)

export = router