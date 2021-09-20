const mongoose = require("mongoose")
const schedularSchema = mongoose.Schema

const mainstackEmail = schedularSchema({
    email: {
        type: String,
    }
})

module.exports = mongoose.model("mainstackEmail", mainstackEmail)