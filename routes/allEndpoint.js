const express = require("express")
const { decodeToken, isAdmin } = require("../middleware/auth-middleware")
const router = express.Router()
const { signup, login, meetingInput, allMeetings, meetingFixed } = require("../controller/controlValidation")

router
    .get(
        "/",
        meetingFixed
    )

router
    .post(
        "/",
        meetingInput
    )

router
    .post(
        "/login",
        login
    )

router
    .post(
        "/signup",
        //isAdmin,
        signup
    )

router
    .get(
        "/admin",
        allMeetings
    )

module.exports = router