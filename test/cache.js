/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-05-04
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Cache} from "../src/cm-web-modules/cache/Cache.js"

describe("Cache", function () {

    it("should store in cache", function () {
        const cache = new Cache()
        cache.put("mykey", "myvalue")
        assert.equals(cache.get("mykey"), "myvalue")
        assert.equals(cache.get("notmykey"), undefined)
    })

    it("should invalidate cache", function (done) {
        const cache = new Cache({clearInterval: 100})
        cache.put("mykey", "myvalue")
        assert.equals(cache.get("mykey"), "myvalue")
        assert.equals(cache.get("notmykey"), undefined)
        setTimeout(() => {
            assert.equals(cache.get("mykey"), "myvalue")
        }, 50)
        setTimeout(() => {
            assert.equals(cache.get("mykey"), undefined)
            done()
        }, 110)
    })

    it("should invalidate key", function () {
        const cache = new Cache()
        cache.put("mykey1", "myvalue1")
        cache.put("mykey2", "myvalue2")
        assert.equals(cache.get("mykey1"), "myvalue1")
        assert.equals(cache.get("mykey2"), "myvalue2")
        cache.clear("mykey1")
        assert.equals(cache.get("mykey1"), undefined)
        assert.equals(cache.get("mykey2"), "myvalue2")
        cache.clearAll()
        assert.equals(cache.get("mykey1"), undefined)
        assert.equals(cache.get("mykey2"), undefined)
    })
})