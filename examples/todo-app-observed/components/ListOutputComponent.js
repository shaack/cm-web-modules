/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {UiComponent} from "../../../src/app/Component.js"
import {EventUtils} from "../../../src/utils/EventUtils.js";

export class ListOutputComponent extends UiComponent {
    constructor(context, state) {
        super(context, {}, state)
        this.actions = {
            "check": (event) => {
                for (const todo of this.state.todos) {
                    if (todo.id === parseInt(event.target.dataset.id, 10)) {
                        todo.done = event.target.checked
                        break
                    }
                }
            }
        }
        EventUtils.delegate(context, "change", "input[type='checkbox']", (event) => {
            this.actions.check(event)
        })
        this.state.todos.addObserver(() => {
            console.log("callback")
            let html = ""
            for (const value of this.state.todos) {
                html += `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? "checked" : "")} />${value.text}</label></li>`
            }
            this.context.innerHTML = html
        })
    }
}
