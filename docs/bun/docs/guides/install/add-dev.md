<!--
Source: https://bun.com/docs/guides/install/add-dev.md
Downloaded: 2026-08-14T20:31:00.583Z
-->

# Add a development dependency

To add an npm package as a development dependency, use `bun add --development`.

```sh terminal icon="terminal"
bun add zod --dev
bun add zod -d # shorthand
```

---

This adds the package to `devDependencies` in `package.json`.

```json
{
  "devDependencies": {
    "zod": "^3.0.0" // [!code ++]
  }
}
```

---

See [`bun install`](/pm/cli/install).
