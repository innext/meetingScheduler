const express = require("express")
const router = express.Router()
const { meetingInput, meetingFixed, getMainstackEmail, mainstackEmail } = require("../controller/controller")

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
    .get(
        "/ms",
        getMainstackEmail
    )
router
    .post(
        "/ms",
        mainstackEmail
    )

module.exports = router