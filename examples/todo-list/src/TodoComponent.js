/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Component, View} from "../../../src/cm-web-modules/app/Component.js"

/*
    About Proxies:
    https://blog.logrocket.com/use-es6-proxies-to-enhance-your-objects/
*/

export class ToDoComponent extends Component {

    constructor(element) {
        super({}, element, ToDoState, ToDoView)
    }

    add() {
        // console.log("add", this)
        this.state.todos.push(new ToDo(this.view.elements.input.value))
        this.view.elements.input.value = ""
    }

    check() {
        console.log(this)
    }

}

class ToDoState {
    constructor() {
        this.todos = []
    }
}

class ToDoView extends View {
    constructor(element) {
        super(element)
        this.elements = {
            input: this.element.querySelector("input[type='text']"),
            listOutput: this.element.querySelector("ul")
        }
        this.observe("todos", (key, value) => {
            console.log("observe todos callback", key, value)
            this.elements.listOutput.innerHTML = ""
            for (const valueElement of value) {
                const li = document.createElement("li")
                li.innerText = valueElement.text
                this.elements.listOutput.append(li)
            }
        })
    }
}

class ToDo {
    constructor(text) {
        this.text = text
        this.done = false
    }
}