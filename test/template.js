/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-06-09
 */

import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Template} from "../src/cm-web-modules/template/Template.js";

describe("Template", function () {
    it("should render a simple template", () => {
        const template = new Template("${this.greeting} ${this.who}!")
        assert.equal(template.render({"greeting": "Hello", "who": "World"}), "Hello World!")
    })
    it("should render a hacker template", () => {
        const template = new Template("${this.greeting} ${this.who}!")
        assert.equal(template.render({"greeting": "Hello", "who": "${test}'\"´`"}), "Hello ${test}'\"´&#96;!")
    })
})