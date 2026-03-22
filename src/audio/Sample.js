/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {Audio} from "./Audio.js"

export class Sample {

    constructor(src, props = {}) {
        this.src = src
        this.props = {
            gain: 1,
            loop: false,
            startWithoutAudioContext: true // start to play, without enabled audio context
        }
        Object.assign(this.props, props)
        this.gainNode = Audio.context().createGain()
        this.gainNode.connect(Audio.destination())
        this.setGain(this.props.gain)
        this.audioBuffer = null
        this.source = null
        this.load()
    }

    setGain(gain) {
        if(window.cmAudioDebug) {
            console.log("Sample.setGain", gain)
        }
        this.gainNode.gain.setValueAtTime(gain, Audio.context().currentTime)
    }

    play(when = undefined, offset = undefined, duration = undefined) {
        if(window.cmAudioDebug) {
            console.log("Sample.play", this.src, when, offset, duration)
        }
        if (this.props.startWithoutAudioContext || Audio.isEnabled()) {
            this.loading.then(() => {
                this.source = this.createBufferSource()
                this.source.loop = this.props.loop
                this.source.start(when, offset, duration)
            })
        }
    }

    stop(when = undefined) {
        if(window.cmAudioDebug) {
            console.log("Sample.stop", this.src, when)
        }
        if (this.source) {
            this.source.stop(when)
            this.source = null
        }
    }

    createBufferSource() {
        const source = Audio.context().createBufferSource()
        source.buffer = this.audioBuffer
        source.connect(this.gainNode)
        return source
    }

    load() {
        this.loading = fetch(this.src)
            .then(response => response.arrayBuffer())
            .then(buffer => Audio.context().decodeAudioData(buffer))
            .then(audioBuffer => { this.audioBuffer = audioBuffer })
            .catch(() => { console.error("error loading sound", this.src) })
        return this.loading
    }

}
