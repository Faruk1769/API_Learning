import jwt from 'jsonwebtoken'

const jwtConfig = {
    EXPIRE_TIME: 2592000,
    SECRET_KEY: 'superencryptedkey',
    ISSUER: 'node-express-typescript'
}

const signJWT = (user: any, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinceEpoch = new Date().getTime()
    var expirationTime = timeSinceEpoch + Number(jwtConfig.EXPIRE_TIME) * 1000
    var expirationTimeInSecond = Math.floor(expirationTime / 1000)

    try {
        jwt.sign (
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            jwtConfig.SECRET_KEY,
            {
                issuer: jwtConfig.ISSUER,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSecond
            },
            (error, token) => {
                if (error) {
                    callback (error, null)
                } else if (token) {
                    callback (null, token)
                }
            })
    } catch (error) {
        console.log(error)
    }
}

export default signJWT