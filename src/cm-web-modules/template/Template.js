/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-06-09
 */
import {TextUtils} from "../utils/TextUtils.js";

export class Template {
    constructor(template) {
        this.template = TextUtils.escapeStringLiteral(template)
        this.render = function (replacements) {
            const replacementsSanitized = {}
            const keys = Object.keys(replacements)
            for (const key of keys) {
                const sanititzed = TextUtils.escapeStringLiteral(replacements[key])
                console.log(key, replacements[key], sanititzed)
                replacementsSanitized[key] = sanititzed
            }
            return new Function("return `" + TextUtils.escapeHtml(this.template) + "`;").call(replacementsSanitized)
        }
    }
}
