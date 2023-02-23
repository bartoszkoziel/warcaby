const express = require("express")
const app = express()
const path = require("path")

app.use(express.json())

var players = []

app.post("/handleLogin", function (req, res) {
    console.log(req.body)

    if (players.length < 2) {
        let color = ""
        if (players.length == 1) {
            color = "black"
        } else if (players.length == 0) {
            color = "white"
        }

        let player = {
            login: req.body.login,
            color: color
        }
        players.push(player)
        console.log(players);
    }
})

app.post("/handleCheckIfReady", function (req, res) {
    res.setHeader('content-type', 'application/json')
    if (players.length == 1) res.end(JSON.stringify({ ready: false }))
    if (players.length == 2) res.end(JSON.stringify({ ready: true }))

})

app.use(express.static('static'))
app.listen(3000, function () {
    console.log("running on port 3000")
})