/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {ColorUtils} from "../src/utils/ColorUtils.js"

describe("ColorUtils", function () {

    it("should convert RGB to Hex", function () {
        assert.equal(ColorUtils.rgbToHex({r: 0, g: 0, b: 0}), "#000000")
        assert.equal(ColorUtils.rgbToHex({r: 255, g: 255, b: 0}), "#ffff00")
        assert.equal(ColorUtils.rgbToHex(234, 56, 30), "#ea381e")
    })

    it("should convert Hex to RGB", function () {
        // assert.equal(ColorUtils.hexToRgb("#000000"), {r:0, g:0, b: 0})
        const hex = "#17a69f"
        const rgb = ColorUtils.hexToRgb(hex)
        const hex2 = ColorUtils.rgbToHex(rgb)
        assert.equal(hex2, hex)
    })

    it("should convert RGB to HSL", function () {
        const hsl = ColorUtils.rgbToHsl({r: 34, g: 76, b: 250})
        assert.equal(hsl.h, 228)
        assert.equal(hsl.s, 96)
        assert.equal(hsl.l, 56)
    })

    it("should convert HSL to RGB", function () {
        const rgb = ColorUtils.hslToRgb({h: 228, s: 96, l: 56})
        assert.equal(rgb.r, 35)
        assert.equal(rgb.g, 78)
        assert.equal(rgb.b, 251)
    })

    it("should convert HSL to Hex", function () {
        const hex = ColorUtils.hslToHex({h: 228, s: 96, l: 56})
        assert.equal(hex, "#234efb")
        const hex2 = ColorUtils.hslToHex({h: 0, s: 96, l: 56})
        assert.equal(hex2, "#fb2323")
    })

    it("should convert Hex to HSL", function () {
        const hsl = ColorUtils.hexToHsl("#234efb")
        assert.equal(hsl.h, 228)
        assert.equal(hsl.s, 96)
        assert.equal(hsl.l, 56)
    })

})
