/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {UiComponent} from "../../src/app/Component.js"
import {Observe} from "../../src/observe/Observe.js";

export class ToDoComponent extends UiComponent {
    constructor(context) {
        super()
        this.state = {
            todos: []
        }
        this.elements = {
            input: context.querySelector("input[type='text']"),
            listOutput: context.querySelector(".list-output")
        }
        this.actions = {
            "add": () => {
                if (this.elements.input.value) {
                    this.state.todos.unshift(new ToDo(this.elements.input.value))
                    this.elements.input.value = ""
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
        Observe.property(this.state, "todos", () => {
            let html = ""
            for (const value of this.state.todos) {
                html += `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? "checked" : "")} />${value.text}</label></li>`
            }
            this.elements.listOutput.innerHTML = html
        })
        this.addDataEventListeners(context) // map element events to actions
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
