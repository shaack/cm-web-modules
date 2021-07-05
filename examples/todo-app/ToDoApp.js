/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {App} from "../../src/cm-web-modules/app/App.js"
import {ToDoComponent} from "./ToDoComponent.js"

export class ToDoApp extends App {
    constructor() {
        super()
        new ToDoComponent(this, document.body)
    }
}