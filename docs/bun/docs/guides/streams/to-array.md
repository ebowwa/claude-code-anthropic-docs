<!--
Source: https://bun.com/docs/guides/streams/to-array.md
Downloaded: 2026-08-14T20:31:00.598Z
-->

# Convert a ReadableStream to an array of chunks

`Bun.readableStreamToArray` reads the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into an array of chunks.

```ts
const stream = new ReadableStream();
const str = await Bun.readableStreamToArray(stream);
```

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
