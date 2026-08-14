<!--
Source: https://bun.com/docs/guides/streams/to-json.md
Downloaded: 2026-08-14T20:31:00.598Z
-->

# Convert a ReadableStream to JSON

Bun provides several conveniences for reading the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into other formats. To read a stream and parse it as JSON, call its `json()` method.

```ts
const stream = new ReadableStream();
const json = await stream.json();
```

---

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
