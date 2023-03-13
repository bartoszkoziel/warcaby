class Net {
    constructor() {
        console.log("Net.js")
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
}