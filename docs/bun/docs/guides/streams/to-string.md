<!--
Source: https://bun.com/docs/guides/streams/to-string.md
Downloaded: 2026-08-14T20:31:00.597Z
-->

# Convert a ReadableStream to a string

`Bun.readableStreamToText` reads the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into a string.

```ts
const stream = new ReadableStream();
const str = await Bun.readableStreamToText(stream);
```

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
