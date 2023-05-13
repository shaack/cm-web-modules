/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {Component} from "../../src/app/Component.js"
import {InputComponent} from "./components/InputComponent.js";
import {ListOutputComponent} from "./components/ListOutputComponent.js";

export class ToDoApp extends Component {
    constructor(context) {
        super({}, {
            todos: []
        })
        new InputComponent(context.querySelector(".InputComponent"), this.state)
        new ListOutputComponent(context.querySelector(".ListOutputComponent"), this.state)
    }
}
