<!--
Source: https://bun.com/docs/guides/binary/typedarray-to-blob.md
Downloaded: 2026-08-15T20:21:45.880Z
-->

# Convert a Uint8Array to a Blob

You can construct a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) from an array of "chunks", where each chunk is a string, binary data structure (including `Uint8Array`), or another `Blob`.

```ts
const arr = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
const blob = new Blob([arr]);
console.log(await blob.text());
// => "hello"
```

---

See [Binary Data](/runtime/binary-data#conversion).
