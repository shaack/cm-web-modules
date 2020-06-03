/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import assert from 'assert'
import {TextUtils} from "../src/cm-web-modules/utils/TextUtils.js"

describe("TextUtils", function () {

    it("should replace case sensitive", function (done) {
        assert.equal(TextUtils.replaceAll("abBc123", {"b": "X", "c": "Y"}), "aXBY123")
        done()
    })

    it("should replace case insensitive", function (done) {
        assert.equal(TextUtils.replaceAll("abBc123", {"b": "X", "c": "Y"}, true), "aXXY123")
        done()
    })

})