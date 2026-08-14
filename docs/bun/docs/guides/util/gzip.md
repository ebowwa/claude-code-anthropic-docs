<!--
Source: https://bun.com/docs/guides/util/gzip.md
Downloaded: 2026-08-14T20:31:00.571Z
-->

# Compress and decompress data with gzip

Use `Bun.gzipSync()` to compress a `Uint8Array` with gzip.

```ts
const data = Buffer.from("Hello, world!");
const compressed = Bun.gzipSync(data);
// => Uint8Array

const decompressed = Bun.gunzipSync(compressed);
// => Uint8Array
```

---

See [Utils](/runtime/utils).
