<!--
Source: https://bun.com/docs/guides/websocket/compression.md
Downloaded: 2026-08-14T20:31:00.581Z
-->

# Enable compression for WebSocket messages

Set the `perMessageDeflate` parameter to compress all messages with the [permessage-deflate](https://tools.ietf.org/html/rfc7692) WebSocket extension.

```ts server.ts icon="/icons/typescript.svg"
Bun.serve({
  // ...
  websocket: {
    // enable compression
    perMessageDeflate: true,
  },
});
```

---

To enable compression for individual messages, pass `true` as the second parameter to `ws.send()`.

```ts server.ts icon="/icons/typescript.svg"
Bun.serve({
  // ...
  websocket: {
    async message(ws, message) {
      // send a compressed message
      ws.send(message, true);
    },
  },
});
```
