<!--
Source: https://docs.polymarket.com/market-data/chainlink-twap.md
Downloaded: 2026-08-04T21:12:25.239Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Chainlink TWAP Prices

> Consume Chainlink-computed TWAP prices directly or through Polymarket RTDS.

A time-weighted average price (TWAP) represents an asset's price across a
lookback window. This page covers Chainlink-computed 30-second and 60-second
TWAPs.

<Info>
  Chainlink Data Streams mainnet TWAP feeds are available now. You can use your
  existing standard or sponsored Data Streams credentials. Polymarket RTDS is
  scheduled to launch August 4, 2026.
</Info>

<Warning>
  Chainlink is still completing development and soak testing through August 4,
  2026\. The feeds are available for integration now but may be updated before
  then.
</Warning>

## Use Chainlink Data Streams

Use Chainlink Data Streams for direct mainnet access, the latest report before
streaming, or the original signed report. Find an asset's `TWAP: 30s` or `TWAP:
60s` ticker in the [Chainlink Data Streams
catalog](https://data.chain.link/streams), then copy its feed ID. Run this only
on a trusted backend; never expose Chainlink credentials to browsers or mobile
apps.

<Steps>
  <Step title="Install and Connect">
    Use Node.js 20+ and TypeScript 5.3+. Install the Chainlink SDK:

    ```bash theme={null}
    npm install --save-exact @chainlink/data-streams-sdk@1.2.1
    ```

    Create the mainnet client:

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
      endpoint: "https://api.dataengine.chain.link",
      wsEndpoint: "wss://ws.dataengine.chain.link",
      haMode: false,
    });
    ```

    The SDK signs each request. Keep the server clock within five seconds of
    Chainlink's server time.
  </Step>

  <Step title="Map and Decode Reports">
    Store the feed IDs from the catalog in server-side environment variables,
    then map each ID to its asset and window. Preserve the signed E18 price
    instead of converting it to a JavaScript `number`:

    ```ts theme={null}
    const feeds = new Map<string, TwapFeed>([
      [
        requireEnv("CHAINLINK_TWAP_30S_FEED_ID").toLowerCase(),
        { symbol: "btc/usd", windowSeconds: 30 },
      ],
      [
        requireEnv("CHAINLINK_TWAP_60S_FEED_ID").toLowerCase(),
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
        "feedID": "0x<mainnet-feed-id>",
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

The TWAP feeds use Chainlink report schema V2. `decodeReport()` exposes the
encoded `benchmarkPrice` as `decoded.price`.

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

### Find a Feed ID

Open the [Chainlink Data Streams catalog](https://data.chain.link/streams) and
search for the asset and window you need, such as `BTC / USD - TWAP: 30s` or
`BTC / USD - TWAP: 60s`. Copy the feed ID from the product page and use it with
your existing standard or sponsored Data Streams credentials.

| REST URL                            | WebSocket URL                    |
| ----------------------------------- | -------------------------------- |
| `https://api.dataengine.chain.link` | `wss://ws.dataengine.chain.link` |

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
    Requires Node.js 24+ and `@polymarket/client` 0.3.0 or later:

    ```bash theme={null}
    npm install @polymarket/client
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
    Requires Python 3.11+ and `polymarket-client` 0.3.0 or later:

    ```bash theme={null}
    python -m pip install --upgrade polymarket-client
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
