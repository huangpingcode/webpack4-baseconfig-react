module.exports = {
    "get /search.json": function (req, res) {

        let name = req.param("name")
        let arr = []
        for (var i = 1; i < 20; i++) {
            arr.push({
                name: name + "-" + i,
                dept: "研发部",
                tel: "180420098" + cover2Num(i),
            })
        }
        res.json({
            success: true,
            data: arr
        })
    }
}