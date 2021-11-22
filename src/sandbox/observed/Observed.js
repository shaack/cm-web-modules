/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-08-30
 */

export class Observed {

    constructor(value = undefined) {
        this._value = value
        this.observers = []
    }

    set value(value) {
        if (this._value !== value) {
            const previousValue = value
            this._value = value
            for (const observer of this.observers) {
                if(observer.async) {
                    setTimeout(() => {
                        observer.callback({
                            value: this._value,
                            previousValue: previousValue
                        })
                    })
                } else {
                    observer.callback({
                        value: this._value,
                        previousValue: previousValue
                    })
                }
            }
        }
    }

    get value() {
        return this._value
    }

    addObserver(callback, async = false) {
        this.observers.push({callback: callback, async: async})
    }

    removeObserver(callback) {
        const index = this.observers.indexOf(callback)
        if (index > -1) {
            this.observers.splice(index, 1)
        }
    }
}