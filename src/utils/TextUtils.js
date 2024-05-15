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

    static wrap(str, maxLength) {
        const words = str.split(" ")
        let lines = []
        let line = ""
        for (let i = 0; i < words.length; i++) {
            const word = words[i]
            if (line.length + word.length < maxLength) {
                line += word + " "
            } else {
                lines.push(line.trim())
                line = word + " "
            }
        }
        lines.push(line.trim())
        return lines.join("\n")
    }

    static stripHtml(html) {
        let tmp = document.createElement("div")
        tmp.innerHTML = html
        return tmp.innerText
    }

    static escapeHtml(raw) {
        return String(raw).replace(/[&<>"']/g, (s) => {
            return entityMap[s]
        })
    }

    static nl2br(raw) {
        return String(raw).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>');
    }

    // https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
    static linkify(text) {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '">' + url + '</a>'
        })
    }

    static formatTime(milliseconds, millisecondDecimalPlaces = 0) {
        let seconds = Math.floor(milliseconds / 1000)
        let minutes = Math.floor(seconds / 60)
        seconds = seconds % 60
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        /*
        millisecondDecimalPlaces === 0: 00:00
        millisecondDecimalPlaces === 1: 00:00.0
        millisecondDecimalPlaces === 2: 00:00.00
         */
        if (millisecondDecimalPlaces > 0) {
            let millisecondsStr = (Math.floor(milliseconds % 1000) / 1000).toFixed(millisecondDecimalPlaces).substring(2)
            return minutes + ':' + seconds + '.' + millisecondsStr
        } else {
            return minutes + ':' + seconds
        }
    }

    static mask(text, maskChar = "*") {
        return text.replace(/./g, maskChar)
    }

}
