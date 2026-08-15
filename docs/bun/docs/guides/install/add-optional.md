<!--
Source: https://bun.com/docs/guides/install/add-optional.md
Downloaded: 2026-08-15T20:21:45.870Z
-->

# Add an optional dependency

To add an npm package as an optional dependency, use the `--optional` flag.

```sh terminal icon="terminal"
bun add zod --optional
```

---

This adds the package to `optionalDependencies` in `package.json`.

```json package.json icon="file-json"
{
  "optionalDependencies": {
    "zod": "^4.0.0" // [!code ++]
  }
}
```

---

See [`bun install`](/pm/cli/install).
