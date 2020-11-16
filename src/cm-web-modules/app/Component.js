/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {EventUtils} from "../utils/EventUtils.js"

// D'alligator
// CSO - Component State Observer

// https://stackoverflow.com/questions/40961778/returning-es6-proxy-from-the-es6-class-constructor
// https://stackabuse.com/introduction-to-javascript-proxies-in-es6/

const propertyProxyHandler = {}

const arrayPropertyProxyHandler = {}

export class Component {
    constructor(props = {}, element, stateClass, viewClass) {
        this.props = props
        this.element = element
        const state = new stateClass()
        // search for arrays in the state
        for (const [key, value] of Object.entries(state)) {
            console.log(`${key}: ${value}`)
            console.log(Array.isArray(state[key]))
            const property = state[key]
            const parentKey = key
            if (Array.isArray(property)) {
                console.log("is Array")
                state[key] = new Proxy(property, {
                    apply(target, thisArg, argArray) {
                        console.log("apply", target, thisArg, argArray)
                        return Reflect.apply(target, thisArg, argArray)
                    },
                    set: (target, key, value, receiver) => {
                        console.log("set", target, ";", key, ";", value, ";", receiver)
                        return Reflect.set(target, key, value, receiver)
                    },
                    get: (target, key, value) => {
                        // console.log("get", target, ";", key, ";", value)
                        if (["push"].includes(key)) {
                            setTimeout(() => {
                                this.view.stateChanged(state, parentKey, property)
                            })
                        }
                        return Reflect.get(target, key, value)
                    }
                })
            }
        }
        this.state = new Proxy(state, {
            set: (target, key, value, receiver) => {
                // console.log("SET", target, ";", key, ";", value, ";", receiver)
                this.view.stateChanged(state, key, value)
                return Reflect.set(target, key, value, receiver)
            }
        })
        this.view = new viewClass(element)
        this.addEventListeners(element)
    }

    // searches for "data-event-listener" attributes
    addEventListeners(element) {
        const eventListenerElements = element.querySelectorAll("[data-event-listener]")
        for (const eventListenerElement of eventListenerElements) {
            const eventName = eventListenerElement.dataset.eventListener
            const action = eventListenerElement.dataset.action
            const delegate = eventListenerElement.dataset.delegate
            if (!this[action]) {
                console.error("You have to add the event handler method \"" + action + "\" to your component.")
            }
            if (delegate) {
                // console.log("delegate")
                EventUtils.delegate(eventListenerElement, eventName, delegate, this[action])
            } else {
                // console.log("addEventListener", element, eventName, action)
                eventListenerElement.addEventListener(eventName, this[action].bind(this))
            }
        }
    }
}

export class View {
    constructor(element) {
        this.element = element
        this.observers = []
    }

    stateChanged(state, key, value) {
        console.log("stateChanged", key, value)
        if(this.observers[key]) {
            this.observers[key][0](key, value)
        }
    }

    observe(propertyName, callback) {
        console.log("observe", propertyName)
        if (!this.observers[propertyName]) {
            this.observers[propertyName] = []
        }
        this.observers[propertyName].push(callback)
    }
}