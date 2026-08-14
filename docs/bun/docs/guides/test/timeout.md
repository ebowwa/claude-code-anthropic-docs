<!--
Source: https://bun.com/docs/guides/test/timeout.md
Downloaded: 2026-08-14T20:31:00.588Z
-->

# Set a per-test timeout with the Bun test runner

Use the `--timeout` flag to set a timeout for each test in milliseconds. A test that exceeds this timeout is marked as failed.

The default timeout is `5000` (5 seconds).

```sh terminal icon="terminal"
bun test --timeout 3000 # 3 seconds
```

---

See [`bun test`](/test).
