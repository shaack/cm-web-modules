/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {InputComponent} from "./components/InputComponent.js";
import {ListOutputComponent} from "./components/ListOutputComponent.js";
import {Component} from "../../src/cm-web-modules/app/Component.js"

export class ToDoComponent extends Component {

    constructor(app, context) {
        super(app, context)
        this.state = {
            todos: []
        }
        new InputComponent(this, context.querySelector(".InputComponent")).initialization.then(() => {
            console.log("InputComponent initialized")
        })
        new ListOutputComponent(this, context.querySelector(".ListOutputComponent")).initialization.then(() => {
            console.log("ListOutputComponent initialized")
        })
    }

}