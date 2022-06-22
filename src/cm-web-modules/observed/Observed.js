/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-08-30
 */

export class Observed {

    constructor(targetObject) {
        const self = this
        this.targetObject = targetObject
        self.observers = []
        this.targetObject.addObserver = function (callback, property = undefined) {
            self.observers.push({callback: callback, property: property})
        }
        this.targetObject.removeObserver = (callback, property = undefined) => {
            let i = 0
            for (const observer of targetObject.observers) {
                if (observer.callback === callback) {
                    if (property === undefined || observer.property === property) {
                        self.observers.splice(i, 1)
                        break
                    }
                }
                i++
            }
        }

        this.proxy = new Proxy(targetObject, {
            apply() {
                console.log("apply")
            },
            set(target, property, value) {
                target[property] = value
                console.log("set", "target", target, "property", property, value)
                if (property !== "observers") {
                    for (const observer of self.observers) {
                        if (!observer.property || observer.property === property) {
                            observer.callback({
                                target: target,
                                property: property,
                                value: value
                            })
                        }
                    }
                }
                return true
            },
            get(target, property) {
                console.log("get", target, property)
                if (typeof target[property] === 'function') {
                    return target[property].bind(target)
                }
                return true
            }
        })


    }


    /*
    new Proxy(targetObject, {
        set: function (target, property, value) {
            target[property] = value
            console.log("set", target, property, value)
            for (const observer of targetObject.observers) {
                if (!observer.property || observer.property === property) {
                    observer.callback({
                        target: target,
                        property: property,
                        value: value
                    })
                }
            }
            return true
        },
        get: function (target) {
            console.log("get", target)
            return true
        }
    })
    proxy.observers = []
    proxy.addObserver = function (callback, property = undefined) {
        proxy.observers.push({callback: callback, property: property})
    }
    proxy.removeObserver = function (callback, property = undefined) {
        let i = 0
        for (const observer of targetObject.observers) {
            if (observer.callback === callback) {
                if (property === undefined || observer.property === property) {
                    proxy.observers.splice(i, 1)
                    break
                }
            }
            i++
        }
    }
    return proxy

     */
}
