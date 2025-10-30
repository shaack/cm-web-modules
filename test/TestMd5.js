/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Md5} from "../src/md5/Md5.js"

describe("Md5", function () {

    it("should hash empty string", function () {
        assert.equal(Md5.hash(""), "d41d8cd98f00b204e9800998ecf8427e")
    })

    it("should hash simple strings", function () {
        assert.equal(Md5.hash("a"), "0cc175b9c0f1b6a831c399e269772661")
        assert.equal(Md5.hash("abc"), "900150983cd24fb0d6963f7d28e17f72")
        assert.equal(Md5.hash("message digest"), "f96b697d7cb7938d525a2f31aaf161d0")
    })

    it("should hash longer strings", function () {
        assert.equal(Md5.hash("abcdefghijklmnopqrstuvwxyz"), "c3fcd3d76192e4007dfb496cca67e13b")
        assert.equal(Md5.hash("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"),
            "d174ab98d277d9f5a5611c2c9f419d9f")
    })

    it("should hash numeric strings", function () {
        assert.equal(Md5.hash("12345678901234567890123456789012345678901234567890123456789012345678901234567890"),
            "57edf4a22be3c955ac49da2e2107b67a")
    })

    it("should hash The quick brown fox", function () {
        assert.equal(Md5.hash("The quick brown fox jumps over the lazy dog"),
            "9e107d9d372bb6826bd81d3542a419d6")
        assert.equal(Md5.hash("The quick brown fox jumps over the lazy dog."),
            "e4d909c290d0fb1ca068ffaddf22cbd0")
    })

    it("should handle UTF-8 characters", function () {
        assert.equal(Md5.hash("Hello World"), "b10a8db164e0754105b7a99be72e3fe5")
        assert.equal(Md5.hash("こんにちは"), "c0e89a293bd36c7a768e4e9d2c5475a8")
        assert.equal(Md5.hash("Ä"), "b66491b03046f0846fe4206bc6a0f3c0")
    })

    it("should produce consistent results", function () {
        const input = "consistent test"
        const hash1 = Md5.hash(input)
        const hash2 = Md5.hash(input)
        assert.equal(hash1, hash2)
        assert.equal(hash1.length, 32)
    })

    it("should produce different hashes for different inputs", function () {
        const hash1 = Md5.hash("test1")
        const hash2 = Md5.hash("test2")
        assert.true(hash1 !== hash2)
    })

})