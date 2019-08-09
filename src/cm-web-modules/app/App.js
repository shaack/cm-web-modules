/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/m
 * License: MIT, see file 'LICENSE'
 */

/** @var App */
export let app = null

class App {
    constructor(props = {}) {
        this.props = props
        this.components = []
    }
}

export function init(props) {
    app = new App(props)
    return app
}
