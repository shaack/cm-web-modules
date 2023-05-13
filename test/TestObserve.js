/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Observe} from "../src/observe/Observe.js"

describe("Observe", function () {
    it("should observe properties", function () {
        const observedState = {
            number: 100,
            string: "Test",
            array: new Array(),
            array2: new Array(),
        }
        let numberChanged = undefined
        let stringChanged = undefined
        let arrayChanged = undefined
        let array2Changed = undefined
        Observe.property(observedState, "number", () => {
            numberChanged = true
        })
        Observe.property(observedState, "string", () => {
            stringChanged = true
        })
        Observe.property(observedState, "array", () => {
            arrayChanged = true
        })
        Observe.property(observedState, "array2", () => {
            array2Changed = true
        })
        observedState.number = 50
        observedState.string = "lala"
        observedState.array.push(123)
        observedState.array2 = ["a", "b", "c"]
        assert.true(numberChanged)
        assert.true(stringChanged)
        assert.true(arrayChanged)
        assert.true(array2Changed)
    })
})
