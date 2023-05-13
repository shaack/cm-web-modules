/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {ToDo} from "../model/ToDo.js";
import {UiComponent} from "../../../src/app/Component.js"

export class InputComponent extends UiComponent {
    constructor(context, state) {
        super(context, {}, state)
        this.elements = {
            input: context.querySelector("input[type='text']")
        }
        this.actions = {
            "add": () => {
                if (this.elements.input.value) {
                    this.state.todos.unshift(new ToDo(this.elements.input.value))
                    this.elements.input.value = ""
                }
                console.log(this.state)
            }
        }
        this.addDataEventListeners()
    }
}
