/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class Component {

    constructor(parent, props = {}) {
        this.parent = parent
        this.childs = []
        this.props = props
        this.state = {} // components local state
    }

    addChild(componentClass, props) {
        this.childs.push(new componentClass(this, props))
    }

}