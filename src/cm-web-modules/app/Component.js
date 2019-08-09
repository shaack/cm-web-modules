/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/m
 * License: MIT, see file 'LICENSE'
 */

export class Component {

    constructor(props = {}) {
        this.props = props
        this.state = {}
        this.components = []
    }

}