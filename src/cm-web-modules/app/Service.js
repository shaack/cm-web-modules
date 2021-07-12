/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

/**
 * A Service is a kind of controller which couples js and html elements
 */
export class Service {

    constructor(parent, props = {}, state = {}) {
        this.parent = parent
        if (parent) {
            if (!parent.parent) { // is App or base component
                this.app = parent
            } else {
                this.app = parent.app
            }
        }
        this.props = props
        this.state = state
        this.initialization = this.initialize()
    }

    /**
     * implement in childs
     * @returns {Promise<void>}
     */
    initialize() {
        return new Promise((resolve) => {
            resolve(this)
        })
    }

}