/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {TextUtils} from "../src/cm-web-modules/utils/TextUtils.js"

describe("TextUtils", function () {

    it("should replace case sensitive", function () {
        assert.equal(TextUtils.replaceAll("abBc123", {"b": "X", "c": "Y"}), "aXBY123")
    })

    it("should replace case insensitive", function () {
        assert.equal(TextUtils.replaceAll("abBc123", {"b": "X", "c": "Y"}, true), "aXXY123")
    })

})