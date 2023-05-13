/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-05-04
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Cache} from "../src/cache/Cache.js"

describe("Cache", function () {

    it("should store in cache", function () {
        const cache = new Cache()
        cache.put("mykey", "myvalue")
        assert.equal(cache.get("mykey"), "myvalue")
        assert.equal(cache.get("notmykey"), undefined)
    })

    it("should invalidate cache", function () {
        const cache = new Cache({clearInterval: 100})
        cache.put("mykey", "myvalue")
        assert.equal(cache.get("mykey"), "myvalue")
        assert.equal(cache.get("notmykey"), undefined)
        setTimeout(() => {
            assert.equal(cache.get("mykey"), "myvalue")
        }, 50)
        setTimeout(() => {
            assert.equal(cache.get("mykey"), undefined)
            // done()
        }, 110)
    })

    it("should invalidate key", function () {
        const cache = new Cache()
        cache.put("mykey1", "myvalue1")
        cache.put("mykey2", "myvalue2")
        assert.equal(cache.get("mykey1"), "myvalue1")
        assert.equal(cache.get("mykey2"), "myvalue2")
        cache.clear("mykey1")
        assert.equal(cache.get("mykey1"), undefined)
        assert.equal(cache.get("mykey2"), "myvalue2")
        cache.clearAll()
        assert.equal(cache.get("mykey1"), undefined)
        assert.equal(cache.get("mykey2"), undefined)
    })
})
