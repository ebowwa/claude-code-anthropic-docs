<!--
Source: https://bun.com/docs/guides/binary/buffer-to-blob.md
Downloaded: 2026-08-14T20:31:00.595Z
-->

# Convert a Buffer to a blob

A [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) can be constructed from an array of "chunks", where each chunk is a string, binary data structure (including `Buffer`), or another `Blob`.

```ts
const buf = Buffer.from("hello");
const blob = new Blob([buf]);
```

---

See [Binary Data](/runtime/binary-data#conversion).
