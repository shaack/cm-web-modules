# cm-web-modules audio

```js
createAudioContext()
const moveSound = new Sample("../../assets/move.mp3")
const volumeSlider = document.getElementById("volume-slider")
volumeSlider.addEventListener("change", () => {
    moveSound.setGain(volumeSlider.value)
    moveSound.play()
})
```

