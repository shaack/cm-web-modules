/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class ES5Utils {
    /**
     * dynamically load an ES5 script
     * from: https://humanwhocodes.com/blog/2009/07/28/the-best-way-to-load-external-javascript
     * @param url
     * @returns {Promise<loaded>}
     */
    static loadScript(url) {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.type = "text/javascript"

            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" ||
                        script.readyState === "complete") {
                        script.onreadystatechange = null
                        resolve()
                    }
                }
            } else {  //Others
                script.onload = function () {
                    resolve()
                }
            }
            script.src = url
            document.getElementsByTagName("head")[0].appendChild(script)
        })
    }
}