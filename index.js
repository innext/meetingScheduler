require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { PORT } = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", require("./routes/index"))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    })

app.listen(PORT, async () => {
    await require("./config/mongodb")()
    console.log(`::> Server listening on port ${ PORT } @ http://localhost:${ PORT }`)
})

module.exports = app