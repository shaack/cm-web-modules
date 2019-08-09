/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-utils
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

    static replaceAll(str, obj) {
        let retStr = str
        let x
        for (x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
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