<!--
Source: https://bun.com/docs/guides/process/ctrl-c.md
Downloaded: 2026-08-14T20:31:00.582Z
-->

# Listen for CTRL+C

The `ctrl+c` shortcut sends an _interrupt signal_ to the running process. Intercept it by listening for the `SIGINT` event. To close the process, you must explicitly call `process.exit()`.

```ts process.ts icon="/icons/typescript.svg"
process.on("SIGINT", () => {
  console.log("Ctrl-C was pressed");
  process.exit();
});
```

---

See [Utils](/runtime/utils) for more utilities.
