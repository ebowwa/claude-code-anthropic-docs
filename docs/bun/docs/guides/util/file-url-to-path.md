<!--
Source: https://bun.com/docs/guides/util/file-url-to-path.md
Downloaded: 2026-08-14T20:31:00.572Z
-->

# Convert a file URL to an absolute path

Use `Bun.fileURLToPath()` to convert a `file://` URL to an absolute path.

```ts
Bun.fileURLToPath("file:///path/to/file.txt");
// => "/path/to/file.txt"
```

---

See [Utils](/runtime/utils).
