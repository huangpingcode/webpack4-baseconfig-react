
import app from "./app/app"
import login from "./login/login"
import React from "react"
import reactDom from "react-dom"
import jquery from "jquery"
console.log("React", React)
console.log("jquery", jquery)
console.log(app, "app")
console.log(login, "appfd")
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "示例文fdsfd字"
        }
    }
    render() {
        let { text } = this.state
        return (
            <div>
                <p>开发模式下，尝试修改组件内容，在不刷新页面情况下更新组件</p>
                <p>{text}</p>
                <div>fsdfds</div>
            </div>
        )
    }
}
reactDom.render(<App />, document.getElementById("App"))