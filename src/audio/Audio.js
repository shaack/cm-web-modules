/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
const events = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown', 'mouseup', 'dblclick']
let audioProps = undefined
let audioContext = null
let mainGainNode = null

/** @deprecated Use Audio.createContext() instead */
export const createAudioContext = (props) => {
    console.warn("createAudioContext() is deprecated, use Audio.createContext() instead")
    Audio.createContext(props)
}

export class Audio {

    static createContext(props) {
        audioProps = {
            debug: false,
            ...props
        }
        window.cmAudioDebug = audioProps.debug
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (AudioContextClass) {
            if (audioProps.debug) {
                console.log('Web Audio API supported by this browser')
            }
            audioContext = new AudioContextClass()
        } else {
            console.error('Web Audio API is not supported by this browser')
        }
        mainGainNode = audioContext.createGain()
        mainGainNode.gain.value = 1
        mainGainNode.connect(audioContext.destination)
        // legacy global access
        window.cmAudioContext = audioContext
        window.cmMainGainNode = mainGainNode
        addEventListeners()
    }

    static context() {
        if (!audioContext) {
            console.error("Audio.context() called before Audio.createContext()")
        }
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

    /*
        Adds an event listener to the audioContext object
        that listens for the "statechange" event. This event is triggered whenever the state of the AudioContext changes
        (e.g., from "suspended" to "running" or vice versa). The listener function will be called whenever this event occurs,
        allowing you to execute custom code in response to changes in the AudioContext state.
     */
    static addStateListener(listener) {
        audioContext.addEventListener("statechange", listener)
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
    if (audioContext) {
        if (audioContext.state !== "running") {
            audioContext.resume().then(() => {
                if (audioProps.debug) {
                    console.log('AudioContext resumed successfully, state:', audioContext.state)
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
