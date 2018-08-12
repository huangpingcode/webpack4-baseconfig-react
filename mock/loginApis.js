

let cur_tokens = {}
module.exports = {
    "/app.json": {
        success: true,
        content: {
            appName: "appName"
        }
    },
    "get /login/refreshToken.json": function (req, res) {
        let radomStr = getRadomStr()
        let token = refreshToken()
        cur_tokens[token] = {
            radomStr
        }
        res.json({
            success: true,
            content: {
                token,
                radomStr
            }
        })
    },
    "post /login/login.json": function (req, res) {
        let token = req.param("token")
        let radomStr = req.param("radomStr")
        let account = req.param("account")
        let pwd = req.param("pwd")
        // todo
        res.json({
            success: token === cur_token,
            content: {
                name: account
            }
        })
    }
}

function refreshToken() {
    const LEN = 6
    const LEN_2 = 5
    const CHARTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    Math.floor(Math.random() * (CHARTS.length + 1))
    var token = ""
    for (let i = 0; i < LEN; i++) {
        for (let j = 0; j < LEN_2; j++) {
            let index = Math.floor(Math.random() * (CHARTS.length + 1))
            token += CHARTS.charAt(index)
        }
        if (i < LEN - 1) {
            token += "-"
        }
    }
    return token
}
function getRadomStr() {
    const LEN = 12
    let radomStr = ""
    const CHARTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let j = 0; j < LEN; j++) {
        let index = Math.floor(Math.random() * (CHARTS.length + 1))
        radomStr += CHARTS.charAt(index)
    }
    return radomStr
}