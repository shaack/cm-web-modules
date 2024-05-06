// noinspection JSUnresolvedVariable
/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
window.AudioContext = window.AudioContext || window.webkitAudioContext

let audioContext = new AudioContext()
const mainGainNode = audioContext.createGain()
mainGainNode.gain.value = 1
mainGainNode.connect(audioContext.destination)

const events = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown', 'mouseup', 'dblclick']

function addEventListeners() {
    events.forEach(event => {
        document.addEventListener(event, resumeAudioContext)
    })
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(resumeAudioContext, 200)
        }
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
            console.log('AudioContext resumed successfully, state:', audioContext.state)
            removeEventListeners()
        }).catch(error => {
            console.log('Failed to resume AudioContext:', error)
        })
    }
}

console.log("AudioContext.state:", audioContext.state)
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

    static addStateListener(listener) {
        audioContext.addEventListener("statechange", listener)
    }

}
