const mongoose = require("mongoose")
const schedularSchema = mongoose.Schema

const Scheduler = schedularSchema({
    startTime: {
        type: Date
    },

    endTime: {
        type: Date
    },

    note: {
        type: String
    },

    title: {
        type: String
    }
})

module.exports = mongoose.model("Scheduler", Scheduler)