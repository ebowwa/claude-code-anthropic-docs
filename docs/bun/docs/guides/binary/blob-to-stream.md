<!--
Source: https://bun.com/docs/guides/binary/blob-to-stream.md
Downloaded: 2026-08-14T20:31:00.596Z
-->

# Convert a Blob to a ReadableStream

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) class provides several methods for consuming its contents in different formats, including `.stream()`, which returns a `ReadableStream`.

```ts
const blob = new Blob(["hello world"]);
const stream = blob.stream();
```

---

See [Binary Data](/runtime/binary-data#conversion).
