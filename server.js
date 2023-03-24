const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

var users = []
var IOusers = []
var pionki = [

    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],

]

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


io.on("connection", (socket) => {
    socket.on("emitMove", (data) => {
        pionki = data
        console.log("NEXT PLAYER")
        io.emit("nextPlayer", pionki)
    })
})


app.post("/handleUserCheck", (req, res) => {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(users))
})

app.use(express.static('static'))
server.listen(3000, function () {
    console.log("running on port 3000")
})

function findIndexOf(id, users) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return i
        }
    }
}