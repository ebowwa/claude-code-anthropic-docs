<!--
Source: https://bun.com/docs/guides/install/npm-alias.md
Downloaded: 2026-08-14T20:31:00.584Z
-->

# Install a package under a different name

To install an npm package under an alias:

```sh terminal icon="terminal"
bun add my-custom-name@npm:zod
```

---

You can now import the `zod` package as `my-custom-name`.

```ts index.ts icon="/icons/typescript.svg"
import { z } from "my-custom-name";

z.string();
```

---

See [`bun install`](/pm/cli/install).
