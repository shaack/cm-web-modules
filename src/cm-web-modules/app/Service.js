/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

/**
 * A Service is a kind of controller which couples js and html elements
 */
export class Service {

    constructor(props = {}, state = {}) {
        this.props = props
        this.state = state
    }

}