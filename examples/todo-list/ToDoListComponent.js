/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Component} from "../../src/cm-web-modules/app/Component.js"

export class ToDoListComponent extends Component {

    constructor(context) {
        super({}, {
            input: "",
            todos: []
        }, {
            input: "input[type='text']",
            todos: {
                dom: "ul.list-output",
                transform: (value, bind, index) => {
                    return '<li><label><input data-index="' + index + '" type="checkbox" ' + (value.done ? " checked" : "") + '/>' + value.text + '</label></li>'
                }
            }
        }, {
            "add": (ignored) => {
                if (this.state.input) {
                    this.state.todos.push(new ToDo(this.state.input))
                    this.state.input = ""
                }
            },
            "check": (event) => {
                this.state.todos[event.target.dataset.index].done = event.target.checked
            }
        }, context)
    }

}

class ToDo {
    constructor(text) {
        this.text = text
        this.done = false
    }
}