/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class CoreUtils {

    static debounce(callback, wait = 0, immediate = false) {
        let timeout
        return function executedFunction(...args) {
            if (immediate && !timeout) {
                callback(...args)
                timeout = true
            } else {
                const debounced = () => {
                    clearTimeout(timeout)
                    callback(...args)
                }
                clearTimeout(timeout)
                timeout = setTimeout(debounced, wait)
            }
        }
    }

    static mergeObjects(target, source) {
        const isObject = (obj) => obj && typeof obj === 'object'
        if (!isObject(target) || !isObject(source)) {
            return source
        }
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object) {
                Object.assign(source[key], CoreUtils.mergeObjects(target[key], source[key]))
            }
        }
        Object.assign(target || {}, source)
        return target
    }

    static createTask() {
        let resolve, reject
        const promise = new Promise(function (_resolve, _reject) {
            resolve = _resolve
            reject = _reject
        })
        promise.resolve = resolve
        promise.reject = reject
        return promise
    }

}
