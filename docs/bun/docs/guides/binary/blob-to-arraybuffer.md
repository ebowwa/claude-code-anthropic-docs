<!--
Source: https://bun.com/docs/guides/binary/blob-to-arraybuffer.md
Downloaded: 2026-08-14T20:31:00.595Z
-->

# Convert a Blob to an ArrayBuffer

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) class provides several methods for consuming its contents in different formats, including `.arrayBuffer()`.

```ts
const blob = new Blob(["hello world"]);
const buf = await blob.arrayBuffer();
```

---

See [Binary Data](/runtime/binary-data#conversion).
