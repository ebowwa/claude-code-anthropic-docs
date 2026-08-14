<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-blob.md
Downloaded: 2026-08-14T20:31:00.599Z
-->

# Convert a Node.js Readable to a Blob

To convert a Node.js `Readable` stream to a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) in Bun, create a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) with the stream as the body, then call [`response.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob).

```ts
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const blob = await new Response(stream).blob();
```
