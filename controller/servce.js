const User = require("../models/user-model")
const Scheduler = require("../models/scheduler-model")
const { authenticationError, notFoundError, serverUnavailable } = require("../validationAndErrors/response")

class Service {
    static async createUserInstant(req, res) {
        let password = req.body.password
        password = hashPassword(password)
        try {
            return new User({
                email: req.body.email,
                fullName: req.body.fullName,
                password: password
            }).save()
        } catch (error) {
            return serverUnavailable(res, error)
        }
    }

    static async findUserByEmail( email ) {
        return await User.findOne({email: email})
    }
 
    static async loginUserInstant( req, res ) {
         const user =  await this.findUserByEmail(req.body.email)
         let password = req.body.password
         const isCorrect = compareHash(password, user.password)
 
         try {
            if (!isCorrect) return authenticationError(res, "password or email not correct")
            if (isCorrect) return authJSON(user)
         } catch (error) {
            return serverUnavailable(res, error)
         }
    }

    static async getAllMeetingTime( req, res ) {
        try {
            const meetingInfo = await Scheduler.find()
        } catch (error) {
            return notFoundError(res, error)
        }
    }

    static async createMeetingInstant( req, res ) {
        console.log(req.body, "this from service to save to db")
        try {
            return new Scheduler({
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                note: req.body.note,
                title: req.body.title
            }).save()
        } catch (error) {
            return serverUnavailable(res, error)
        }
    }
}

module.exports = Service