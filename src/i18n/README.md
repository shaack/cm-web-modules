# I18n

Internationalization with automatic locale detection, fallback languages, and placeholder substitution.

## Usage

```js
import {I18n} from "./I18n.js"

const i18n = new I18n({fallbackLang: "en"})
```

### Load translations inline

```js
i18n.load({
    de: {"greeting": "Hallo $0"},
    en: {"greeting": "Hello $0"}
})
```

### Load translations from JSON files

```js
i18n.load({
    de: "translations/de.json",
    en: "translations/en.json"
}).then(() => {
    console.log(i18n.t("greeting", "World"))
})
```

JSON file format:

```json
{
    "greeting": "Hello $0",
    "farewell": "Goodbye"
}
```

### Translate

```js
i18n.t("greeting", "World")  // "Hello World"
i18n.t("farewell")           // "Goodbye"
```

Use `$0`, `$1`, ... `$9` as placeholders, replaced by additional arguments to `t()`.

## Constructor props

| Prop | Default | Description |
|------|---------|-------------|
| `locale` | `null` | Override locale (auto-detected from `<html lang>` or `navigator.language`) |
| `fallbackLang` | `"en"` | Fallback language when translation is missing |

## Methods

- `load(dictionary)` — load translations (object or file paths). Returns a `Promise`
- `t(code, ...values)` — translate a key, optionally replacing `$n` placeholders
