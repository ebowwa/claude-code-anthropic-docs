<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-arraybuffer.md
Downloaded: 2026-08-14T20:31:00.599Z
-->

# Convert a Node.js Readable to an ArrayBuffer

To convert a Node.js `Readable` stream to an `ArrayBuffer` in Bun, create a `Response` with the stream as the body, then call `arrayBuffer()`.

```ts
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const buf = await new Response(stream).arrayBuffer();
```
