class Net {
    constructor() {

    }

    btnLoginClick() {

        const body = JSON.stringify({ login: ui.tbLogin.value })

        const headers = { "Content-Type": "application/json" } // nagłowek czyli typ danych

        fetch("/handleLogin", { method: "post", body, headers }) // fetch
            .then(
                game.createPieces(),
                console.log("cos")
            )
    }

    checkIfReady() {
        const body = JSON.stringify({})

        const headers = { "Content-Type": "application/json" } // nagłowek czyli typ danych

        fetch("/handleCheckIfReady", { method: "post", body, headers }) // fetch
            .then(
                game.createPieces(),
                console.log("cos")
            )
    }
}