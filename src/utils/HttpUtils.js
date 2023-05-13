/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class HttpUtils {
    static getUrlParameter(name, url = window.location.href) {
        return new URL(url).searchParams.get(name)
    }
}
