/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {EventUtils} from "../utils/EventUtils.js";

/**
 * A Component is a kind of controller which couples js and html elements
 */
export class Component {

    /**
     * @param context The context of the Component in HTML
     * @param props The Component configuration
     */
    constructor(context, props = {}) {
        this.context = context
        this.props = props
        this.state = {}
        this.actions = {}
        this.elements = {}
        this.app = undefined
        this.initialization = Promise.resolve().then(() => {
            this.addDataEventListeners(context)
        })
    }

    /**
     * Searches for "data-event-listener" attributes in the HTML, and couples them with actions.
     * Tag Attributes:
     *  - `data-event-listener`: The event "click", "change",...
     *  - `data-action`: The action in this.actions, called on the event
     *  - `data-delegate`: Query selector, to delegate the event from a child element, see example 'examples/todo-app'
     */
    addDataEventListeners(context) {
        const eventListenerElements = context.querySelectorAll("[data-event-listener]")
        for (const eventListenerElement of eventListenerElements) {
            const eventName = eventListenerElement.dataset.eventListener
            const action = eventListenerElement.dataset.action
            const delegate = eventListenerElement.dataset.delegate
            if (!this.actions[action]) {
                console.error("You have to add the action \"" + action + "\" to your component.")
            }
            if (delegate) {
                EventUtils.delegate(eventListenerElement, eventName, delegate, (target) => {
                    this.actions[action](target)
                })
            } else {
                eventListenerElement.addEventListener(eventName, this.actions[action].bind(this))
            }
        }
    }

}