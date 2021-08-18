const { isEmpty } = require("lodash")
const Service = require("./servce")
const Scheduler = require("../models/scheduler-model")
const { customResponse, validationError, conflictError } = require("../validationAndErrors/response")
const { login, signup, meetingInput } = require("../validationAndErrors/validation")
const { BASE_URL } = process.env

class inputValidation {
    static async signup(req, res, next) {
        const validate = signup(req, res)
        if ( !isEmpty (validate) ) return validationError(res, "validation error")
        const checkUser = await Service.findUserByEmail(req.body.email)
        if (checkUser) return conflictError(res, "user with email exists")
        
        try {
           const newUser = await Service.createUserInstant( req )
           return customResponse(res, 201, "User created", newUser)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        const validate = login(req, res)
        if ( !isEmpty (validate) ) return validationError(res, "validation error: ensure email and password are correct")
        try {
            const user = await Service.loginUserInstant( req )
            await res.cookie("locale", "test", { token: user.token, domain: BASE_URL, secure: true, sameSite: "none", maxAge: new Date() * 0.001 + 300 })
            return customResponse(res, 201, "user loggedin", user)
        } catch (error) {
            next(error)
        }
    }

    static async meetingInput(req, res, next) {
        //const validate = meetingInput(req, res)
        //if(!isEmpty(validate)) return validationError(res, "Make sure date isnt the same with date.now() and not more than 6 months from now")
        try {
            return new Scheduler({
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                note: req.body.note,
                title: req.body.title
            }).save()

            //const newMeeting = await Service.createMeetingInstant
            //return customResponse(res, 201, "User created", newMeeting)
        } catch (error) {
            next(error)
        }
    }

    static async meetingFixed(req, res, next) {
        // const scheduler = Service.getAllMeetingTime
        Scheduler.find()
        .then( (response) => {return customResponse(res, 200, "Here's the list of all meetings", response)} )
        .catch((error) => { next(error)})
    }

    static async allMeetings(req, res, next) {
        try {
            // const scheduler = await Service.getAllMeetingTime
            const meetingInfo = await Scheduler.find()
            return customResponse(res, 200,"Here's the full list of all meetings" ,meetingInfo)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = inputValidation