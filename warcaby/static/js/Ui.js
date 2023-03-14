class Ui {
    constructor() {
        console.log("Ui.js")
        this.btnReset = document.getElementById("btnReset")
        this.btnLogin = document.getElementById("btnLogin")

        this.btnLogin.addEventListener("click", this.btnLoginClick)
        this.btnReset.addEventListener("click", this.btnResetClick)
    }

    async btnLoginClick() {
        let status = await net.btnLoginFetch() // "USER_JOINED", "MAX_USERS", "USER_ALREADY_EXISTS"
        let users = await net.userCheck()
        let lblStatus = document.getElementById("status")
        let lblLogin = document.getElementById("login")

        console.log("DATA.STATUS : ", status)
        lblStatus.innerHTML = "STATUS : " + status

        let userCheckInterval

        if (status == "USER_JOINED" && users.length == 1) {    // POMYSLNIE DOŁĄCZONO ALE NIE MA DRUGIEGO GRACZA
            document.getElementById("logowanie").style.display = "none"
            lblLogin.style.display = "block"
            lblLogin.innerHTML = "LOGIN : " + users[0].login
            game.piecesColor = "white"
            document.getElementById("waitscreen").style.display = "flex"

            userCheckInterval = setInterval(async function () {
                let tempUsers = await net.userCheck()
                console.log("INTERVAL : ", tempUsers)

                if (tempUsers.length == 2) {
                    console.log("GAME IS READY")
                    clearInterval(userCheckInterval)
                    document.getElementById("waitscreen").style.display = "none"

                    game.createPieces(game.pionki)
                    game.status = "READY"
                    game.token = true
                    game.refreshCamera()
                }
            }, 1000)
        } else if (status == "USER_JOINED" && users.length == 2) {
            console.log("GAME IS READY")

            game.status = "READY"
            game.createPieces(game.pionki)
            game.piecesColor = "red"
            game.refreshCamera()
            game.token = false

            lblLogin.style.display = "block"
            lblLogin.innerHTML = "LOGIN : " + users[1].login
            document.getElementById("logowanie").style.display = "none"
        }
    }

    btnResetClick() {
        document.getElementById("tbLogin").value = ""
    }
}