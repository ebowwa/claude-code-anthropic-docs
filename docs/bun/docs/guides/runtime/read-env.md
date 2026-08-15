<!--
Source: https://bun.com/docs/guides/runtime/read-env.md
Downloaded: 2026-08-15T20:21:45.870Z
-->

# Read environment variables

Access the current environment variables with `process.env`.

```ts index.ts icon="/icons/typescript.svg"
process.env.API_TOKEN; // => "secret"
```

---

Bun also exposes these variables as `Bun.env`, an alias of `process.env`.

```ts index.ts icon="/icons/typescript.svg"
Bun.env.API_TOKEN; // => "secret"
```

---

To print all currently-set environment variables, run `bun --print process.env`.

```sh terminal icon="terminal"
bun --print process.env
```

```txt
ProcessEnv {
  BAZ: "stuff",
  FOOBAR: "aaaaaa",
  <lots more lines>
}
```

---

See [Environment variables](/runtime/environment-variables).
