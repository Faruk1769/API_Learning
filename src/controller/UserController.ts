import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import bcrypt from 'bcrypt'
import signJWT from "../functions/signJWT"

const NAMESPACE = 'UserController'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find()

    return res.status(201).json({
        status: 'success',
        message: 'User fetched successfully',
        data: user
    })
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
     // Form data
     const { name,email, password } = req.body

     // Insert to database
     const user = User.create({ name,email, password })
     await user.save()
 
     return res.status(201).json({
         status: 'success',
         message: 'User inserted successfully',
         data: user
     })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name,email } = req.body

    const user = await User.findOne({ where: { id: id } });

    user.name = name || user.name
    user.email = email || user.email
    await user.save()

    if (!user) {
        return res.status(404).json({
            status: 'success',
            message: 'User not found',
            data: user
        })
    }

    return res.status(201).json({
        status: 'success',
        message: 'User updated successfully',
        data: user
    })
}

const delectUser = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.body

    //const user = await User.delete(parseInt(id));
    // const user = await User.softRemove([id]);
    await User.createQueryBuilder()
                .softDelete()
                .where("id = :id", {id: id})
                .execute()
   

    return res.status(201).json({
        status: 'success',
        message: 'User delected successfully',
        data: []
    })

        
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email,password } = req.body

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return res.status(404).json({
            status: 'success',
            message: 'User not found'
        })
    }

    const matched = await bcrypt.compare(password, user.password)

    if (!matched) {
        return res.status(200).json({
            status: 'success',
            message: 'Your email or password is incorrect!'
        })
    }

    signJWT (user, (error, token) => {
        if (error) {
            return res.status(200).json({
                status: 'error',
                message: error.message,
                error: error
            })
        } else if (token) {
            return res.status(200).json({
                status: 'success',
                message: 'Login success',
                token: token
            })
        }
    })
}

export default {
    getUser,
    createUser,
    delectUser,
    updateUser,
    login 

}