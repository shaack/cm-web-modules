/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

/**
 * A Service is a kind of controller which couples js and html elements
 */
export class Service {

    constructor(parent, props = {}) {
        if (parent) {
            if (!parent.parent) { // is App or base component
                this.app = parent
            } else {
                this.parent = parent
                this.app = parent.app
            }
        }
        this.props = props
        this.state = {}
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