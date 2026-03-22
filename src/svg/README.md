# Svg

SVG DOM creation and manipulation utilities.

## Usage

```js
import {Svg} from "./Svg.js"

const svg = Svg.createSvg(document.getElementById("container"))
Svg.addElement(svg, "circle", {cx: 50, cy: 50, r: 25, fill: "red"})
```

## Static methods

- `Svg.createSvg(containerElement)` — create an SVG element, optionally appended to a container (with 100% width/height)
- `Svg.addElement(parent, name, attributes)` — add an SVG child element with attributes. Handles namespaced attributes (e.g., `xlink:href`)
- `Svg.removeElement(element)` — remove an SVG element from its parent
