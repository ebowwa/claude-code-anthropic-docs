<!--
Source: https://bun.com/docs/guides/util/version.md
Downloaded: 2026-08-14T20:31:00.570Z
-->

# Get the current Bun version

`Bun.version` contains the current version of Bun in semver format.

```ts index.ts icon="/icons/typescript.svg"
Bun.version; // => "1.3.3"
```

---

`Bun.revision` contains the exact `git` commit of [`oven-sh/bun`](https://github.com/oven-sh/bun) that was compiled to produce this Bun binary.

```ts index.ts icon="/icons/typescript.svg"
Bun.revision; // => "49231b2cb9aa48497ab966fc0bb6b742dacc4994"
```

---

See [Utils](/runtime/utils).
