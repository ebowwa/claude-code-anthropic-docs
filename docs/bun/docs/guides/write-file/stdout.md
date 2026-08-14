<!--
Source: https://bun.com/docs/guides/write-file/stdout.md
Downloaded: 2026-08-14T20:31:00.592Z
-->

# Write to stdout

The `console.log` function writes to `stdout` and appends a line break to the printed data.

```ts
console.log("Lorem ipsum");
```

---

Bun also exposes `stdout` as a `BunFile` with the `Bun.stdout` property. Pass it as the destination to [`Bun.write()`](/runtime/file-io#writing-files-bun-write).

```ts
await Bun.write(Bun.stdout, "Lorem ipsum");
```

---

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
