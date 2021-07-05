/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {EventUtils} from "../utils/EventUtils.js"
import {Service} from "./Service.js"

export class Component extends Service {

    constructor(parent, context, props = {}) {
        super(parent, props)
        this.context = context
        this.actions = {}
        this.elements = {}
    }

    /**
     * Searches for "data-event-listener" attributes in the HTML, and couples them with actions.
     * Tag Attributes:
     *  - `data-event-listener`: The event "click", "change",...
     *  - `data-action`: The action in this.actions, called on the event
     *  - `data-delegate`: Query selector, to delegate the event from a child element, see example 'examples/todo-app'
     */
    addDataEventListeners() {
        const eventListenerElements = this.context.querySelectorAll("[data-event-listener]")
        if(this.props.debug) {
            console.log("eventListenerElements", this.context, eventListenerElements)
        }
        for (const eventListenerElement of eventListenerElements) {
            const eventName = eventListenerElement.dataset.eventListener
            const action = eventListenerElement.dataset.action
            const delegate = eventListenerElement.dataset.delegate
            if (!this.actions[action]) {
                console.error(this.context, "You have to add the action \"" + action + "\" to your component.")
            }
            if (delegate) {
                EventUtils.delegate(eventListenerElement, eventName, delegate, (target) => {
                    if(this.props.debug) {
                        console.log("delegate", action, target)
                    }
                    this.actions[action](target)
                })
            } else {
                if(this.props.debug) {
                    console.log("addEventListener", eventName, action)
                }
                eventListenerElement.addEventListener(eventName, this.actions[action].bind(this))
            }
        }
        return this
    }

}

