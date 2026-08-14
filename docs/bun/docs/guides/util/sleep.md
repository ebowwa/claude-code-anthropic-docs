<!--
Source: https://bun.com/docs/guides/util/sleep.md
Downloaded: 2026-08-14T20:31:00.572Z
-->

# Sleep for a fixed number of milliseconds

`Bun.sleep()` returns a void `Promise` that resolves after a given number of milliseconds.

```ts
// sleep for 1 second
await Bun.sleep(1000);
```

---

Internally, it is equivalent to the following [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) snippet.

```ts
await new Promise(resolve => setTimeout(resolve, ms));
```

---

See [Utils](/runtime/utils).
