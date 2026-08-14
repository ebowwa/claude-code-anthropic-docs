<!--
Source: https://bun.com/docs/guides/util/escape-html.md
Downloaded: 2026-08-14T20:31:00.571Z
-->

# Escape an HTML string

`Bun.escapeHTML()` escapes HTML characters in a string. It makes the following replacements.

- `"` becomes `"&quot;"`
- `&` becomes `"&amp;"`
- `'` becomes `"&#x27;"`
- `<` becomes `"&lt;"`
- `>` becomes `"&gt;"`

This function is optimized for large input. Non-string values are converted to a string before escaping.

```ts
Bun.escapeHTML("<script>alert('Hello World!')</script>");
// &lt;script&gt;alert(&#x27;Hello World!&#x27;)&lt;/script&gt;
```

---

See [Utils](/runtime/utils).
