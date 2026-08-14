<!--
Source: https://bun.com/docs/guides/write-file/basic.md
Downloaded: 2026-08-14T20:31:00.591Z
-->

# Write a string to a file

Use [`Bun.write()`](/runtime/file-io#writing-files-bun-write) to write a string to disk at an _absolute path_. The first argument is a _destination_; the second is the _data_ to write.

```ts
const path = "/path/to/file.txt";
await Bun.write(path, "Lorem ipsum");
```

---

Bun resolves relative paths from the current working directory.

```ts
const path = "./file.txt";
await Bun.write(path, "Lorem ipsum");
```

---

You can pass a `BunFile` as the destination. `Bun.write()` writes the data to its associated path.

```ts
const path = Bun.file("./file.txt");
await Bun.write(path, "Lorem ipsum");
```

---

`Bun.write()` returns the number of bytes written to disk.

```ts
const path = "./file.txt";
const bytes = await Bun.write(path, "Lorem ipsum");
// => 11
```

---

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
