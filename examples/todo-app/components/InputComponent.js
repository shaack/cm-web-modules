/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {ToDo} from "../model/ToDo.js";
import {Component} from "../../../src/cm-web-modules/app/Component.js"

export class InputComponent extends Component {
    constructor(parent, context, props = {}) {
        super(parent, context, props)
        this.elements = {
            input: context.querySelector("input[type='text']")
        }
        this.actions = {
            "add": () => {
                if (this.elements.input.value) {
                    this.parent.state.todos.unshift(new ToDo(this.elements.input.value))
                    this.elements.input.value = ""
                }
                console.log(this.parent.state)
            }
        }
        this.addDataEventListeners()
    }
}