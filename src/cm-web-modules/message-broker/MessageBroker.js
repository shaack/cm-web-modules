/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class MessageBroker {

    constructor() {
        this.topics = []
    }

    subscribe(topic, callback) {
        if (this.topics[topic] === undefined) {
            this.topics[topic] = []
        }
        if (this.topics[topic].indexOf(callback) === -1) {
            this.topics[topic].push(callback)
        }
    }

    unsubscribe(topic = null, callback = null) {
        if(callback !== null && topic !== null) {
            this.topics[topic].splice(this.topics[topic].indexOf(callback), 1)
        } else if (callback === null && topic !== null) {
            this.topics[topic] = []
        } else if (topic === null && callback !== null) {
            for (const topicName in this.topics) {
                const topic = this.topics[topicName]
                for (const topicSubscriber of topic) {
                    if(topicSubscriber === callback) {
                        this.unsubscribe(topicName, callback)
                    }
                }
            }
        } else {
            this.topics = []
        }
        if(topic !== null) {
            if(this.topics[topic] && this.topics[topic].length === 0) {
                delete this.topics[topic]
            }
        }
    }

    publish(topic, object = {}, async = true) {
        if (this.topics[topic]) {
            this.topics[topic].forEach(function (callback) {
                if(async) {
                    setTimeout(function () {
                        callback(object)
                    })
                } else {
                    return callback(object)
                }
            })
        }
    }

}
