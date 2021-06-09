/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

/**
 * An App is a Component without parent.
 */
export class App {
    constructor(context, props) {
        this.context = context
        this.props = props
        this.state = {}
        this.initialization = Promise.resolve()
    }

    addComponent(component) {
        component.app = this
    }
}