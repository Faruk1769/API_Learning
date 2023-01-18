import { Task } from './../entity/Task';
import { NextFunction, Request, Response } from "express"

const NAMESPACE = 'TaskController'

const getTask = async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.find()

    return res.status(201).json({
        status: 'success',
        message: 'User fetched successfully',
        data: task,
        //user: req.res?.locals.jwt
    })
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
    // Form data
    const { title, note } = req.body

    // Insert to database
    const task = Task.create({ title, note })
    await task.save()

    return res.status(201).json({
        status: 'success',
        message: 'User inserted successfully',
        data: task
    })
}

export default {
    getTask,
    createTask
}