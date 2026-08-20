> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Transaction Status

> Track bridge deposits and withdrawals through completion

After sending assets to a bridge address, use the status endpoint to follow the transfer until the funds land. The same request covers deposits and withdrawals: you always query the bridge address that received the funds, not the wallet on either end.

## Check Status

Request the transactions for a bridge address.

```bash theme={null}
curl --get https://bridge.polymarket.com/status/0x23566f8b2E82aDfCf01846E54899d110e97AC053 \
  --data-urlencode 'limit=50'
```

<Note>
  Use the bridge address from the `/deposit` or `/withdraw` response (EVM, SVM,
  Tron, or BTC), not your Polymarket wallet address.
</Note>

```json theme={null}
{
  "transactions": [
    {
      "fromChainId": "1",
      "fromTokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "fromAmountBaseUnit": "1000000000",
      "toChainId": "137",
      "toTokenAddress": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
      "status": "COMPLETED",
      "txHash": "0xabc123…",
      "createdTimeMs": 1697875200000
    }
  ],
  "nextCursor": "eyJsYXN0SWQiOiI0MiJ9"
}
```

| Field                | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `transactions`       | One page of transactions, newest first                                                    |
| `nextCursor`         | Token for the next page, or `null` when there is nothing older to read                    |
| `fromChainId`        | Source chain ID                                                                           |
| `fromTokenAddress`   | Token sent                                                                                |
| `fromAmountBaseUnit` | Amount in base units                                                                      |
| `toChainId`          | Destination chain ID (137 for Polygon on deposits)                                        |
| `toTokenAddress`     | Token received                                                                            |
| `status`             | Current status (see table below)                                                          |
| `txHash`             | Destination transaction hash (only when `COMPLETED`)                                      |
| `createdTimeMs`      | Unix timestamp in milliseconds (only present once the transaction has started processing) |

If no transfers have been detected at the address yet, `transactions` comes back empty.

## Transaction Statuses

Each transfer progresses through these statuses:

| Status                | Terminal | Description                                        |
| --------------------- | -------- | -------------------------------------------------- |
| `DEPOSIT_DETECTED`    | No       | Funds detected on source chain, not yet processing |
| `PROCESSING`          | No       | Transaction is being routed and swapped            |
| `ORIGIN_TX_CONFIRMED` | No       | Source chain transaction confirmed                 |
| `SUBMITTED`           | No       | Submitted to the destination chain                 |
| `COMPLETED`           | Yes      | Funds arrived — transaction successful             |
| `FAILED`              | Yes      | Transaction encountered an error                   |

<Note>
  If a bridge transaction fails, remains stuck, or funds are held due to a
  compliance check, direct users to [our Bridge API provider's
  support](https://intercom.help/funxyz/en/articles/10732578-contact-us) to
  resolve the issue.
</Note>

<Tip>
  Transfers typically complete within a few minutes, but may take longer
  depending on network conditions. Poll every 10-30 seconds until `COMPLETED` or
  `FAILED`.
</Tip>

## Read Older Transactions

Transactions come back newest first, so a request without a cursor always returns the most recent activity. That first page is all you need to track a transfer you just initiated.

### Query Parameters

| Parameter  | Type    | Default | Description                                                                                                        |
| ---------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `limit`    | integer | `50`    | Transactions per page, from `1` to `100`                                                                           |
| `cursor`   | string  | None    | Continuation token from the previous response's `nextCursor`. Omit it to request the first page.                   |
| `paginate` | string  | None    | Compatibility parameter for existing integrations. Send `paginate=true` or omit it; pagination applies either way. |

To read further back, replay the cursor exactly as you received it and repeat until `nextCursor` is `null`:

```bash theme={null}
curl --get https://bridge.polymarket.com/status/0x23566f8b2E82aDfCf01846E54899d110e97AC053 \
  --data-urlencode 'limit=100' \
  --data-urlencode 'cursor=eyJsYXN0SWQiOiI0MiJ9'
```

Cursors are opaque. Never decode, edit, or build one yourself, never reuse a cursor against a different address, and always URL-encode it — a cursor can contain `+`, `/`, or `=`. A rejected cursor returns `400 {"error": "invalid request"}`; restart the walk without one.

<Warning>
  Stop only when `nextCursor` is `null`. A page can be empty, or shorter than
  the `limit` you asked for, and still be followed by more pages.
</Warning>

## Next Steps

<CardGroup cols={2}>
  <Card title="Create Deposit" icon="arrow-right-to-bracket" href="/trading/bridge/deposit">
    Generate bridge addresses for your wallet.
  </Card>

  <Card title="Supported Assets" icon="coins" href="/trading/bridge/supported-assets">
    Check supported chains and minimum amounts.
  </Card>
</CardGroup>
