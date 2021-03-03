/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
}

export class TextUtils {

    static replaceAll(str, replacementsObj, ignoreCase = false) {
        let retStr = str
        const flags = ignoreCase ? "gi" : "g"
        for (let needle in replacementsObj) {
            // noinspection JSUnfilteredForInLoop
            retStr = retStr.replace(new RegExp(needle, flags), replacementsObj[needle])
        }
        return retStr
    }

    static crop(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "…"
        } else {
            return str
        }
    }

    static escapeHtml(str) {
        return String(str).replace(/[&<>"'\/]/g, (s) => {
            return entityMap[s]
        })
    }

}