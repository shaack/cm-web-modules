# Audio

Web Audio API module for playing audio samples in web pages.

## Setup

```js
import {Audio} from "./Audio.js"

Audio.createContext({debug: false})
```

### `Audio` static methods

- `Audio.createContext(props)` — initialize the audio context (must be called first)
- `Audio.context()` — returns the `AudioContext` instance
- `Audio.destination()` — returns the main gain node
- `Audio.setGain(gain)` — set the main volume (0–1)
- `Audio.isEnabled()` — returns `true` if the audio context is running
- `Audio.addStateListener(listener)` — listen for audio context state changes
- `Audio.resumeAudioContext()` — manually resume audio context after user interaction

The audio context is automatically resumed on user interaction (click, touch, keydown, etc.).

## Sample

Loads and plays an audio file via Web Audio API.

```js
import {Sample} from "./Sample.js"

const sound = new Sample("sound.mp3", {gain: 0.8})
sound.play()
```

### Constructor props

| Prop | Default | Description |
|------|---------|-------------|
| `gain` | `1` | Volume level (0–1) |
| `loop` | `false` | Loop the sample continuously |
| `startWithoutAudioContext` | `true` | Play even if audio context is not yet enabled |

### Methods

- `play(when, offset, duration)` — play the sample (all parameters optional)
- `stop(when)` — stop the currently playing sample
- `setGain(gain)` — set the sample's individual gain

## AudioSprite

Plays named slices from a single audio file. Extends `Sample`.

```js
import {AudioSprite} from "./AudioSprite.js"

const sprite = new AudioSprite("sprites.mp3", {
    slices: {
        "click": {offset: 0, duration: 0.2},
        "beep": {offset: 0.3, duration: 0.5}
    }
})
sprite.playSlice("click")
```
