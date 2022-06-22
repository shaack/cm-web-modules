/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-08-30
 */

export function Observed(target) {
    const self = this
    this.target = target
    this.observers = []
    this.target.addObserver = (callback, propertyName = undefined) => {
        self.observers.push({callback: callback, property: propertyName})
        // console.log(this.observers)
    }
    this.target.removeObserver = (callback, propertyName = undefined) => {
        let i = 0
        for (const observer of this.observers) {
            if (observer.callback === callback) {
                if (propertyName === undefined || observer.property === propertyName) {
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
            // console.log("set", "property", property, "value", value)
            for (const observer of self.observers) {
                if (!observer.property || observer.property === property) {
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
