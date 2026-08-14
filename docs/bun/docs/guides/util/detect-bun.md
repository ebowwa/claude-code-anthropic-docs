<!--
Source: https://bun.com/docs/guides/util/detect-bun.md
Downloaded: 2026-08-14T20:31:00.570Z
-->

# Detect when code is executed with Bun

Check `process.versions.bun` to detect whether code is running in Bun. This works in both JavaScript and TypeScript without extra type definitions.

```ts
if (process.versions.bun) {
  // this code will only run when the file is run with Bun
}
```

---

Alternatively, check for the `Bun` global, the same way you'd check for `window` to detect a browser.

<Note>
  In TypeScript, this is a type error unless `@types/bun` is installed. Install it with `bun add -d @types/bun`.
</Note>

```ts
if (typeof Bun !== "undefined") {
  // this code will only run when the file is run with Bun
}
```
