/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class App {

    /**
     * @param props The App configuration
     */
    constructor(props = {}) {
        this.props = props
        this.state = {}
        this.initialization = this.initialize()
    }

    /**
     * implement in child, doing some initialization and resolving this.initialize()
     * @returns {Promise<void>}
     */
    initialize() {
        return Promise.resolve()
    }

    addComponent(component) {
        component.app = this
        return component.initialization
    }
}