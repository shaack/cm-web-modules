/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export function Observed(target) {
    const self = this
    this.target = target
    this.observers = []
    this.target.addObserver = (callback, properties = []) => {
        if (typeof properties === 'string' || properties instanceof String) {
            properties = [properties]
        }
        if (!Array.isArray(properties)) {
            throw new Error("properties must be a string or array")
        }
        self.observers.push({callback: callback, properties: properties})
    }
    this.target.removeObserver = (callback, properties = []) => {
        let i = 0
        for (const observer of this.observers) {
            if (observer.callback === callback) {
                if (properties.length === 0 || observer.properties === properties) {
                    self.observers.splice(i, 1)
                    break
                }
            }
            i++
        }
    }
    this.proxy = new Proxy(this.target, {
        set(target, property, value) {
            const oldValue = target[property]
            target[property] = value
            for (const observer of self.observers) {
                if (observer.properties.length === 0 || observer.properties.includes(property)) {
                    observer.callback({
                        target: target,
                        property: property,
                        value: value,
                        oldValue: oldValue
                    })
                }
            }
            return true
        }
    })
    return this.proxy
}
