/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
const events = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown', 'mouseup', 'dblclick']
let audioProps = undefined
window.cmAudioDebug = false

export const createAudioContext = (props) => {
    audioProps = {
        debug: false,
        ...props
    }
    window.cmAudioDebug = audioProps.debug
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    if (window.AudioContext) {
        if (audioProps.debug) {
            console.log('Web Audio API (AudioContext) supported by this browser')
        }
        window.cmAudioContext = new AudioContext()
    } else if (window.webkitAudioContext) {
        if (audioProps.debug) {
            console.log('Web Audio API (window.webkitAudioContext) supported by this browser')
        }
        window.cmAudioContext = new webkitAudioContext()
    } else {
        console.error('Web Audio API is not supported by this browser')
    }
    window.cmMainGainNode = window.cmAudioContext.createGain()
    window.cmMainGainNode.gain.value = 1
    cmMainGainNode.connect(window.cmAudioContext.destination)
    addEventListeners()
}

export class Audio {

    static context() {
        if (!window.cmAudioContext) {
            console.error("Audio.context() called before createAudioContext()")
        }
        return window.cmAudioContext
    }

    static destination() {
        return window.cmMainGainNode
    }

    static setGain(gain) {
        window.cmMainGainNode.gain.setValueAtTime(gain, window.cmAudioContext.currentTime)
    }

    static isEnabled() {
        return window.cmAudioContext.state === "running"
    }

    /*
        Adds an event listener to the audioContext object
        that listens for the "statechange" event. This event is triggered whenever the state of the AudioContext changes
        (e.g., from "suspended" to "running" or vice versa). The listener function will be called whenever this event occurs,
        allowing you to execute custom code in response to changes in the AudioContext state.
     */
    static addStateListener(listener) {
        window.cmAudioContext.addEventListener("statechange", listener)
    }

    /*
        can be called from the UI to resume the AudioContext after user interaction
     */
    static resumeAudioContext() {
        resumeAudioContext()
    }

}


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
    if (window.cmAudioContext) {
        if (window.cmAudioContext.state !== "running") {
            window.cmAudioContext.resume().then(() => {
                if (audioProps.debug) {
                    console.log('AudioContext resumed successfully, state:', window.cmAudioContext.state)
                }
                removeEventListeners()
            }).catch(error => {
                console.error('Failed to resume AudioContext:', error)
            })
        } else {
            console.warn('AudioContext already running')
            removeEventListeners()
        }
    } else {
        console.error("AudioContext not created")
    }

}
