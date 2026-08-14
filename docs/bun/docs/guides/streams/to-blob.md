<!--
Source: https://bun.com/docs/guides/streams/to-blob.md
Downloaded: 2026-08-14T20:31:00.598Z
-->

# Convert a ReadableStream to a Blob

`Bun.readableStreamToBlob` reads the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into a `Blob`.

```ts
const stream = new ReadableStream();
const blob = await Bun.readableStreamToBlob(stream);
```

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
