<!--
Source: https://bun.com/docs/guides/streams/to-blob.md
Downloaded: 2026-08-15T20:21:45.881Z
-->

# Convert a ReadableStream to a Blob

Bun provides several conveniences for reading the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into other formats. To read a stream into a `Blob`, call its `blob()` method.

```ts
const stream = new ReadableStream();
const blob = await stream.blob();
```

`Bun.readableStreamToBlob(stream)` does the same thing, but is deprecated in favor of `stream.blob()`.

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
