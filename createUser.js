const user = require("./models/user-model")
const passAuth = require("./middleware/passwordHash-middleware")

let adminName = "admin",
    password = "Password&123",
    email = "admin@testmail.com",
    role = "admin"

async function adminUser(name, password, email, role) {
    try {
        let unhashPassword = password
        password = passAuth.hashPassword(password)
        await new user({
            name,
            password,
            email,
            role
        }).save()
        console.log(`Here is the login details for ${role}, email: ${email}, password: ${unhashPassword}`)
    }  catch (error) {
        throw error
    }
}

adminUser(adminName, password, email, role)