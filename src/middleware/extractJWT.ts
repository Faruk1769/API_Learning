import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const jwtConfig = {
    EXPIRE_TIME: 2592000,
    SECRET_KEY: 'superencryptedkey',
    ISSUER: 'node-express-typescript'
}

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized!'
        })
    }

    jwt.verify(token, jwtConfig.SECRET_KEY, (error, decode) => {
        if (error) {
            return res.status(404).json({
                message: error.message,
                error: error
            })
        }

        res.locals.jwt = decode
        next()
    })
}

export default extractJWT