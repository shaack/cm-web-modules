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
    }

    addComponent(component) {
        component.app = this
    }
}