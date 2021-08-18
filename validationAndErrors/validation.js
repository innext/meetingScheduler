const { isEmpty } = require("lodash")
const Joi = require("@hapi/joi")
const { authenticationError, badRequestError } = require("./response")
let Errors = {}

const login = (req, res) => {
    const email = Joi.string()
    .email()
    .required()
    .validate(req.body.email)

    const password = Joi.string()
    .min(8)
    .required()
    .validate(req.body.password)

    const fieldErrName = [ email, password ]
    const fieldToValidate = [ "email", "password" ]
    fieldErrName.forEach((field, index) => {
        if (!isEmpty(field.error)) {
            Errors[ fieldToValidate[ index ] ] = field.error.details[ 0 ].message.split('"')[ 2 ].trimLeft()
        }
        return null
    })
    return authenticationError(res, Errors)
}

const signup = (req, res) => {
    const fullName = Joi.string()
    .min(4)
    .required()
    .validate(req.body.fullName)

    const email = Joi.string()
    .email()
    .required()
    .validate(req.body.email)

    const password = Joi.string()
    .min(8)
    .required()
    .validate(req.body.password)

    const fieldErrName = [ fullName, email, password ]
    const fieldToValidate = [ "fullName", "email", "password" ]
    fieldErrName.forEach((field, index) => {
    if (!isEmpty(field.error)) {
        Errors[ fieldToValidate[ index ] ] = field.error.details[ 0 ].message.split('"')[ 2 ].trimLeft()
    }
        return null
    })
    return badRequestError(res, Errors)
}

const meetingInput = (req, res) => {
    const startTime = Joi.date()
    .validate(req.body.startTime)

    const endTime = Joi.date()
    .validate(req.body.endTime)

    const note = Joi.string()
    .min(3)
    .required()
    .validate(req.body.note)

    const title = Joi.string()
    .min(3)
    .required()
    .validate(req.body.title)

    const fieldErrName = [ startTime, endTime, note, title ]
    const fieldToValidate = [ "startTime", "endTime", "note", "title" ]
    fieldErrName.forEach((field, index) => {
    if (!isEmpty(field.error)) {
        Errors[ fieldToValidate[ index ] ] = field.error.details[ 0 ].message.split('"')[ 2 ].trimLeft()
    }
        return null
    })
    return badRequestError(res, Errors)
}

module.exports = {
    signup,
    login,
    meetingInput
}