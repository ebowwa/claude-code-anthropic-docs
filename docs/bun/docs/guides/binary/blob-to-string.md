<!--
Source: https://bun.com/docs/guides/binary/blob-to-string.md
Downloaded: 2026-08-14T20:31:00.595Z
-->

# Convert a Blob to a string

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) class provides several methods for consuming its contents in different formats, including `.text()`.

```ts
const blob = new Blob(["hello world"]);
const str = await blob.text();
// => "hello world"
```

---

See [Binary Data](/runtime/binary-data#conversion).
