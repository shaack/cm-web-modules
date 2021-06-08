/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {App} from "../../src/cm-web-modules/app/App.js"
import {Observe} from "../../src/cm-web-modules/observe/Observe.js";

export class ToDoListApp extends App {
    constructor(context) {
        super(context, {}, {
            todos: []
        }, {
            input: context.querySelector("input[type='text']"),
            todos: context.querySelector("ul.list-output")
        }, {
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
        })
        Observe.property(this.state, "todos", () => {
            let html = ""
            for (const value of this.state.todos) {
                html += `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? "checked" : "")} />${value.text}</label></li>`
            }
            this.elements.todos.innerHTML = html
        })
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