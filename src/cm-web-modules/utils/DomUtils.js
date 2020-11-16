/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class DomUtils {

    /**
     * @deprecated use element.classList.add("mystyle");
     */
    static addClass(element, cssClass) {
        console.warn('DomUtils.addClass is deprecated, use element.classList.add("className")')
        if (element.getAttribute("class")) {
            element.setAttribute("class", element.getAttribute("class") + " " + cssClass)
        } else {
            element.setAttribute("class", cssClass)
        }
    }

    static removeAllChildElements(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    static isElementScrolledToBottom(element) {
        return Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1
    }

    static getFormInputValues(formElement) {
        const inputs = formElement.querySelectorAll("input,select,checkbox")
        const values = {}
        inputs.forEach((input) => {
            if (input.type === "checkbox") {
                values[input.id] = !!input.checked
            } else {
                values[input.id] = input.value
            }
        })
        return values
    }

}