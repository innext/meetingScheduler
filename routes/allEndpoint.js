const express = require("express")
const router = express.Router()
const { meetingInput, meetingFixed } = require("../controller/controller")

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

module.exports = router