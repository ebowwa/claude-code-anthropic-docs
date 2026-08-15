<!--
Source: https://bun.com/docs/guides/util/sleep.md
Downloaded: 2026-08-15T20:21:45.862Z
-->

# Sleep for a fixed number of milliseconds

`Bun.sleep()` returns a void `Promise` that resolves after a given number of milliseconds.

```ts
// sleep for 1 second
await Bun.sleep(1000);
```

---

Internally, `Bun.sleep()` is equivalent to the following [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) snippet.

```ts
await new Promise(resolve => setTimeout(resolve, ms));
```

---

See [Utils](/runtime/utils).
