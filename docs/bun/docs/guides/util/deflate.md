<!--
Source: https://bun.com/docs/guides/util/deflate.md
Downloaded: 2026-08-15T20:21:45.861Z
-->

# Compress and decompress data with DEFLATE

Use `Bun.deflateSync()` to compress a `Uint8Array` with DEFLATE.

```ts
const data = Buffer.from("Hello, world!");
const compressed = Bun.deflateSync(data);
// => Uint8Array

const decompressed = Bun.inflateSync(compressed);
// => Uint8Array
```

---

See [Utils](/runtime/utils).
