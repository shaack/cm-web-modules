/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class Cache {

    constructor(props) {
        this.props = {
            clearInterval: 30000
        }
        Object.assign(this.props, props)
        if (props.clearInterval && props.clearInterval > 0) {
            window.setInterval(function () {
                this.cache = {}
            }, props.clearInterval)
        }
        this.cache = {}
    }

    put(key, value) {
        this.cache[key] = value
    }

    get(key) {
        return this.cache[key]
    }

}