import { Profile } from '../entity/Profile'
import { NextFunction, Request, Response } from "express"


const NAMESPACE = 'ProfileController'

const createProfile = async (req: Request, res: Response, next: NextFunction) => {
    // Form data
    const { full_name, addrsss,email,phone,image } = req.body

    // Insert to database
    const profile = Profile.create({ full_name, addrsss, email,phone,image })
    await profile.save()

    return res.status(201).json({
        status: 'success',
        message: 'Profile inserted successfully',
        data: profile
    })
}

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const profile = await Profile.find()

    return res.status(201).json({
        status: 'success',
        message: 'User fetched successfully',
        data: profile
    })
}

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {id, full_name, addrsss,email,phone,image } = req.body

    const profile = await Profile.findOne({ where: { id: id } });

    profile.full_name = full_name || profile.full_name
    profile.addrsss = addrsss || profile.addrsss
    profile.email = email || profile.email
    profile.phone = phone || profile.phone
    await profile.save()

    if (!profile) {
        return res.status(404).json({
            status: 'success',
            message: 'Profile not found',
            data: profile
        })
    }

    return res.status(201).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: profile
    })
}

const delectProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.body

    //const user = await User.delete(parseInt(id));
    // const user = await User.softRemove([id]);
    await Profile.createQueryBuilder()
                .softDelete()
                .where("id = :id", {id: id})
                .execute()
   

    return res.status(201).json({
        status: 'success',
        message: 'Profile delected successfully',
        data: []
    })

        
}



export default {
    createProfile,
    getProfile,
    updateProfile,
    delectProfile
}