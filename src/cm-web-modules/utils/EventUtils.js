/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-utils
 * License: MIT, see file 'LICENSE'
 */

export class EventUtils {

    static delegate(element, event, selector, handler) {
        element.addEventListener(event, function (event) {
            let target = event.target
            while (target && target !== this) {
                if (target.matches(selector)) {
                    handler.call(target, event)
                }
                target = target.parentNode
            }
        })
    }

}