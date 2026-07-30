<!--
Source: https://docs.polymarket.com/market-data/chainlink-twap.md
Downloaded: 2026-07-30T21:10:12.957Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Chainlink TWAP Prices

> Test Chainlink-computed TWAP prices now and prepare for Polymarket RTDS.

A time-weighted average price (TWAP) represents an asset's price across a
lookback window. This page covers Chainlink-computed 30-second and 60-second
TWAPs.

<Info>
  Chainlink Data Streams testnet is available now with authorized credentials.
  Polymarket RTDS is the recommended production integration and is scheduled to
  launch August 4, 2026.
</Info>

## Test with Chainlink Data Streams

Use Chainlink Data Streams for live testnet access, the latest report before
streaming, or the original signed report. Run it only on a trusted backend;
never expose Chainlink credentials to browsers or mobile apps.

<Warning>
  These URLs and feed IDs are testnet-only. Mainnet access, including the
  production URLs and TWAP feed IDs, will be available August 4, 2026.
</Warning>

<Steps>
  <Step title="Install and Connect">
    Use Node.js 20+ and TypeScript 5.3+. Install the Chainlink SDK:

    ```bash theme={null}
    npm install --save-exact @chainlink/data-streams-sdk@1.2.1
    ```

    Create the testnet client:

    ```ts theme={null}
    import {
      createClient,
      decodeReport,
      type Report,
    } from "@chainlink/data-streams-sdk";

    type TwapFeed = {
      symbol: string;
      windowSeconds: 30 | 60;
    };

    function requireEnv(name: string): string {
      const value = process.env[name];

      if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
      }

      return value;
    }

    const client = createClient({
      apiKey: requireEnv("CHAINLINK_CLIENT_ID"),
      userSecret: requireEnv("CHAINLINK_CLIENT_SECRET"),
      endpoint: "https://api.testnet-dataengine.chain.link",
      wsEndpoint: "wss://ws.testnet-dataengine.chain.link",
      haMode: false,
    });
    ```

    The SDK signs each request. Keep the server clock within five seconds of
    Chainlink's server time.
  </Step>

  <Step title="Map and Decode Reports">
    Map each feed ID to its asset and window. Preserve the signed E18 price
    instead of converting it to a JavaScript `number`:

    ```ts theme={null}
    const feeds = new Map<string, TwapFeed>([
      [
        "0x00027603752fe85a4c86c3adcc71abcb5ed826831d8afd4fd746a11c10cee188",
        { symbol: "btc/usd", windowSeconds: 30 },
      ],
      [
        "0x0002e64f0b0166fa748cc05cd510a11442be16279873574f98c8cfa06b42b3dd",
        { symbol: "btc/usd", windowSeconds: 60 },
      ],
    ]);

    const E18 = 10n ** 18n;

    function formatE18(value: bigint): string {
      const sign = value < 0n ? "-" : "";
      const absolute = value < 0n ? -value : value;
      const whole = absolute / E18;
      const fraction = (absolute % E18)
        .toString()
        .padStart(18, "0")
        .replace(/0+$/, "");

      return `${sign}${whole}${fraction ? `.${fraction}` : ""}`;
    }

    function readTwap(report: Report) {
      const feed = feeds.get(report.feedID.toLowerCase());

      if (!feed) {
        throw new Error(`Unexpected Chainlink feed ID: ${report.feedID}`);
      }

      const decoded = decodeReport(report.fullReport, report.feedID);

      if (decoded.version !== "V2") {
        throw new Error(`Expected a V2 report, received ${decoded.version}`);
      }

      return {
        feedID: report.feedID,
        symbol: feed.symbol,
        windowSeconds: feed.windowSeconds,
        value: formatE18(decoded.price),
        observedAt: new Date(report.observationsTimestamp * 1_000).toISOString(),
      };
    }
    ```
  </Step>

  <Step title="Fetch Latest TWAP">
    Fetch each feed's latest report before streaming:

    ```ts theme={null}
    const latestReports = await Promise.all(
      [...feeds.keys()].map((feedID) => client.getLatestReport(feedID)),
    );

    for (const report of latestReports) {
      console.log(readTwap(report));
    }
    ```

    <Accordion title="Output: Chainlink TWAP">
      ```json theme={null}
      {
        "feedID": "0x00027603752fe85a4c86c3adcc71abcb5ed826831d8afd4fd746a11c10cee188",
        "symbol": "btc/usd",
        "windowSeconds": 30,
        "value": "65000.5",
        "observedAt": "2026-07-27T19:00:00.000Z"
      }
      ```
    </Accordion>
  </Step>

  <Step title="Stream Updates">
    Subscribe to the selected feed IDs:

    ```ts theme={null}
    const stream = client.createStream([...feeds.keys()]);

    stream.on("report", (report) => {
      try {
        console.log(readTwap(report));
      } catch (error) {
        console.error("Failed to decode Chainlink report:", error);
      }
    });

    stream.on("disconnected", () => {
      console.warn("Chainlink stream disconnected");
    });

    stream.on("reconnecting", ({ attempt, delayMs }) => {
      console.warn(`Reconnecting: attempt ${attempt} in ${delayMs}ms`);
    });

    stream.on("error", (error) => {
      console.error("Chainlink stream error:", error);
    });

    await stream.connect();

    process.once("SIGINT", async () => {
      await stream.close();
      process.exit(0);
    });
    ```

    The SDK authenticates and reconnects automatically. Monitor `error`,
    `disconnected`, and `reconnecting`; restart the stream if retries are
    exhausted.
  </Step>
</Steps>

### Read a Chainlink Report

The testnet TWAP feeds listed below use Chainlink report schema V2.
`decodeReport()` exposes the encoded `benchmarkPrice` as `decoded.price`.

| Value                          | How to use it                                                       |
| ------------------------------ | ------------------------------------------------------------------- |
| `report.feedID`                | Map the report to its asset and 30-second or 60-second window       |
| `decoded.price`                | Preserve the exact signed E18 value as a `bigint` or decimal string |
| `report.validFromTimestamp`    | Read the earliest valid time in Unix seconds                        |
| `report.observationsTimestamp` | Read the Chainlink observation time in Unix seconds                 |
| `decoded.expiresAt`            | Read the report expiration time in Unix seconds                     |
| `report.fullReport`            | Access the original signed Chainlink report                         |

Reports do not include symbol or window labels. Maintain that mapping yourself,
never infer the window from update frequency, and use `observationsTimestamp`
for freshness checks.

<Note>
  `decodeReport()` parses the report fields; it does not verify the DON
  signatures. Follow Chainlink's verification requirements before using a report
  for settlement or another trust-sensitive action.
</Note>

### Testnet Feed IDs

<Accordion title="View 30-Second and 60-Second Feed IDs">
  | Asset    | 30-second feed ID                                                    | 60-second feed ID                                                    |
  | -------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
  | BTC/USD  | `0x00027603752fe85a4c86c3adcc71abcb5ed826831d8afd4fd746a11c10cee188` | `0x0002e64f0b0166fa748cc05cd510a11442be16279873574f98c8cfa06b42b3dd` |
  | ETH/USD  | `0x000257bd0c11555619448f31c8bbf36250ffdcd8de0d7bf8ab21af804d7a6142` | `0x00022f7f59660d2caf1665dc08976707de45b58518b68bb91cb499182448ae85` |
  | XRP/USD  | `0x00027cb2f348a92be0397eba6fdfa814a8473180c56ea4190272ac8e2430df12` | `0x000242f2ce7651c59f07907fa6fa7bccff0405327abffaa09e39a559ce25dc2d` |
  | SOL/USD  | `0x0002f6123d7f4f61d213f9bdd10256dc19978f61a74797b1e3479053429f20c8` | `0x0002990595e444f1c3aee99bb78536b8b8c137cfe2f01696df69a045207654c9` |
  | HYPE/USD | `0x0002a498f26948f15e1f00af0330d8fef5ea53fffe4a0bf3f7f31fc2a371ae04` | `0x00027163e67ed79a3b7d67ef68073e1d54745de32fdff1ca68b79f1e0489732a` |
  | DOGE/USD | `0x000234a7d46f9b7a6568ad7d2677a0c0028744d06ece3cc4a006201cf9a76453` | `0x00025ad76902e0d91491abfd13fa5a7320d3248ee7b030a059bd1fd35b601e0c` |
  | ZEC/USD  | `0x0002b6a49760c664e68653b4cced722239400b46905e1c1ce45733bd42d7f669` | `0x00024785f38aa028dcbdd32b24a5851c689c7a9db4924ab08480df11ec7c3949` |
  | LINK/USD | `0x0002a1d9e5e117e7627594ac561da02d6777bc170e41a90c21897a02645bd883` | `0x00021c115fafdbf603d36e1d09d7f1f837a43e464eedb382ed8344dd6e5906ce` |
  | TRX/USD  | `0x00021a7256522fbd2c5505067cdd6a37a7556d36bcb98467fbe24734527e86fd` | `0x00027d3ec00c5bb657c1b32e19e8b67d14b2ffd25632346ebf6338eb31288463` |
  | BNB/USD  | `0x00028242b80742c99e3cfed3b8f9dd48d6dfc449ffb4a4623b129c85b7a19270` | `0x0002b653f2b9497c3c798440729d52f6eaf16f37bc8edb177bf6bbd345d443e1` |
</Accordion>

<Note>
  Use these feed IDs directly. Custom TWAP feeds may not appear in `listFeeds()`
  even when your credentials can fetch and stream them.
</Note>

### Mainnet Availability

| Environment | Availability   | REST URL                                    | WebSocket URL                            |
| ----------- | -------------- | ------------------------------------------- | ---------------------------------------- |
| Testnet     | Available now  | `https://api.testnet-dataengine.chain.link` | `wss://ws.testnet-dataengine.chain.link` |
| Mainnet     | August 4, 2026 | `https://api.dataengine.chain.link`         | `wss://ws.dataengine.chain.link`         |

On August 4, replace the testnet feed IDs with the mainnet IDs released by
Chainlink. Confirm the mainnet report schema and price scale before reusing the
decoder. High Availability mode is mainnet-only; keep `haMode: false` on
testnet.

The 30-second and 60-second values are lookback windows, not publication
cadences. Chainlink computes and signs the TWAP. Define a freshness threshold
and a fallback for report gaps instead of trying to infer the calculation from
the incoming updates. Chainlink does not currently publish the custom feed's
sampling boundaries, weighting, rounding, or missing-input behavior, so do not
independently reproduce the value without a specification from Chainlink.

For production requirements, see Chainlink's [TypeScript SDK
reference](https://docs.chain.link/data-streams/reference/data-streams-api/ts-sdk),
[authentication
reference](https://docs.chain.link/data-streams/reference/data-streams-api/authentication),
and [developer
responsibilities](https://docs.chain.link/data-streams/developer-responsibilities).

## Use Polymarket RTDS

RTDS is the recommended production integration. Starting August 4, 2026, it
will relay Chainlink-computed mainnet TWAP updates without credentials.

<Warning>
  RTDS TWAP is scheduled for August 4, 2026. Before activation, subscriptions
  may return `topic not found` and emit no events. Install and deploy now, then
  create or recreate the subscription after launch; a rejected prelaunch
  subscription may not retry on an open socket. The SDK versions below need no
  update when RTDS activates.
</Warning>

Use lowercase, slash-delimited symbols such as `btc/usd`. Omit a symbol filter
to receive every available pair.

<Tabs>
  <Tab title="TypeScript">
    Requires Node.js 24+ and `@polymarket/client@0.3.0-beta.0`:

    ```bash theme={null}
    npm install --save-exact @polymarket/client@0.3.0-beta.0
    ```

    Matching bindings are included. See the [TypeScript SDK
    guide](/getting-started/typescript) for general setup.

    Subscribe with an explicit window and any symbols you need:

    ```ts theme={null}
    import { createPublicClient } from "@polymarket/client";

    const client = createPublicClient();

    const stream = await client.subscribe([
      {
        topic: "prices.crypto.chainlink.twap",
        windowSeconds: 30,
        symbols: ["btc/usd"],
      },
    ]);

    try {
      for await (const event of stream) {
        console.log({
          symbol: event.payload.symbol,
          value: event.payload.value,
          windowSeconds: event.payload.windowSeconds,
          observedAt: new Date(event.payload.timestamp).toISOString(),
        });
      }
    } finally {
      await stream.close();
    }
    ```

    Set `windowSeconds` to `30` or `60`. Omit `symbols` to receive every
    available pair. The same subscription works with a `SecureClient`.

    <Accordion title="Example output after RTDS activation">
      <CodeGroup>
        ```ts CryptoPricesChainlinkTwapEvent Union theme={null}
        type CryptoPricesChainlinkTwapThirtyEvent = {
          topic: "prices.crypto.chainlink.twap";
          type: "update";
          timestamp: EpochMilliseconds;
          payload: {
            symbol: string;
            timestamp: EpochMilliseconds;
            value: DecimalString;
            windowSeconds: 30;
          };
        };

        type CryptoPricesChainlinkTwapSixtyEvent = {
          topic: "prices.crypto.chainlink.twap";
          type: "update";
          timestamp: EpochMilliseconds;
          payload: {
            symbol: string;
            timestamp: EpochMilliseconds;
            value: DecimalString;
            windowSeconds: 60;
          };
        };

        type CryptoPricesChainlinkTwapEvent =
          | CryptoPricesChainlinkTwapThirtyEvent
          | CryptoPricesChainlinkTwapSixtyEvent;
        ```

        ```json CryptoPricesChainlinkTwapEvent Example theme={null}
        {
          "topic": "prices.crypto.chainlink.twap",
          "type": "update",
          "timestamp": 1785178800123,
          "payload": {
            "symbol": "btc/usd",
            "timestamp": 1785178800000,
            "value": "65000.5",
            "windowSeconds": 30
          }
        }
        ```
      </CodeGroup>
    </Accordion>

    `payload.value` is an exact decimal string derived from Chainlink's
    fixed-point value. Keep it as a decimal string instead of converting it to a
    JavaScript `number`. Use `payload.timestamp` as the Chainlink observation
    time; the outer `timestamp` is when the publisher submitted the update to
    RTDS.

    Once accepted, the SDK restores the subscription after disconnects. It does
    not retry a prelaunch rejection on an otherwise open socket.
  </Tab>

  <Tab title="Python">
    Requires Python 3.11+ and `polymarket-client==0.3.0b1`:

    ```bash theme={null}
    python -m pip install --upgrade "polymarket-client==0.3.0b1"
    ```

    See the [Python SDK guide](/getting-started/python) for general setup.

    Subscribe with `CryptoPricesChainlinkTwapSpec`:

    ```python theme={null}
    import asyncio

    from polymarket import AsyncPublicClient
    from polymarket.streams import CryptoPricesChainlinkTwapSpec


    async def main() -> None:
        async with AsyncPublicClient() as client:
            async with await client.subscribe(
                CryptoPricesChainlinkTwapSpec(
                    window_seconds=30,
                    symbols=["btc/usd"],
                )
            ) as stream:
                async for event in stream:
                    print(
                        event.payload.symbol,
                        event.payload.value,
                        event.payload.window_seconds,
                        event.payload.timestamp,
                    )


    asyncio.run(main())
    ```

    Set `window_seconds` to `30` or `60`. Omit `symbols` to receive every
    available pair. The same subscription works with an `AsyncSecureClient`.
    Realtime subscriptions are not available on the synchronous clients.

    <Accordion title="Example output after RTDS activation">
      <CodeGroup>
        ```python CryptoPricesChainlinkTwapEvent Type theme={null}
        class CryptoPricesChainlinkTwapPayload:
            symbol: str
            timestamp: int
            value: Decimal
            window_seconds: Literal[30, 60]

        class CryptoPricesChainlinkTwapEvent:
            topic: Literal["prices.crypto.chainlink.twap"]
            type: Literal["update"]
            timestamp: datetime | None
            payload: CryptoPricesChainlinkTwapPayload
        ```

        ```json CryptoPricesChainlinkTwapEvent Example theme={null}
        {
          "topic": "prices.crypto.chainlink.twap",
          "type": "update",
          "timestamp": "2026-07-27T19:00:00.123000Z",
          "payload": {
            "symbol": "btc/usd",
            "timestamp": 1785178800000,
            "value": "65000.5",
            "window_seconds": 30
          }
        }
        ```
      </CodeGroup>
    </Accordion>

    `payload.value` is an exact `Decimal` derived from Chainlink's fixed-point
    value. Use `payload.timestamp` as the Chainlink observation time; the outer
    `timestamp` is when the publisher submitted the update to RTDS.

    Once accepted, the SDK restores the subscription after disconnects. It does
    not retry a prelaunch rejection on an otherwise open socket.
  </Tab>

  <Tab title="API">
    Connect directly to RTDS when you need lower-level control:

    ```text theme={null}
    wss://ws-live-data.polymarket.com
    ```

    <Note>
      RTDS uses an application-level heartbeat. Send the text frame `PING` every 5
      seconds to maintain the connection.
    </Note>

    Send a subscription frame for the lookback windows you need:

    ```json theme={null}
    {
      "action": "subscribe",
      "subscriptions": [
        {
          "topic": "crypto_prices_twap_thirty",
          "type": "update",
          "filters": "{\"symbol\":\"btc/usd\"}"
        },
        {
          "topic": "crypto_prices_twap_sixty",
          "type": "update",
          "filters": "{\"symbol\":\"btc/usd\"}"
        }
      ]
    }
    ```

    | Lookback window | RTDS topic                  |
    | --------------- | --------------------------- |
    | 30 seconds      | `crypto_prices_twap_thirty` |
    | 60 seconds      | `crypto_prices_twap_sixty`  |

    `filters` must use the exact compact JSON form shown above, with one
    lowercase symbol and no spaces, such as `{"symbol":"btc/usd"}`. Omit it to
    receive every available symbol. If you need several symbols for one window,
    omit `filters` and filter updates by `payload.symbol` in your application.

    <Accordion title="Example output after RTDS activation">
      ```json theme={null}
      {
        "topic": "crypto_prices_twap_thirty",
        "type": "update",
        "timestamp": 1785178800123,
        "payload": {
          "symbol": "btc/usd",
          "value": 65000.5,
          "full_accuracy_value": "65000500000000000000000",
          "timestamp": 1785178800000,
          "window_s": 30
        }
      }
      ```
    </Accordion>

    `full_accuracy_value` is the exact signed E18 fixed-point value. Divide it by
    10<sup>18</sup> with integer or decimal arithmetic. The numeric `value` is
    provided only for display convenience.

    Use `payload.timestamp` as the Chainlink observation time; the outer
    `timestamp` is when the publisher submitted the update to RTDS. Direct
    clients must reconnect and resubscribe after a disconnect or a prelaunch
    `topic not found` response.
  </Tab>
</Tabs>

### Select a Window

Choose 30 or 60 seconds for each subscription. Subscribe twice for both.

### Stream Behavior

Subscriptions start with the next update. There is no snapshot, history, or
replay after a disconnect.
