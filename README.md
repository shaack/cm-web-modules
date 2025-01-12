# cm-web-modules 

A library of JavaScript ES6 (ECMAScript 6) modules, used for coding [chessmail.de](https://www.chessmail.de).

The main purpose of `cm-web-modules` is, to prevent the usage of large libraries, and to provide needed functionality with the smallest and cleanest amount of code possible.

The `cm-web-modules` modules have no external dependencies, they don't use jQuery or other frameworks. They are written with modern vanilla JavaScript in ECMAScript 6 syntax.

The `cm-web-modules` modules are:

## Modules

### Audio

Module for the [Web Audio API](https://developer.mozilla.org/de/docs/Web/API/Web_Audio_API). For playing audio samples in a web page.

### Cache

Cache data on client site.

### Cookie

Module to read, write and delete cookies.

### I18n

Module to handle the internationalisation of frontend text.

```js
const i18n = new I18n(props)
```

default props:

```js
this.props = {
    locale: null,
    fallbackLang: "en" // used, when the translation was not found for locale
}
```

load language files:

```js
i18n.load("translations.json").then(() => {
    // do this after loading
})
```

where the json file has the form

```json
{
  "de": {
    "start_game": "Ein neues Spiel starten",
    "undo_move": "Zug zurück nehmen"
  },
  "en": {
    "start_game": "Start a new game",
    "undo_move": "Undo move"
  }
}
```

or directly add the translations in your js code

```js
i18n.load({
    de: {
        "0_starts_game": "$0 startet ein neues Spiel",
        "undo_move": "Zug zurück nehmen"
    },
    en: {
        "0_starts_game": "$0 starts a new game",
        "undo_move": "Undo move"
    }
})
```

Use placeholder $n [0-9] to replace them when using.  

To handle the translations in your frontend code use

```js
i18n.t("0_starts_game", ["John Doe"])
i18n.t("undo_move")
```
to render the needed text in the needed language. You can specify
the language in the `props` when calling new or it uses the browser
preferences.

### MessageBroker

TODO documentation

### Observe

Module to observe object properties used for reactive coding the simple way.

### Observed

TODO documentation, replaces "Observe"

### Promise Queue

TODO documentation

### Stopwatch

```js
const stopwatch = new Stopwatch({
    onStateChanged: (running) => {
        stateOutput.innerText = running
    },
    onTimeChanged: (seconds) => {
        secondsOutput.innerText = seconds.toFixed(1)
    }
})
buttonStart.addEventListener("click", () => {
    stopwatch.start()
})
buttonStop.addEventListener("click", () => {
    stopwatch.stop()
})
buttonReset.addEventListener("click", () => {
    stopwatch.reset()
})
```

### SVG

Module to render SVG elements and load sprites.

### Template

TODO documentation

### Utils

ArrayUtils, ColorUtils, CoreUtils, DateUtils, DomUtils, EncryptionUtils,
EventUtils, TextUtils
