/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Component} from "./Component.js";

/**
 * An App is a Component without parent.
 */
export class App extends Component {
    constructor(context = undefined, props = {}) {
        super(undefined, context, props)
    }
}