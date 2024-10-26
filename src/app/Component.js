/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {DomUtils} from "../utils/DomUtils.js"

export class Component {

    constructor(props = {}, state = {}) {
        this.props = props
        this.state = state
    }

}

/** @deprecated */
export class UiComponent extends Component {

    constructor(context, props = {}, state = {}) {
        super(props, state)
        this.context = context
        this.actions = {}
    }

    /**
     * Searches for "data-event-listener" attributes in the HTML, and couples them with actions.
     * Tag Attributes:
     *  - `data-event-listener`: The event "click", "change",...
     *  - `data-action`: The action in this.actions, called on the event
     *  - `data-delegate`: Query selector, to delegate the event from a child element
     */
    addDataEventListeners() {
        // moved to DomUtils
        DomUtils.addDataEventListeners(this)
    }

}
