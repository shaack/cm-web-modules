/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Component} from "../../src/cm-web-modules/app/Component.js"
import {Bind} from "../../node_modules/bind.mjs/src/bind.mjs/Bind.js";

export class ToDoComponent extends Component {

    constructor(context) {
        super(undefined, context, {})
        this.state = Bind({
            input: "",
            todos: []
        }, {
            input: "input[type='text']",
            todos: {
                dom: "ul.list-output",
                transform: (value) => {
                    return `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? " checked" : "")}/>${value.text}</label></li>`
                }
            }
        }, context)
        this.actions = {
            "add": () => {
                if (this.state.input) {
                    this.state.todos.unshift(new ToDo(this.state.input))
                    this.state.input = ""
                }
            },
            "check": (event) => {
                for (const todo of this.state.todos) {
                    if (todo.id === parseInt(event.target.dataset.id, 10)) {
                        todo.done = event.target.checked
                        break
                    }
                }
            }
        }
        this.addDataEventListeners(context)
    }

}

let id = 1

class ToDo {
    constructor(text) {
        this.id = id++
        this.text = text
        this.done = false
    }
}