/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-06-09
 */

import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Template} from "../src/template/Template.js";

describe("Template", function () {
    it("should render a simple template", () => {
        const template = new Template("${greeting} ${who}!")
        assert.equal(template.render({"greeting": "Hello", "who": "World"}), "Hello World!")
    })
    it("should render a hacker template", () => {
        const template = new Template("${greeting} ${who}!")
        assert.equal(template.render({"greeting": "Hello", "who": "${test}'\"´`"}), "Hello ${test}'\"´`!")
    })
    it("should render a simple template with missing replacements", () => {
        const template = new Template("${greeting} ${who}!")
        assert.equal(template.render({"greeting": "Hello"}), "Hello ${who}!")
    })
    it("should render a template in HTML", () => {
        const template = new Template(document.getElementById("myTemplate"))
        assert.equal(template.render({"greeting": "Hello", "who": "World"}), "Hello <b>World</b>!")
    })
})
