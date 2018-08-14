const fs = require("fs")
const util = require("util")
const path = require('path')
const assert = require('assert')

async function ApplyMockMiddleware(app) {
    // console.log("\n================ MockServerMiddleware start =======================")
    // app.use("/", function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*")
    //     next()
    // })
    let list = await getMockList("./mock").catch(error => {
        consoel.log("MockServerMiddleware getMockList Error: \n   ", error)
        return []
    })

    list.forEach(mock => {
        try {
            applyMockRoute(app, mock)
        } catch (error) {
            consoel.log("MockServerMiddleware applyMockRoute Error: \n   ", error)
        }
    })
    // console.log("================ MockServerMiddleware  end  =======================")
}
function applyMockRoute(app, mock) {
    assert(!!app[mock.method], `method of ${mock.method} is not valid`)
    if (typeof mock.handleRes === 'function') {
        app[mock.method](mock.path, mock.handleRes)
    } else {
        app[mock.method](mock.path, (handle) => ((req, res) => {
            res.json(handle)
        })(mock.handleRes))
    }
}

async function getMockList(path) {
    let time = new Date().getTime()
    let fileList = await scanDir(path).catch(error => {
        console.log("getMockList error:\n   ", error)
        return []
    })

    let mockList = []
    for (let i = 0, len = fileList.length; i < len; i++) {
        let file = fileList[i]
        try {
            mockList = mockList.concat(getConfig(file))
        } catch (error) {
            console.log("getMockList error, fileName: ", file, "Error: \n   ", error)
        }
    }
    // console.log(time2, mockList)
    return mockList
}

/**
 * 递归扫描文件夹下面的文件
 * @param {文件夹路径} path 
 */
function scanDir(path) {
    return new Promise((resolve, reject) => {
        let all = []
        fs.readdir(path, function (err, files) {
            //err 为错误 , files 文件名列表包含文件夹与文件
            if (err) {
                console.log('error:\n' + err);
                resolve([])
                return;
            }

            files.forEach(function (file) {
                let stat = null
                try {
                    stat = fs.statSync(path + '/' + file)
                } catch (error) {
                    console.log("fs.statSync error:", error)
                }
                if (stat.isDirectory()) {
                    // 如果是文件夹遍历
                    all.push(scanDir(path + '/' + file))
                } else {
                    all.push(Promise.resolve(path + '/' + file))
                }
            })
            Promise.all(all).then(list => {
                resolve([].concat(...list))
            })
        })

    })
}
function getConfig(file) {
    let obj = require(file)
    assert(Object.prototype.toString.call(obj) === "[object Object]", "mock file invalid: " + file)
    let arr = []
    for (const [key, value] of Object.entries(obj)) {
        arr.push({
            // method path
            ...parseApi(key),
            handleRes: value
        })
    }
    // console.log(arr)
    return arr
}
// function require
function parseApi(api) {
    let method = 'get'
    let path = api.trim()
    let result = api.split(/\s+/)
    assert(result.length === 1 || result.length === 2, "mock api invalid: " + api)
    if (result.length === 2) {
        method = result[0].toLowerCase()
        path = result[1]
    }
    return { method, path };
}
module.exports = ApplyMockMiddleware