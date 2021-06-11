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
    "'": '&#39;'
}

export class TextUtils {

    static crop(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "…"
        } else {
            return str
        }
    }

    static escapeHtml(raw) {
        return String(raw).replace(/[&<>"']/g, (s) => {
            return entityMap[s]
        })
    }

    // https://stackoverflow.com/questions/7467840/nl2br-equivalent-in-javascript
    static nl2br(raw) {
        return String(raw).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>');
    }

}