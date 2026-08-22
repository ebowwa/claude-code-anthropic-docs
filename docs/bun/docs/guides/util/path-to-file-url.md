# Convert an absolute path to a file URL

Use `Bun.pathToFileURL()` to convert an absolute path to a `file://` URL.

```ts
Bun.pathToFileURL("/path/to/file.txt").href;
// => "file:///path/to/file.txt"
```

---

See [Utils](/runtime/utils).
