# cm-web-modules – Library of ES6 Web Modules

`cm-web-modules` is a library of JavaScript ES6 (ECMAScript 6) modules, used for coding [chessmail](http://www.chessmail.eu).

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

### Observe

Module to observe object properties used for reactive coding the simple way.

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

### Utils

ArrayUtils, ColorUtils, CoreUtils, DateUtils, DomUtils, EncryptionUtils,
EventUtils, TextUtils

## LibraryManager

The LibraryManager is the glue between the web-modules. 

It is configured in `postinstall.js`. Add `postinstall.js` to the automtically excuted install-scripts from npm by adding it to `package.json` like this

`package.json`
```json
"scripts": {
    "test": "mocha --require babel-core/register ./test/*.js",
    "postinstall": "node postinstall.js"
  }
```

In `postinstall.js`, add the used modules via `manager.addProject("module-name")`

The source of the module is then copied to `PROJECT_ROOT/lib/modules/name`. It provides
the same include-folder (/lib) for the local and for the via npm installed modules.

You must call `npm install` after every `npm update`, because it is only automatically started by
the initial install.  

Example `postinstall.js`
```js
const LibraryManager = require("cm-web-modules/src/LibraryManager.js")
const manager = new LibraryManager(__dirname)

manager.addProject("cm-web-modules")
manager.addProject("chess.js", "", "chess.js")
```
