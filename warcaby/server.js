const express = require("express")
const app = express()

var users = []

app.use(express.json())
app.post("/handleLogin", (req, res) => {
    console.log("REQ.BODY", req.body)

    if (users.length == 0) {

        users.push(req.body)
        console.log("ADDED FIRST USER: ", users)
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ status: "USER_JOINED" }))

    } else if (users.length == 1 && users[0].login != req.body.login) {

        users.push(req.body)
        console.log("ADDED SECOND USER: ", users)
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ status: "USER_JOINED" }))

    } else if (users.length >= 2) {

        console.log("TO MANY USERS: ", users)
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ status: "MAX_USERS" }))

    } else if (users[0].login == req.body.login) {

        console.log("USER ALREADY EXISTS: ", users)
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ status: "USER_ALREADY_EXISTS" }))
    }
})

app.post("/handleUserCheck", (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(users))
})

app.use(express.static('static'))
app.listen(3000, function () {
    console.log("running on port 3000")
})