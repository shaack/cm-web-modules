/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

/**
 * An App is a container for Components which can have a app scoped state
 */
export class App {

    /**
     * @param context The context in HTML
     * @param props The App configuration
     */
    constructor(context, props) {
        this.context = context
        this.props = props
        this.state = {}
        this.initialization = Promise.resolve()
    }

    /**
     * Add a component the app
     * @param component A new Component
     */
    addComponent(component) {
        component.app = this
    }
}