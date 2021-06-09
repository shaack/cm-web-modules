/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {EventUtils} from "../utils/EventUtils.js";

export class Component {

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
     * Searches for "data-event-listener" attributes in the HTML
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