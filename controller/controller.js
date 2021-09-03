const Scheduler = require("../models/scheduler-model")
const { customResponse } = require("../validationAndErrors/response")

class inputValidation {
    static async meetingInput(req, res, next) {
        try {
            return new Scheduler({
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                note: req.body.note,
                title: req.body.title
            }).save()
        } catch (error) {
            next(error)
        }
    }

    static async meetingFixed(req, res, next) {
        Scheduler.find().sort({$natural:-1})
        .then( (response) => {return customResponse(res, 200, "Here's the list of all meetings", response)} )
        .catch((error) => { next(error)})
    }
}

module.exports = inputValidation