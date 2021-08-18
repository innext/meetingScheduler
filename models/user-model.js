const mongoose = require("mongoose")
const UserSchema = mongoose.Schema

const User = UserSchema({
    fullName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

module.exports = mongoose.model("User", User)