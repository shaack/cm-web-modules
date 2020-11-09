/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-11-09
 */
import {Cookie, DURATION} from "../src/cm-web-modules/cookie/Cookie.js"
import {Assert} from "../src/cm-web-modules/assert/Assert.js"

describe("Cookie", function () {
    it("should store and read a session cookie", () => {
        Cookie.write("testCookie1", "123")
        Assert.equals(Cookie.read("testCookie1"), "123")
    })
    it("should delete a session cookie", () => {
        Cookie.write("testCookie2", "123")
        Assert.equals(Cookie.read("testCookie2"), "123")
        Cookie.delete("testCookie2")
        Assert.equals(Cookie.read("testCookie2"), undefined)
    })
    it("should store and read a cookie with Max-Age", () => {
        Cookie.write("testCookie3", "123", DURATION.hour)
        Assert.equals(Cookie.read("testCookie3"), "123")
    })
    it("should delete a cookie with Max-Age", () => {
        Cookie.write("testCookie4", "123", 100 * DURATION.second)
        Assert.equals(Cookie.read("testCookie4"), "123")
        Cookie.delete("testCookie4")
        Assert.equals(Cookie.read("testCookie4"), undefined)
    })
    it("should expire a Cookie after 1 second", () => {
        Cookie.write("testCookie5", "123", DURATION.second)
        Assert.equals(Cookie.read("testCookie5"), "123")
        setTimeout(() => {
            Assert.equals(Cookie.read("testCookie5"), undefined)
        }, 1100)
    })
})
