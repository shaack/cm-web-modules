/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Observe} from "../../src/observe/Observe.js";
import {DomUtils} from "../../src/utils/DomUtils.js"

export class ToDoComponent {
    constructor(context) {
        this.context = context
        this.state = {
            todos: []
        }
        this.elements = {
            input: context.querySelector("input[type='text']"),
            listOutput: context.querySelector(".list-output")
        }
        this.actions = {
            add: this.handleAdd.bind(this),
            check: this.handleCheck.bind(this)
        }
        Observe.property(this.state, "todos", () => {
            let html = ""
            for (const value of this.state.todos) {
                html += `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? "checked" : "")} />${value.text}</label></li>`
            }
            this.elements.listOutput.innerHTML = html
        })
        DomUtils.autoBindDataEvents(this, {debug: false}) // map element events to handler methods
    }

    handleAdd() {
        if (this.elements.input.value) {
            this.state.todos.unshift(new ToDo(this.elements.input.value))
            this.elements.input.value = ""
        }
    }

    handleCheck(event) {
        for (const todo of this.state.todos) {
            if (todo.id === parseInt(event.target.dataset.id, 10)) {
                todo.done = event.target.checked
                break
            }
        }
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
