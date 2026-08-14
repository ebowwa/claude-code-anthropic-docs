<!--
Source: https://bun.com/docs/guides/process/spawn-stdout.md
Downloaded: 2026-08-14T20:31:00.581Z
-->

# Read stdout from a child process

When you spawn a child process with [`Bun.spawn()`](/runtime/child-process), `proc.stdout` is a `ReadableStream` of the child's `stdout`.

```ts
const proc = Bun.spawn(["echo", "hello"]);

const output = await proc.stdout.text();
output; // => "hello\n"
```

---

To pipe the child process's `stdout` to the parent's `stdout` instead, set the `stdout` option to `"inherit"`.

```ts
const proc = Bun.spawn(["echo", "hello"], {
  stdout: "inherit",
});
```

---

See [Child processes](/runtime/child-process).
