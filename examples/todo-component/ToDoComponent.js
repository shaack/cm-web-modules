/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Component} from "../../src/cm-web-modules/app/Component.js"
import {Observe} from "../../src/cm-web-modules/observe/Observe.js";

export class ToDoComponent extends Component {
    constructor(context) {
        super(undefined, context)
        this.state = {
            todos: []
        }
        this.elements = {
            input: context.querySelector("input[type='text']"),
            listOutput: context.querySelector(".list-output")
        }
        console.log(this.elements)
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
        this.initialization.then(() => {
            Observe.property(this.state, "todos", () => {
                let html = ""
                for (const value of this.state.todos) {
                    html += `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? "checked" : "")} />${value.text}</label></li>`
                }
                this.elements.listOutput.innerHTML = html
            })
            this.addDataEventListeners()
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