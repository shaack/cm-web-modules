/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Observed} from "../src/observed/Observed.js"

describe("Observed", function () {
    it("should observe properties", function () {
        // todo test async with Promise
        const observedState = new Observed({
            number: 100,
            string: "Test",
            arrayInternalA: new Observed([])
        })

        let numberChanged = undefined
        let stringChanged = undefined
        let arrayChanged = undefined
        observedState.addObserver((target, property, value, oldValue) => {
            console.log("number changed", target, property, value, oldValue)
            numberChanged = true
        }, ["number"])
        observedState.number = 200
        observedState.addObserver((target, property, value, oldValue) => {
            console.log("string changed", target, property, value, oldValue)
            stringChanged = true
        }, ["string"])
        observedState.string = "World"

        observedState.arrayInternalA.addObserver((target, property, value, oldValue) => {
            console.log("arrayInternalA changed", target, property, value, oldValue)
            arrayChanged = true
        })
        observedState.arrayInternalA.push("test123")
        observedState.arrayInternalA[0] = "testABC"
        observedState.arrayInternalA["lala"] = "xyz123"
        observedState.arrayInternalA.push("test123")
        observedState.arrayInternalA.pop()
        observedState.arrayInternalA.push("INTERNAL")

        assert.true(numberChanged)
        assert.true(stringChanged)
        assert.true(arrayChanged)
    })
    it("should observe an array", function () {
        // todo test async with Promise
        const array = new Observed([])
        array.addObserver((properties) => {
            console.log("array", properties)
        })
        array.push("add 1")
        array.push("add 2")
        array.pop()
        array.splice(0)
    })
    class TestClass {
        constructor(props) {
            this.props = props
            this.innerObject = {

            }
        }
        getProps() {
            return this.props
        }
        setProps(props) {
            this.props = props
        }
    }
    it("should observe a class", function() {
        // todo test async with Promise
        const observedClass = new Observed(new TestClass("test"))
        observedClass.addObserver((event) => {
            console.log(event)
        })
        observedClass.props = "test1"
        observedClass.setProps("test2")
        observedClass.innerObject.lala = "Lulu"
    })
})
