<!--
Source: https://bun.com/docs/guides/util/deflate.md
Downloaded: 2026-08-14T20:31:00.571Z
-->

# Compress and decompress data with DEFLATE

Use `Bun.deflateSync()` to compress a `Uint8Array` with DEFLATE.

```ts
const data = Buffer.from("Hello, world!");
const compressed = Bun.deflateSync("Hello, world!");
// => Uint8Array

const decompressed = Bun.inflateSync(compressed);
// => Uint8Array
```

---

See [Utils](/runtime/utils).
