/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {DateUtils} from "../utils/DateUtils.js"

export class Stopwatch {

    constructor(props = {}) {
        this.startDate = null
        this.endDate = null
        this.dateAtLatestStart = null
        this.secondsExpiredTillLastPause = 0.0
        this.secondsExpiredSinceLastStart = 0.0
        this.timer = null
        this.timerStateChanged = props.onStateChanged
        this.timerSecondsChanged = props.onSecondsChanged
    }

    secondsExpired() {
        return this.secondsExpiredTillLastPause + this.secondsExpiredSinceLastStart
    }

    start() {
        if (this.secondsExpired() === 0) {
            this.startDate = new Date()
        }
        if (!this.running()) {
            this.secondsExpiredSinceLastStart = 0
            this.dateAtLatestStart = new Date()
            this.timer = setInterval(() => {
                this.tick()
            }, 100)
            this.timerStateChanged(this.running())
            this.timerSecondsChanged(this.secondsExpiredTillLastPause)
        }
    }

    stop() {
        if (this.running()) {
            clearInterval(this.timer)
            this.timer = null
            this.endDate = new Date()
            this.secondsExpiredTillLastPause = this.secondsExpired()
            this.secondsExpiredSinceLastStart = 0
            this.timerStateChanged(this.running())
        }
    }

    reset() {
        this.secondsExpiredSinceLastStart = 0
        this.secondsExpiredTillLastPause = 0
        this.startDate = new Date()
        this.dateAtLatestStart = new Date()
        this.timerSecondsChanged(this.secondsExpired())
        this.timerStateChanged(this.running())

    }

    tick() {
        const newSecondsExpired = (DateUtils.diffInMs(this.dateAtLatestStart.getTime(), new Date().getTime()) / 1000)
        if (newSecondsExpired !== this.secondsExpiredSinceLastStart) {
            this.secondsExpiredSinceLastStart = newSecondsExpired
            this.timerSecondsChanged(this.secondsExpired())
        }
    }

    running() {
        return this.timer != null
    }
}