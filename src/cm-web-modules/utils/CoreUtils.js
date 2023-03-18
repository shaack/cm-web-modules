/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class CoreUtils {

    static debounce(func, timeout = 0) {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, timeout)
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

}
