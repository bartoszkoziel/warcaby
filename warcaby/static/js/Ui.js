class Ui {
    constructor() {
        this.btnLogin = document.getElementById("btnLogin")
        this.btnReset = document.getElementById("btnReset")
        this.tbLogin = document.getElementById("tbLogin")

        this.btnLogin.addEventListener("click", net.btnLoginClick)
    }
}