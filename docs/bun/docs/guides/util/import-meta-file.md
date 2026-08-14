<!--
Source: https://bun.com/docs/guides/util/import-meta-file.md
Downloaded: 2026-08-14T20:31:00.573Z
-->

# Get the file name of the current file

Bun provides a handful of module-specific utilities on the [`import.meta`](/runtime/module-resolution#import-meta) object. Use `import.meta.file` to retrieve the name of the current file.

```ts /a/b/c.ts icon="/icons/typescript.svg"
import.meta.file; // => "c.ts"
```

---

See [`import.meta`](/runtime/module-resolution#import-meta).
