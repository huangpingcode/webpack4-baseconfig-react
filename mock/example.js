/**
 * 参考了 webpack-api-mocker 的写法
 */
module.exports = {
    "/app.json": {
        success: true,
        content: { appName: "appName" }
    },
    "get /example.json": {
        success: true,
        content: { url: "/example.json", type: "get" }
    },
    "post /example.json": {
        success: true,
        content: { url: "/example.json", type: "post" }
    },
    "delete /example.json": {
        success: true,
        content: { url: "/example.json", type: "delete" }
    },
    "put /example.json": {
        success: true,
        content: { url: "/example.json", type: "put" }
    },
    "post /getUserList.json": function (req, res, next) {
        // console.log("method", req.method)
        // console.log("baseUrl", req.baseUrl)
        // console.log("path", req.path)
        // console.log("query", req.query)
        // console.log("body", req.body)
        // console.log("param", req.param("name"))
        let userList = getUserList()
        res.json({
            success: true,
            content: {
                userList,
                page: 1,
                total: 40
            }
        })
    }
}

function getUserList() {
    let name = "zhangshan"
    let arr = []
    for (var i = 1; i < 20; i++) {
        arr.push({
            name: name + "-" + cover2Num(i),
            dept: "研发部",
            tel: "180420098" + cover2Num(i),
        })
    }
}
function cover2Num(num) {
    if (num < 10) {
        return "0" + num
    }
    return num
}