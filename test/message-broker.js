/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {MessageBroker} from "../src/cm-web-modules/message-broker/MessageBroker.js"
import {Assert} from "../src/cm-web-modules/assert/Assert.js"

describe("MessageBroker", function () {

    it("should allow subscription for a topic", function (done) {
        const messageBroker = new MessageBroker()
        const callback = function () {
        }
        messageBroker.subscribe("test1", callback)
        Assert.equals(messageBroker.topics["test1"][0], callback)
        done()
    })

    it("should publish a text message to a subscriber", function (done) {
        const messageBroker = new MessageBroker()
        const topic = "test/topic/"
        const testMessage = "Hello World!"
        const subscriber = function (message) {
            Assert.equals(message, testMessage)
            done()
        }
        messageBroker.subscribe(topic, subscriber)
        Assert.equals(messageBroker.topics[topic][0], subscriber)
        messageBroker.publish(topic, testMessage)
    })

    it("should publish a message with an object as data to a subscriber", function (done) {
        const messageBroker = new MessageBroker()

        const topic = "test/topic"
        const testMessage = {
            name: "Peter",
            age: 33
        }
        const subscriber1 = function (message) {
            Assert.equals("Peter", message.name)
            Assert.equals(33, message.age)
            done()
        }
        const subscriber2 = function (message) {
            assert.fail()
            done()
        }

        messageBroker.subscribe(topic, subscriber1)
        messageBroker.subscribe("false/topic", subscriber2)
        Assert.equals(messageBroker.topics[topic][0], subscriber1)
        messageBroker.publish(topic, testMessage)
    })

    it("should subscribe to a topic with wildcard", function (done) {
        const messageBroker = new MessageBroker()
        messageBroker.subscribe("test/#", function(data, topic) {
            Assert.equals(data, "thedata")
            Assert.equals(topic, "test/the/wildcard")
            done()
        })
        messageBroker.publish("test/the/wildcard", "thedata")
    })

    it("should subscribe to all topics with wildcard #", function (done) {
        const messageBroker = new MessageBroker()
        messageBroker.subscribe("#", function() {
            done()
        })
        messageBroker.publish("test/the/wildcard/more")
    })

    it("should subscribe multiple subscribers and unsubscribe one for a topic", function (done) {
        const messageBroker = new MessageBroker()

        const topic1 = "topic/correct"
        const topic2 = "topic/false"
        const testMessage1 = {
            // noinspection JSUnusedGlobalSymbols
            data: "Hello"
        }
        const testMessage2 = {}

        const subscriber1 = function () {
            assert.fail()
        }
        const subscriber2 = function (message) {
            Assert.equals("Hello", message.data)
            done()
        }
        const subscriber3 = function () {
            assert.fail()
        }

        messageBroker.subscribe(topic1, subscriber1)
        messageBroker.subscribe(topic1, subscriber2)
        messageBroker.subscribe(topic2, subscriber3)
        Assert.equals(2, Object.keys(messageBroker.topics).length)
        Assert.equals(2, messageBroker.topics[topic1].length)
        Assert.equals(1, messageBroker.topics[topic2].length)

        messageBroker.unsubscribe(topic1, subscriber1)

        Assert.equals(2, Object.keys(messageBroker.topics).length)
        Assert.equals(1, messageBroker.topics[topic1].length)
        Assert.equals(1, messageBroker.topics[topic2].length)

        Assert.equals(messageBroker.topics[topic1][0], subscriber2)
        Assert.equals(messageBroker.topics[topic2][0], subscriber3)

        messageBroker.publish(topic1, testMessage1)
    })

    it("should unsubscribe all callbacks for a topic", function (done) {
        const messageBroker = new MessageBroker()

        const topic1 = "test/topic1"
        const topic2 = "test/topic2"

        const subscriber1 = function () {
            assert.fail()
        }
        const subscriber2 = function () {
            assert.fail()
        }
        const subscriber3 = function () {
            done()
        }

        messageBroker.subscribe(topic1, subscriber1)
        messageBroker.subscribe(topic1, subscriber2)
        messageBroker.subscribe(topic2, subscriber3)

        messageBroker.unsubscribe(topic1)

        Assert.equals(1, Object.keys(messageBroker.topics).length)
        Assert.equals(undefined, messageBroker.topics[topic1])
        Assert.equals(1, messageBroker.topics[topic2].length)

        Assert.equals(messageBroker.topics[topic2][0], subscriber3)

        messageBroker.publish(topic1)
        messageBroker.publish(topic2)
    })

    it("should unsubscribe all topics for a callback", function (done) {
        const messageBroker = new MessageBroker()

        const topic1 = "test/topic1"
        const topic2 = "test/topic2"

        const subscriber1 = function () {
            assert.fail()
        }
        const subscriber2 = function () {
            done()
        }

        messageBroker.subscribe(topic1, subscriber1)
        messageBroker.subscribe(topic1, subscriber2)
        messageBroker.subscribe(topic2, subscriber1)

        messageBroker.unsubscribe(null, subscriber1)

        Assert.equals(1, Object.keys(messageBroker.topics).length)
        Assert.equals(1, messageBroker.topics[topic1].length)
        Assert.equals(undefined, messageBroker.topics[topic2])

        Assert.equals(messageBroker.topics[topic1][0], subscriber2)

        messageBroker.publish(topic1)
        messageBroker.publish(topic2)
    })


})