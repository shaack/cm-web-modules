// noinspection JSUnresolvedVariable
/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
window.AudioContext = window.AudioContext || window.webkitAudioContext

const desiredSampleRate = 44100
// ios safari fix from https://github.com/Jam3/ios-safe-audio-context
let audioContext = new AudioContext()
const mainGainNode = audioContext.createGain()
mainGainNode.gain.value = 1
mainGainNode.connect(audioContext.destination)
if (/(iPhone|iPad)/i.test(navigator.userAgent) && audioContext.sampleRate !== desiredSampleRate) {
    const buffer = audioContext.createBuffer(1, 1, desiredSampleRate)
    const sound = audioContext.createBufferSource()
    sound.buffer = buffer
    sound.connect(audioContext.destination)
    sound.start(0)
    sound.disconnect()
    audioContext.close().then(() => {
        audioContext = new AudioContext()
        mainGainNode.connect(audioContext.destination)
    })
}

const events = ['click', 'touchstart', 'keydown', 'mousedown', 'mouseup', 'dblclick']

function addEventListeners() {
    events.forEach(event => {
        document.addEventListener(event, resumeAudioContext)
    })
}

function removeEventListeners() {
    events.forEach(event => {
        document.removeEventListener(event, resumeAudioContext)
    })
}

// start context after user interaction
function resumeAudioContext() {
    if (audioContext.state !== "running") {
        audioContext.resume().then(() => {
            console.log('Playback resumed successfully')
            // Remove all event listeners after successfully resuming the AudioContext
            removeEventListeners()
        })
    }
}
console.log("AudioContext.state", audioContext.state)
addEventListeners()

export class Audio {

    static context() {
        return audioContext
    }

    static destination() {
        return mainGainNode
    }

    static setGain(gain) {
        mainGainNode.gain.setValueAtTime(gain, audioContext.currentTime)
    }

    static isEnabled() {
        return audioContext.state === "running"
    }

}
