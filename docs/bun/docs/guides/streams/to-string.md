<!--
Source: https://bun.com/docs/guides/streams/to-string.md
Downloaded: 2026-08-15T20:21:45.880Z
-->

# Convert a ReadableStream to a string

Bun provides several conveniences for reading the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into other formats. To read a stream into a string, call its `text()` method.

```ts
const stream = new ReadableStream();
const str = await stream.text();
```

`Bun.readableStreamToText(stream)` does the same thing, but is deprecated in favor of `stream.text()`.

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
