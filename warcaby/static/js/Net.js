class Net {
    constructor() {
        console.log("Net.js")

        socket.on("nextPlayer", (msg) => {
            console.log(msg)
            game.pionki = msg
            game.updateBoard()

            if (game.token == true) {
                game.token = false
            } else if (game.token == false) {
                game.token = true
            }
        })
    }

    btnLoginFetch() {
        let login = document.getElementById("tbLogin").value
        console.log("LOGIN : ", login)

        const body = JSON.stringify({ login: login })

        const headers = { "Content-Type": "application/json" }

        return fetch("/handleLogin", { method: "post", body, headers })
            .then(response => response.json())
            .then(data => {
                return data.status
            })
    }

    userCheck() {
        const body = JSON.stringify({ a: 1 })
        const headers = { "Content-Type": "application/json" }

        return fetch("/handleUserCheck", { method: "post", body, headers })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }

    emitMove(pionki) {
        socket.emit("emitMove", pionki)
    }
}