/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {InputComponent} from "./components/InputComponent.js";
import {ListOutputComponent} from "./components/ListOutputComponent.js";
import {Component} from "../../src/cm-web-modules/app/Component.js";

export class ToDoComponent extends Component {

    constructor(context) {
        super(context)
        this.state = {
            todos: []
        }
        this.addComponent(new InputComponent(context.querySelector(".InputComponent")))
        this.addComponent(new ListOutputComponent(context.querySelector(".ListOutputComponent")))
    }

}