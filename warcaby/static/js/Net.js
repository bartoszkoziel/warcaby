class Net {
    constructor() {
        this.btnLogin = document.getElementById("btnLogin")
        this.btnLogin.addEventListener("click", this.btnLoginClick)
    }

    btnLoginClick(){
        game.createPieces()
        this.btnLogin.value = "eqeq"
    }
}