<!--
Source: https://bun.com/docs/guides/write-file/response.md
Downloaded: 2026-08-14T20:31:00.591Z
-->

# Write a Response to a file

Use [`Bun.write()`](/runtime/file-io#writing-files-bun-write) to write a `Response` to disk. The body of the `Response` is written to the destination.

The first argument is a _destination_, like an absolute path or `BunFile` instance. The second argument is the _data_ to write.

```ts
const result = await fetch("https://bun.com");
const path = "./file.txt";
await Bun.write(path, result);
```

---

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
