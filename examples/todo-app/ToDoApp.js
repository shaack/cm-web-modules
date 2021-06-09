/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {App} from "../../src/cm-web-modules/app/App.js";
import {InputComponent} from "./components/InputComponent.js";
import {ListOutputComponent} from "./components/ListOutputComponent.js";

export class ToDoApp extends App {

    constructor(context) {
        super(context)
        this.state = {
            todos: []
        }
        this.addComponent(new InputComponent(context.querySelector(".InputComponent")))
        this.addComponent(new ListOutputComponent(context.querySelector(".ListOutputComponent")))
    }

}