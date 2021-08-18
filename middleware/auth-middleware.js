const jwt = require("jsonwebtoken")
const { validationError, authenticationError } = require("../validationAndErrors/response")
const User = require("../models/user-model")
const { TOKEN_KEY } = process.env

class authorisation {
    static getToken(req)  {
        let { headers: { authorization }} = req
        if (typeof authorization === "undefined") {
            authorization = ""
            return "authorization needed"
        }
        if (authorization && authorization.split(" ")[0] === "Bearer" || authorization.split(' ')[0] === "Token") {
            return authorization.split(" ")[1]
        }
        return null
    }

    static async decodeToken( req, res, next ) {
        const token = await authorisation.getToken(req)
        try {
            const decoded = jwt.verify(token, TOKEN_KEY)
            const user = await User.findOne({"email": decoded.email})
            if (!user) throw Error("User Doesnt't Exist Boss Mi")
            if (user._id != decoded._id) throw Error("Wrong token, boss get a valid token")
            req.user = user
            next()
            
        } catch (error) {
            return validationError(res, error)
        }
    }

    static authJSON( user ) {
        return {
            email: user.email,
            firstName: user.firstName,
            token: this.genToken(user)
        }
    }

    static genToken( user ) {
        return jwt.sign(
            {
                email: user.email,
                _id: user._id
            },
            TOKEN_KEY,
            {
                expiresIn: 3600
            }
        )
    }

    static async isAdmin(req, res, next) {
        try {
            const user = req.user.role
            if (user == "admin") {
               return next()
            }
            return res.status(401).json("Authorization Required, please see you have the right authorization.")
        } catch (error) {
            return authenticationError(res, error)
        }
    }
}
 
module.exports = authorisation