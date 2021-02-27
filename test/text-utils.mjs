/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Assert} from "../src/cm-web-modules/assert/Assert.mjs"
import {TextUtils} from "../src/cm-web-modules/utils/TextUtils.mjs"

describe("TextUtils", function () {

    it("should replace case sensitive", function (done) {
        Assert.equals(TextUtils.replaceAll("abBc123", {"b": "X", "c": "Y"}), "aXBY123")
        done()
    })

    it("should replace case insensitive", function (done) {
        Assert.equals(TextUtils.replaceAll("abBc123", {"b": "X", "c": "Y"}, true), "aXXY123")
        done()
    })

})