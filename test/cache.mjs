/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-05-04
 */
import {Cache} from "../src/cm-web-modules/cache/Cache.mjs"
import {Assert} from "../src/cm-web-modules/assert/Assert.mjs"

describe("Cache", function () {

    it("should store in cache", function () {
        const cache = new Cache()
        cache.put("mykey", "myvalue")
        Assert.equals(cache.get("mykey"), "myvalue")
        Assert.equals(cache.get("notmykey"), undefined)
    })

    it("should invalidate cache", function (done) {
        const cache = new Cache({clearInterval: 100})
        cache.put("mykey", "myvalue")
        Assert.equals(cache.get("mykey"), "myvalue")
        Assert.equals(cache.get("notmykey"), undefined)
        setTimeout(() => {
            Assert.equals(cache.get("mykey"), "myvalue")
        }, 50)
        setTimeout(() => {
            Assert.equals(cache.get("mykey"), undefined)
            done()
        }, 110)
    })

    it("should invalidate key", function () {
        const cache = new Cache()
        cache.put("mykey1", "myvalue1")
        cache.put("mykey2", "myvalue2")
        Assert.equals(cache.get("mykey1"), "myvalue1")
        Assert.equals(cache.get("mykey2"), "myvalue2")
        cache.clear("mykey1")
        Assert.equals(cache.get("mykey1"), undefined)
        Assert.equals(cache.get("mykey2"), "myvalue2")
        cache.clearAll()
        Assert.equals(cache.get("mykey1"), undefined)
        Assert.equals(cache.get("mykey2"), undefined)
    })
})