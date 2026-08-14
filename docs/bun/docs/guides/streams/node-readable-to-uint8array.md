<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-uint8array.md
Downloaded: 2026-08-14T20:31:00.599Z
-->

# Convert a Node.js Readable to an Uint8Array

To convert a Node.js `Readable` stream to a `Uint8Array` in Bun, create a `Response` with the stream as the body, then call `bytes()`.

```ts
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const buf = await new Response(stream).bytes();
```
