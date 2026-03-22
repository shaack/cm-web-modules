# Template

Simple template rendering with `${key}` placeholder substitution.

## Usage

### From a string

```js
import {Template} from "./Template.js"

const template = new Template("<h1>${title}</h1><p>${body}</p>")
const html = template.render({title: "Hello", body: "World"})
// "<h1>Hello</h1><p>World</p>"
```

### From an HTML `<template>` element

```html
<template id="my-template">
    <div class="card">${content}</div>
</template>
```

```js
const template = new Template(document.getElementById("my-template"))
const html = template.render({content: "Card text"})
```

## Methods

- `render(replacements)` — returns the template string with `${key}` placeholders replaced by values from the `replacements` object. Unmatched placeholders are left as-is.
