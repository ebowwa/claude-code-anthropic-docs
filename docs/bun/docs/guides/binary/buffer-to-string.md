<!--
Source: https://bun.com/docs/guides/binary/buffer-to-string.md
Downloaded: 2026-08-14T20:31:00.594Z
-->

# Convert a Buffer to a string

The [`Buffer`](https://nodejs.org/api/buffer.html) class provides a `.toString()` method that converts a `Buffer` to a string.

```ts
const buf = Buffer.from("hello");
const str = buf.toString();
// => "hello"
```

---

You can optionally specify an encoding and byte range.

```ts
const buf = Buffer.from("hello world!");
const str = buf.toString("utf8", 0, 5);
// => "hello"
```

---

See [Binary Data](/runtime/binary-data#conversion).
