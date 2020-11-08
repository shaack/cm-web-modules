/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-11-09
 */
import {Cookie} from "../src/cm-web-modules/cookie/Cookie.js"
import {Assert} from "../src/cm-web-modules/assert/Assert.js"

describe("Cookie", function () {
    it("should store and read a session cookie", () => {
        Cookie.create("testCookie1", "123")
        Assert.equals(Cookie.read("testCookie1"), "123")
    })
    it("should delete a session cookie", () => {
        Cookie.create("testCookie2", "123")
        Assert.equals(Cookie.read("testCookie2"), "123")
        Cookie.delete("testCookie2")
        Assert.equals(Cookie.read("testCookie2"), undefined)
    })
    it("should store and read a cookie with Max-Age", () => {
        Cookie.create("testCookie3", "123", 10)
        Assert.equals(Cookie.read("testCookie3"), "123")
    })
    it("should delete a cookie with Max-Age", () => {
        Cookie.create("testCookie4", "123", 100)
        Assert.equals(Cookie.read("testCookie4"), "123")
        Cookie.delete("testCookie4")
        Assert.equals(Cookie.read("testCookie4"), undefined)
    })
    it("should expire a Cookie after 1 second", () => {
        Cookie.create("testCookie5", "123", 1)
        Assert.equals(Cookie.read("testCookie5"), "123")
        setTimeout(() => {
            Assert.equals(Cookie.read("testCookie5"), undefined)
        }, 1100)
    })
})
