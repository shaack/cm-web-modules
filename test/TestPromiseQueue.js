/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {describe, it} from "../node_modules/teevi/src/teevi.js"
import {PromiseQueue} from "../src/promise-queue/PromiseQueue.js"

describe("PromiseQueue", function () {
    it("Should queue some promises and execute them in the right Order", function () {
        const queue = new PromiseQueue()
        queue.enqueue(
            () => new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 500)
            }).then(() => (
                console.log("1")
            ))
        )
        queue.enqueue(() => new Promise((resolve) => {
                resolve()
            }).then(() => (
                console.log("2")
            ))
        )
        queue.enqueue(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500)
            }).then(() => (
                console.log("3")
            ))
        )
        queue.enqueue(() => new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 100)
            }).then(() => (
                console.log("4")
            ))
        )
        queue.enqueue(() => new Promise((resolve) => {
                resolve()
            }).then(() => (
                console.log("5")
            ))
        )

    })
})
