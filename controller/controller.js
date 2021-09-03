const Scheduler = require("../models/scheduler-model")
const { customResponse } = require("../validationAndErrors/response")
const {TWILIO_ACCOUNT_SID} = process.env; 
const {TWILIO_AUTH_TOKEN} = process.env; 
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

class inputValidation {
    static async meetingInput(req, res, next) {
        let info = {
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            note: req.body.note,
            title: req.body.title
        }

        try {
            client.messages.create({ 
                body:`NEW. T:${info.title}, D:${info.startTime} N:${info.note}`,
                from: process.env.from,
                to: process.env.to 
            })
            .then(message => console.log(message.sid)) 
            .done();
            
            return new Scheduler(
                info
            ).save()
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