/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {DomUtils} from "../src/utils/DomUtils.js"

describe("DomUtils", function () {

    it("should read :root property", function () {
        assert.equal(DomUtils.getCustomProperty("dom-utils-test-var"), "#777")
    })

    it("should write and read :root property", function() {
        DomUtils.setCustomProperty("my-property", "lalelu")
        assert.equal(DomUtils.getCustomProperty("my-property"), "lalelu")
    })

    it("should set body-bg", function() {
        DomUtils.setCustomProperty("body-bg", "white")
    })
})
