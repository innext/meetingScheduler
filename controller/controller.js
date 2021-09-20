const Scheduler = require("../models/scheduler-model")
const mainstackEmail = require("../models/mainstackEmail")
const { customResponse } = require("../validationAndErrors/response")
const {TWILIO_ACCOUNT_SID} = process.env; 
const {TWILIO_AUTH_TOKEN} = process.env;
const { from, to } = process.env
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
                from: from,
                to: to 
            })
            .then(message => console.log(message.sid)) 
            .done();

            const newData = new Scheduler({
                startTime: info.startTime,
                endTime: info.endTime,
                note: info.note,
                title: info.title
            }).save()
            res.json(newData)
        } catch (error) {
            next(error)
        }
    }

    static async meetingFixed(req, res, next) {
        Scheduler.find().sort({$natural:-1})
        .then( (response) => {return customResponse(res, 200, "Here's the list of all meetings", response)} )
        .catch((error) => { next(error)})
    }

    static async mainstackEmail(req, res, next) {
        const { email } = req.body
        console.log(email)
        try {
            const newData = new mainstackEmail({ email }).save()
            res.json(newData)
        } catch (error) {
            next(error)
        }
    }

    static async getMainstackEmail(req, res, next) {
        mainstackEmail.find().sort({$natural: -1})
        .then((resp) => { return customResponse( res, 200, "Here is all mainstack waiting list", resp)})
        .catch((error) => { next(error)})
    }
}

module.exports = inputValidation