<!--
Source: https://bun.com/docs/guides/streams/to-arraybuffer.md
Downloaded: 2026-08-14T20:31:00.598Z
-->

# Convert a ReadableStream to an ArrayBuffer

`Bun.readableStreamToArrayBuffer` reads the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into an `ArrayBuffer`.

```ts
const stream = new ReadableStream();
const buf = await Bun.readableStreamToArrayBuffer(stream);
```

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
