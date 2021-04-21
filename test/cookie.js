/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-11-09
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Cookie, DURATION} from "../src/cm-web-modules/cookie/Cookie.js"

describe("Cookie", function () {
    it("should store and read a session cookie", () => {
        Cookie.write("testCookie1", "123")
        assert.equals(Cookie.read("testCookie1"), "123")
    })
    it("should delete a session cookie", () => {
        Cookie.write("testCookie2", "123")
        assert.equals(Cookie.read("testCookie2"), "123")
        Cookie.delete("testCookie2")
        assert.equals(Cookie.read("testCookie2"), undefined)
    })
    it("should store and read a cookie with Max-Age", () => {
        Cookie.write("testCookie3", "123", DURATION.hour)
        assert.equals(Cookie.read("testCookie3"), "123")
    })
    it("should delete a cookie with Max-Age", () => {
        Cookie.write("testCookie4", "123", 100 * DURATION.second)
        assert.equals(Cookie.read("testCookie4"), "123")
        Cookie.delete("testCookie4")
        assert.equals(Cookie.read("testCookie4"), undefined)
    })
    it("should expire a Cookie after 1 second", () => {
        Cookie.write("testCookie5", "123", DURATION.second)
        assert.equals(Cookie.read("testCookie5"), "123")
        setTimeout(() => {
            assert.equals(Cookie.read("testCookie5"), undefined)
        }, 1010)
    })
})
