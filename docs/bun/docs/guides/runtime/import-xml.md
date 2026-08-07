<!--
Source: https://bun.com/docs/guides/runtime/import-xml.md
Downloaded: 2026-08-07T00:52:34.792Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Import an XML file

Bun natively supports `.xml` imports.

```xml config.xml icon="file-code" theme={"theme":{"light":"github-light","dark":"dracula"}}
<?xml version="1.0" encoding="UTF-8"?>
<config env="production">
  <database host="localhost" port="5432" name="myapp"/>
  <server port="3000" timeout="30"/>
  <feature name="auth"/>
  <feature name="rateLimit"/>
</config>
```

***

Import the file like any other source file. The module is the parsed document: one key for the root element, `"@name"` keys for attributes, arrays for repeated elements, and every value a string.

```ts config.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import doc from "./config.xml";

doc.config["@env"]; // => "production"
doc.config.database["@host"]; // => "localhost"
doc.config.server["@port"]; // => "3000"
doc.config.feature.map(f => f["@name"]); // => ["auth", "rateLimit"]
```

***

The root element is also available as a named import:

```ts config.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { config } from "./config.xml";

console.log(config.database["@name"]); // => "myapp"
console.log(Number(config.server["@timeout"])); // => 30
```

***

For parsing XML strings at runtime, use `Bun.XML.parse()`:

```ts config.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const data = Bun.XML.parse(`
  <user id="7">
    <name>John Doe</name>
    <hobby>reading</hobby>
    <hobby>coding</hobby>
  </user>
`);

console.log(data.user.name); // => "John Doe"
console.log(data.user.hobby); // => ["reading", "coding"]
console.log(data.user["@id"]); // => "7"
```

***

See [XML](/docs/runtime/xml) for the rest of Bun's XML support, including the ordered `{ compact: false }` node tree and `Bun.XML.stringify()`.
