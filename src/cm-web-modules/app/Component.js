/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {EventUtils} from "../utils/EventUtils.js"
import {Bind} from "./bind/lib/bind.js"

/**
 * state: holds all reactive data
 * mappings: Bind.js mappings, redraw the output after state change
 * actions: Change the state from gui input. Actions are added automatically with a 'data-event-listener' attribut
 *
 * See example '/examples/todo-list/ToDoListComponent.js'
 */
export class Component {

    constructor(props = {}, state, mappings, actions, context) {
        this.props = props
        this.state = Bind(state, mappings, context)
        this.actions = actions
        this.addActions(context)
    }

    /**
     * Searches for "data-event-listener" attributes in the HTML
     */
    addActions(context) {
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
