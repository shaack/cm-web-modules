/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-05-04
 */
import {Cache} from "../src/cm-web-modules/cache/Cache.js"
import assert from 'assert'

describe("Cache", function () {

    it("should store in cache", function (done) {
        const cache = new Cache()
        cache.put("mykey", "myvalue")
        assert.equal(cache.get("mykey"), "myvalue")
        assert.equal(cache.get("notmykey"), null)
        done()
    })

    it("should invalidate cache", function (done) {
        const cache = new Cache({clearInterval: 100})
        cache.put("mykey", "myvalue")
        assert.equal(cache.get("mykey"), "myvalue")
        assert.equal(cache.get("notmykey"), null)
        setTimeout(() => {
            assert.equal(cache.get("mykey"), "myvalue")
        }, 50)
        setTimeout(() => {
            assert.equal(cache.get("mykey"), null)
            done()
        }, 110)
    })

    it("should invalidate key", function (done) {
        const cache = new Cache()
        cache.put("mykey1", "myvalue1")
        cache.put("mykey2", "myvalue2")
        assert.equal(cache.get("mykey1"), "myvalue1")
        assert.equal(cache.get("mykey2"), "myvalue2")
        cache.clear("mykey1")
        assert.equal(cache.get("mykey1"), null)
        assert.equal(cache.get("mykey2"), "myvalue2")
        cache.clearAll()
        assert.equal(cache.get("mykey1"), null)
        assert.equal(cache.get("mykey2"), null)
        done()
    })
})