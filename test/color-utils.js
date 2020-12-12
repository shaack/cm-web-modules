/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Assert} from "../src/cm-web-modules/assert/Assert.js"
import {ColorUtils} from "../src/cm-web-modules/utils/ColorUtils.js"

describe("ColorUtils", function () {

    it("should convert RGB to Hex", function () {
        Assert.equals(ColorUtils.rgbToHex({r: 0, g: 0, b: 0}), "#000000")
        Assert.equals(ColorUtils.rgbToHex({r: 255, g: 255, b: 0}), "#ffff00")
        Assert.equals(ColorUtils.rgbToHex(234, 56, 30), "#ea381e")
    })

    it("should convert Hex to RGB", function () {
        // Assert.equals(ColorUtils.hexToRgb("#000000"), {r:0, g:0, b: 0})
        const hex = "#17a69f"
        const rgb = ColorUtils.hexToRgb(hex)
        const hex2 = ColorUtils.rgbToHex(rgb)
        Assert.equals(hex2, hex)
    })

    it("should convert RGB to HSL", function () {
        const hsl = ColorUtils.rgbToHsl({r: 34, g: 76, b: 250})
        Assert.equals(hsl.h, 228)
        Assert.equals(hsl.s, 96)
        Assert.equals(hsl.l, 56)
    })

    it("should convert HSL to RGB", function () {
        const rgb = ColorUtils.hslToRgb({h: 228, s: 96, l: 56})
        Assert.equals(rgb.r, 35)
        Assert.equals(rgb.g, 78)
        Assert.equals(rgb.b, 251)
    })

    it("should convert HSL to Hex", function () {
        const hex = ColorUtils.hslToHex({h: 228, s: 96, l: 56})
        Assert.equals(hex, "#234efb")
        const hex2 = ColorUtils.hslToHex({h: 0, s: 96, l: 56})
        console.log(hex2)
        Assert.equals(hex2, "#fb2323")
    })

    it("should convert Hex to HSL", function () {
        const hsl = ColorUtils.hexToHsl("#234efb")
        Assert.equals(hsl.h, 228)
        Assert.equals(hsl.s, 96)
        Assert.equals(hsl.l, 56)
    })

})