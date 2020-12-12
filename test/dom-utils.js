/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Assert} from "../src/cm-web-modules/assert/Assert.js"
import {DomUtils} from "../src/cm-web-modules/utils/DomUtils.js"

describe("DomUtils", function () {

    it("should read :root property", function () {
        Assert.equals(DomUtils.getCustomProperty("dom-utils-test-var"), "#777")
    })

    it("should write and read :root property", function() {
        DomUtils.setCustomProperty("my-property", "lalelu")
        Assert.equals(DomUtils.getCustomProperty("my-property"), "lalelu")
    })

    it("should set body-bg", function() {
        DomUtils.setCustomProperty("body-bg", "white")
    })
})