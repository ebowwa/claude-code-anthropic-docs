<!--
Source: https://bun.com/docs/guides/util/import-meta-dir.md
Downloaded: 2026-08-14T20:31:00.573Z
-->

# Get the directory of the current file

Bun provides a handful of module-specific utilities on the [`import.meta`](/runtime/module-resolution#import-meta) object. Use `import.meta.dir` to retrieve the absolute path to the directory containing the current file.

```ts /a/b/c.ts icon="/icons/typescript.svg"
import.meta.dir; // => "/a/b"
```

---

See [`import.meta`](/runtime/module-resolution#import-meta).
