<!--
Source: https://bun.com/docs/guides/binary/arraybuffer-to-string.md
Downloaded: 2026-08-14T20:31:00.593Z
-->

# Convert an ArrayBuffer to a string

Bun implements the Web-standard [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) class for converting between binary data types and strings.

```ts
const buf = new ArrayBuffer(64);
const decoder = new TextDecoder();
const str = decoder.decode(buf);
```

---

See [Binary Data](/runtime/binary-data#conversion).
