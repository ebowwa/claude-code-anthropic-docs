<!--
Source: https://bun.com/docs/guides/write-file/unlink.md
Downloaded: 2026-08-14T20:31:00.592Z
-->

# Delete a file

The `Bun.file()` function accepts a path and returns a `BunFile` instance. Use the `.delete()` method to delete the file.

```ts
const path = "/path/to/file.txt";
const file = Bun.file(path);

await file.delete();
```

---

See [`Bun.file()`](/runtime/file-io#reading-files-bun-file).
