/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

const additionalAttributes = "Path=/; SameSite=Strict;"

export class Cookie {

    static create(name, value = "", maxAge = undefined) {
        let maxAgeAttribute = ""
        if (maxAge) {
            maxAgeAttribute = "Max-Age=" + maxAge + "; "
        }
        document.cookie = name + "=" + value + "; " + maxAgeAttribute + additionalAttributes
    }

    static read(name) {
        const cookieAttributes = document.cookie.split(";")
        for (const cookieAttribute of cookieAttributes) {
            const cookieAttributeTrimmed = cookieAttribute.trim()
            const nameEquals = name + "="
            if (cookieAttributeTrimmed.indexOf(nameEquals) !== -1) {
                return cookieAttributeTrimmed.substr(nameEquals.length)
            }
        }
        return undefined
    }

    static delete(name) {
        document.cookie = name + "=; Max-Age=0; " + additionalAttributes
    }

}