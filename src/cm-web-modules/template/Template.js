/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-06-09
 */
import {TextUtils} from "../utils/TextUtils.js";

export class Template {
    constructor(template) {
        this.template = TextUtils.escapeStringLiteral(template)
        this.render = function (replacements) {
            return new Function("return `" + this.template + "`;").call(replacements)
        }
    }
}
