/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {EncryptionUtils} from "../src/utils/EncryptionUtils.js"

describe("EncryptionUtils", function () {

    it("should generate keys", function () {
        assert.equal(EncryptionUtils.createKey(1).length, 1)
        assert.equal(EncryptionUtils.createKey(10).length, 10)
        assert.equal(EncryptionUtils.createKey(11).length, 11)
        assert.equal(EncryptionUtils.createKey(32).length, 32)
        assert.equal(EncryptionUtils.createKey(128).length, 128)
        assert.true(EncryptionUtils.createKey(32) !== EncryptionUtils.createKey(32))
    })

})
