<!--
Source: https://bun.com/docs/guides/read-file/exists.md
Downloaded: 2026-08-14T20:31:00.591Z
-->

# Check if a file exists

The `Bun.file()` function accepts a path and returns a `BunFile` instance. Use the `.exists()` method to check if a file exists at the given path.

```ts index.ts icon="/icons/typescript.svg"
const path = "/path/to/package.json";
const file = Bun.file(path);

await file.exists(); // boolean;
```

---

See [File I/O](/runtime/file-io) for more on working with `BunFile`.
