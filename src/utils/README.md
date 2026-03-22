# Utils

Static utility classes for common operations.

## ArrayUtils

```js
import {ArrayUtils} from "./ArrayUtils.js"
```

- `ArrayUtils.pushAll(fromArray, toArray)` — push all elements from one array to another
- `ArrayUtils.unshiftAll(fromArray, toArray)` — unshift all elements from one array to another

## ColorUtils

```js
import {ColorUtils} from "./ColorUtils.js"
```

Color conversion between RGB, Hex, and HSL. All methods accept either individual values or an object (`{r, g, b}` or `{h, s, l}`).

- `ColorUtils.rgbToHex(r, g, b)` — returns `"#rrggbb"`
- `ColorUtils.hexToRgb(hex)` — returns `{r, g, b}`
- `ColorUtils.rgbToHsl(r, g, b)` — returns `{h, s, l}` (h: 0–360, s/l: 0–100)
- `ColorUtils.hslToRgb(h, s, l)` — returns `{r, g, b}`
- `ColorUtils.hslToHex(h, s, l)` — returns `"#rrggbb"`
- `ColorUtils.hexToHsl(hex)` — returns `{h, s, l}`

## CoreUtils

```js
import {CoreUtils} from "./CoreUtils.js"
```

- `CoreUtils.debounce(callback, wait, immediate)` — returns a debounced function. `wait` in ms (default `0`), `immediate` fires on leading edge
- `CoreUtils.mergeObjects(target, source)` — deep merge `source` into `target`
- `CoreUtils.createTask()` — creates a Promise with externally accessible `.resolve()` and `.reject()` methods

## DateUtils

```js
import {DateUtils} from "./DateUtils.js"
```

Timestamp difference calculations (parameters are ms timestamps):

- `DateUtils.diffInMs(from, to)`
- `DateUtils.diffInSeconds(from, to)`
- `DateUtils.diffInMinutes(from, to)`
- `DateUtils.diffInHours(from, to)`
- `DateUtils.diffInDays(from, to)`

## DomUtils

```js
import {DomUtils} from "./DomUtils.js"
```

### Document & elements

- `DomUtils.onDocumentReady(callback)` — run callback when DOM is ready
- `DomUtils.createElement(html)` — create a DOM element from an HTML string
- `DomUtils.removeElement(element)` — remove an element from the DOM
- `DomUtils.clearElement(element)` — remove all children from an element
- `DomUtils.insertAfter(newChild, refChild)` — insert an element after a reference element

### Visibility

- `DomUtils.isElementVisible(element)` — returns `true` if the element has layout
- `DomUtils.isElementInViewport(element)` — returns `true` if the element is in the viewport

### Events

- `DomUtils.delegate(element, eventName, selector, handler)` — delegate events to child elements matching a selector. Returns `{remove}` to unbind
- `DomUtils.autoBindDataEvents(controller, props)` — bind `data-event`/`data-action`/`data-delegate` attributes to `controller.actions`
- `DomUtils.onDomNodeRemoved(elementToWatch, callback, parent)` — observe when an element is removed

### Forms

- `DomUtils.getFormInputValues(context)` — returns `{id: value}` for all inputs/selects in context
- `DomUtils.disableButtonsOnSubmit()` — auto-disable buttons with `data-disable-on-submit`

### CSS custom properties

- `DomUtils.setCustomProperty(name, value, element)` — set a CSS custom property (`--name`)
- `DomUtils.getCustomProperty(name, element)` — get a CSS custom property value

### Dark mode

- `DomUtils.isBrowserDarkMode()` — returns `true` if the browser prefers dark mode
- `DomUtils.browserSupportsPreferredColorScheme()` — returns `true` if `prefers-color-scheme` is supported

### Loading resources

- `DomUtils.loadJs(src)` — inject a `<script>` tag
- `DomUtils.loadCss(src)` — inject a `<link>` stylesheet tag

### Links

- `DomUtils.isExternalLink(link)` — returns `true` if the link points to a different hostname
- `DomUtils.openExternalLinksBlank(context)` — set `target="_blank"` on all external links

## EncryptionUtils

```js
import {EncryptionUtils} from "./EncryptionUtils.js"
```

- `EncryptionUtils.createKey(length)` — generate a random alphanumeric key (default length `10`)

## HttpUtils

```js
import {HttpUtils} from "./HttpUtils.js"
```

- `HttpUtils.getUrlParameter(name, url)` — get a URL query parameter value. `url` defaults to current page

## TextUtils

```js
import {TextUtils} from "./TextUtils.js"
```

- `TextUtils.crop(str, maxLength)` — truncate with `…` if longer than `maxLength`
- `TextUtils.wrap(str, maxLength)` — word-wrap text to lines of `maxLength`
- `TextUtils.stripHtml(html)` — strip HTML tags, return plain text
- `TextUtils.escapeHtml(raw)` — escape `&`, `<`, `>`, `"`, `'` to HTML entities
- `TextUtils.nl2br(raw)` — convert newlines to `<br/>`
- `TextUtils.linkify(text)` — convert URLs in text to `<a>` links
- `TextUtils.formatTime(milliseconds, millisecondDecimalPlaces)` — format as `MM:SS` or `MM:SS.ms`
- `TextUtils.mask(text, maskChar)` — replace all characters with `maskChar` (default `"*"`)
