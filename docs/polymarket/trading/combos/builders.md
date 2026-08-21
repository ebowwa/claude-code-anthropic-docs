> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Combos for Builders

> Request and execute Combo quotes for users through the Builder Gateway

Approved builders can request executable Combo quotes and accept them for their
users. The Builder Gateway runs a quote competition, returns the best available
quote, and tracks the accepted trade through onchain execution.

You need the builder credentials provided during onboarding, plus authenticated
access to the trading account. If you are not registered, [register as a
builder](https://builders.polymarket.com/) before continuing.

This guide starts with the custodial model, where the builder controls and signs
for one omnibus trading account. If each user signs for their own wallet, follow
the [non-custodial guide](#non-custodial-integration) at the end of this page.

<Warning>
  Keep the Builder API secret on trusted infrastructure. Never expose it in a
  browser or other untrusted client.
</Warning>

## Custodial Integration

In the custodial model, the builder holds Combo positions for users in one
omnibus Deposit Wallet and controls the account signer. The same account and
builder identity must request and accept each quote.

### Request and Execute a Quote

Choose 2–50 unique, mutually compatible underlying market position IDs as the
legs. These are outcome position IDs from
[Combo-enabled markets](/trading/combos/market-makers#get-combo-markets), not
CLOB token IDs or the derived Combo position IDs. Contradictory legs cannot form
a Combo. A BUY request sets the maximum collateral budget, including fees. A
SELL request specifies the number of Combo shares to sell.

<Tabs>
  <Tab title="TypeScript">
    Use `requestComboQuote()` on a TypeScript `SecureClient` to request, accept, and
    track a Combo quote.

    Don't have the TypeScript SDK installed? Start with the
    [TypeScript SDK guide's wallet integrations](/getting-started/typescript#wallet-integrations),
    then come back.

    <Steps>
      <Step title="Create a Custodial Client">
        Configure a `SecureClient` with the wallet signer, Deposit Wallet address, and
        Builder API Key. This server-side example keeps the account key and builder
        secret on trusted infrastructure.

        ```ts theme={null}
        import { createSecureClient } from "@polymarket/client";
        import { builderApiKey } from "@polymarket/client/node";
        import { privateKey } from "@polymarket/client/viem";

        const client = await createSecureClient({
          signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY!),
          wallet: process.env.POLYMARKET_DEPOSIT_WALLET!,
          apiKey: builderApiKey({
            key: process.env.POLYMARKET_BUILDER_API_KEY!,
            secret: process.env.POLYMARKET_BUILDER_SECRET!,
            passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
          }),
        });
        ```
      </Step>

      <Step title="Request a Quote">
        Call `requestComboQuote()` with the leg position IDs and a human-readable
        collateral amount. Amounts and sizes must be positive and have at most six
        decimal places. Combo quote requests currently target the YES side, which the
        SDK supplies by default. The method resolves when the quote competition closes.

        ```ts theme={null}
        import { OrderSide } from "@polymarket/client";

        const result = await client.requestComboQuote({
          legPositionIds: ["<yes-position-id-1>", "<yes-position-id-2>"],
          direction: OrderSide.BUY,
          amount: "10",
        });

        // result: RequestComboQuoteResult
        ```

        If no usable quote is available, `result.quote` is `null` and `result.reason`
        explains the outcome. A winning quote includes its acceptance deadline in
        `result.quote.expiresAt`, as a Unix timestamp in milliseconds. Use that value
        rather than assuming a fixed acceptance window.

        For a SELL quote, pass `direction: OrderSide.SELL` with a human-readable `size`
        instead of `amount`. The returned `quote.netReceive` is the exact collateral
        proceeds after fees.
      </Step>

      <Step title="Accept and Track the Quote">
        Pass the returned quote to `acceptComboQuote()` immediately. After it enters
        execution, call `waitForComboFill()` to wait for a terminal result.

        ```ts theme={null}
        import { RfqStatus } from "@polymarket/client";

        async function acceptAndTrackQuote() {
          if (result.quote === null) {
            console.log(`No quote available: ${result.reason}`);
            return;
          }

          const acceptance = await client.acceptComboQuote(result.quote);

          if (acceptance.status === "failed") {
            console.log(`Quote not accepted: ${acceptance.reason}`);
            return;
          }

          const fill = await client.waitForComboFill({
            rfqId: acceptance.rfqId,
            timeoutMs: 120_000,
          });

          if (fill.status === RfqStatus.Filled) {
            console.log(`Filled: ${fill.txHash}`);
            return;
          }

          console.log(`Execution ended with ${fill.status}`);
        }

        await acceptAndTrackQuote();
        ```

        An acceptance with `status: "executing"` is not yet a confirmed fill. A maker
        decline, expired window, or execution failure is returned as a business outcome.
        A local timeout does not mean the trade failed.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    Use `request_combo_quote()` on `AsyncSecureClient` to request, accept, and track
    a Combo quote. The synchronous `SecureClient` exposes the same methods.

    Don't have the Python SDK installed? Start with the
    [Python SDK guide](/getting-started/python), then come back.

    <Steps>
      <Step title="Configure Custodial Credentials">
        Load the Builder API Key on trusted infrastructure. The workflow below uses a
        server-side account key and Deposit Wallet address.

        ```python theme={null}
        import os

        from polymarket import BuilderApiKey


        builder_api_key = BuilderApiKey(
            key=os.environ["POLYMARKET_BUILDER_API_KEY"],
            secret=os.environ["POLYMARKET_BUILDER_SECRET"],
            passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
        )
        ```
      </Step>

      <Step title="Request, Accept, and Track the Quote">
        Call `request_combo_quote()` with the leg position IDs and a human-readable
        collateral amount. Amounts and sizes must be positive and have at most six
        decimal places. Combo quote requests currently target the YES side, which the
        SDK supplies by default. The method resolves when the quote competition closes.

        ```python theme={null}
        from decimal import Decimal

        from polymarket import AsyncSecureClient, RfqStatus, TimeoutError


        async with await AsyncSecureClient.create(
            private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
            wallet=os.environ["POLYMARKET_DEPOSIT_WALLET"],
            api_key=builder_api_key,
        ) as client:
            result = await client.request_combo_quote(
                leg_position_ids=["<yes-position-id-1>", "<yes-position-id-2>"],
                direction="BUY",
                amount=Decimal("10"),
            )

            if result.quote is None:
                print(f"No quote available: {result.reason}")
            else:
                try:
                    acceptance = await client.accept_combo_quote(result.quote)

                    if acceptance.status == "failed":
                        print(f"Quote not accepted: {acceptance.reason}")
                    else:
                        fill = await client.wait_for_combo_fill(
                            rfq_id=acceptance.rfq_id,
                            timeout=120.0,
                        )

                        if fill.status is RfqStatus.FILLED:
                            print(f"Filled: {fill.tx_hash}")
                        else:
                            print(f"Execution ended with {fill.status}")
                except TimeoutError:
                    status = await client.fetch_rfq_status(rfq_id=result.rfq_id)
                    print(f"Current status: {status.status}")
        ```

        If no usable quote is available, `result.quote` is `None` and `result.reason`
        explains the outcome. A winning quote includes its acceptance deadline in
        `result.quote.expires_at`, as a Unix timestamp in milliseconds. Use that value
        rather than assuming a fixed acceptance window.

        For a SELL quote, pass `direction="SELL"` with a human-readable `size` instead
        of `amount`. The returned `quote.net_receive` is the exact collateral proceeds
        after fees.

        An acceptance with `status == "executing"` is not yet a confirmed fill. A maker
        decline, expired window, or execution failure is returned as a business outcome.
        A local timeout does not mean the trade failed. The context manager closes the
        client after the workflow, including after an exception.
      </Step>
    </Steps>
  </Tab>

  <Tab title="API">
    The Direct API gives custodial server-side integrations lower-level control over
    request signing and order construction. The gateway host is provided during
    builder onboarding, and its base path is `/v1/builder/rfq`.

    <Steps>
      <Step title="Sign Request Headers">
        Create and accept requests require both account and builder authentication.
        Status requests require account authentication only.

        | Request                                   | Account headers | Builder headers |
        | ----------------------------------------- | --------------- | --------------- |
        | `POST /requests`                          | Required        | Required        |
        | `POST /requests/{rfq_id}/accept`          | Required        | Required        |
        | `GET /requests/{rfq_id}` after acceptance | Required        | Do not send     |

        The account header set is `POLY_ADDRESS`, `POLY_API_KEY`, `POLY_PASSPHRASE`,
        `POLY_TIMESTAMP`, and `POLY_SIGNATURE`. The builder header set is
        `POLY_BUILDER_API_KEY`, `POLY_BUILDER_PASSPHRASE`,
        `POLY_BUILDER_TIMESTAMP`, and `POLY_BUILDER_SIGNATURE`.

        `POLY_ADDRESS` is the EOA that owns the omnibus account credentials. Both
        `signer_address` and `maker_address` are the builder-controlled Deposit Wallet
        address.

        Compute each signature with HMAC-SHA256, using the base64-decoded secret as the
        key. Sign an uppercase method, a Unix timestamp in seconds, the full request path
        such as `/v1/builder/rfq/requests` without the host or query string, and the exact
        serialized body sent on the wire. Omit the body for `GET` requests. Encode the
        digest as base64url with padding preserved.

        ```text theme={null}
        HMAC-SHA256(
          base64Decode(secret),
          timestamp + HTTP_METHOD + FULL_REQUEST_PATH + REQUEST_BODY
        )
        ```
      </Step>

      <Step title="Create the RFQ">
        Create a BUY RFQ with a collateral budget in 6-decimal base units. The gateway
        holds the request until the quote competition finishes.

        ```http theme={null}
        POST /v1/builder/rfq/requests
        Content-Type: application/json
        POLY_ADDRESS: <account-signer-address>
        POLY_API_KEY: <account-api-key>
        POLY_PASSPHRASE: <account-passphrase>
        POLY_TIMESTAMP: <account-timestamp>
        POLY_SIGNATURE: <account-signature>
        POLY_BUILDER_API_KEY: <builder-api-key>
        POLY_BUILDER_PASSPHRASE: <builder-passphrase>
        POLY_BUILDER_TIMESTAMP: <builder-timestamp>
        POLY_BUILDER_SIGNATURE: <builder-signature>

        {
          "signer_address": "<deposit-wallet-address>",
          "maker_address": "<deposit-wallet-address>",
          "signature_type": 3,
          "leg_position_ids": ["<yes-position-id-1>", "<yes-position-id-2>"],
          "direction": "BUY",
          "side": "YES",
          "requested_size": {
            "unit": "notional",
            "value_e6": "1000000"
          }
        }
        ```

        Use `unit: "notional"` for BUY requests and `unit: "shares"` for SELL
        requests. The `value_e6` value is a string in 6-decimal base units. `side` must
        currently be `"YES"`.

        An executable response includes the RFQ, the winning quote, and an acceptance
        deadline:

        <Accordion title="Create RFQ Response">
          ```json theme={null}
          {
            "rfq_id": "<rfq-id>",
            "status": "AWAITING_REQUESTER_ACCEPTANCE",
            "expires_at": 1773890765500,
            "builder_code": "<builder-code>",
            "request": {
              "rfq_id": "<rfq-id>",
              "maker_address": "<deposit-wallet-address>",
              "requestor_public_id": "<requester-public-id>",
              "leg_position_ids": ["<yes-position-id-1>", "<yes-position-id-2>"],
              "condition_id": "<combo-condition-id>",
              "yes_position_id": "<combo-yes-position-id>",
              "no_position_id": "<combo-no-position-id>",
              "direction": "BUY",
              "side": "YES",
              "requested_size": {
                "unit": "notional",
                "value_e6": "1000000"
              },
              "created_at": 1773890758000
            },
            "quote": {
              "quote_id": "<quote-id>",
              "blended_price_e6": "500000",
              "maker_amount_e6": "966191",
              "taker_amount_e6": "1932381",
              "total_required_e6": "1000000",
              "net_receive_e6": "1932381"
            }
          }
          ```
        </Accordion>

        A terminal result such as no quotes returns HTTP `200` with `status: "FAILED"`
        and an `error` object. `expires_at` and `request.created_at` are Unix timestamps
        in milliseconds. Construct and submit the signed order before `expires_at`; do
        not assume a fixed acceptance window. `total_required_e6` is the exact requester
        balance required: collateral including fees for BUY, or Combo shares for SELL.
        For BUY quotes, `net_receive_e6` is the number of Combo shares received. For SELL
        quotes, it is the exact collateral proceeds after fees; use it instead of
        deriving proceeds from the blended price.
      </Step>

      <Step title="Accept the Quote">
        Build an Exchange v3 requester order from the returned RFQ and quote, sign it
        for the authenticated wallet type, then submit it with both authentication
        sets. Use Polygon chain ID `137` and Exchange v3 contract
        `0xe3333700cA9d93003F00f0F71f8515005F6c00Aa` for the EIP-712 domain.

        Deposit Wallets use `signatureType: 3` and an ERC-7739-wrapped signature. See
        [Authorize the Quote](/trading/combos/market-makers#authorize-the-quote) for the
        Exchange v3 order types and wallet-specific signing paths.

        ```http theme={null}
        POST /v1/builder/rfq/requests/<rfq-id>/accept
        Content-Type: application/json
        POLY_ADDRESS: <account-signer-address>
        POLY_API_KEY: <account-api-key>
        POLY_PASSPHRASE: <account-passphrase>
        POLY_TIMESTAMP: <account-timestamp>
        POLY_SIGNATURE: <account-signature>
        POLY_BUILDER_API_KEY: <builder-api-key>
        POLY_BUILDER_PASSPHRASE: <builder-passphrase>
        POLY_BUILDER_TIMESTAMP: <builder-timestamp>
        POLY_BUILDER_SIGNATURE: <builder-signature>

        {
          "quote_id": "<quote-id>",
          "signed_order": {
            "salt": "<salt>",
            "maker": "<deposit-wallet-address>",
            "signer": "<deposit-wallet-address>",
            "tokenId": "<combo-yes-position-id>",
            "makerAmount": "966191",
            "takerAmount": "1932381",
            "side": 0,
            "signatureType": 3,
            "timestamp": "<unix-seconds>",
            "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "builder": "<builder-code>",
            "signature": "<order-signature>"
          }
        }
        ```

        For both directions, copy `maker_amount_e6` to `makerAmount` and
        `taker_amount_e6` to `takerAmount`, and use the returned Combo YES position ID
        as `tokenId`. Set `side` to `0` for BUY or `1` for SELL. The order's `builder`
        must equal the returned `builder_code`.

        The response contains the latest known state. If last look is still pending,
        the gateway waits for an update for up to one second before returning. If the
        response still has `status: "AWAITING_MAKER_CONFIRMATION"`, fetch status until
        the maker responds.

        <Accordion title="Accept Quote Response">
          ```json theme={null}
          {
            "rfq_id": "<rfq-id>",
            "status": "EXECUTING",
            "taker_order_hash": "<order-hash>"
          }
          ```
        </Accordion>

        The `taker_order_hash` is the EIP-712 hash of the requester order. A maker
        decline or execution failure still returns HTTP `200`, with `status: "FAILED"`
        and a nested `error` object. Retrying the same authenticated acceptance does not
        execute twice; its response may omit `taker_order_hash`. Use `rfq_id` as the
        stable recovery identifier.
      </Step>

      <Step title="Fetch Status">
        After acceptance, fetch durable status with account headers only.

        ```http theme={null}
        GET /v1/builder/rfq/requests/<rfq-id>
        Accept: application/json
        POLY_ADDRESS: <account-signer-address>
        POLY_API_KEY: <account-api-key>
        POLY_PASSPHRASE: <account-passphrase>
        POLY_TIMESTAMP: <account-timestamp>
        POLY_SIGNATURE: <account-signature>
        ```

        <Accordion title="Status Response">
          ```json theme={null}
          {
            "rfq_id": "<rfq-id>",
            "status": "CONFIRMED",
            "tx_hash": "<transaction-hash>"
          }
          ```
        </Accordion>

        Status reads before acceptance return HTTP `409`. The status response contains
        one top-level `status` plus an optional `tx_hash` or `error`; it does not repeat
        the request or quote. Status can progress through
        `AWAITING_MAKER_CONFIRMATION`, `EXECUTING`, `MINED`, and `RETRYING` before
        reaching a successful `CONFIRMED` or `FILLED` state. `FAILED`, `EXPIRED`, and
        `CANCELED` are terminal states without a fill.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Non-Custodial Integration

In the non-custodial model, each user controls the account signer for their own
Deposit Wallet, while the builder provides integration authorization from
trusted infrastructure.

<Tabs>
  <Tab title="TypeScript">
    Use `remoteBuilderSigning()` with a TypeScript `SecureClient` so the connected
    wallet authorizes account actions while your server keeps the Builder API secret.

    Start with a connected Viem `WalletClient` and the user's Deposit Wallet
    address. See the [TypeScript wallet integrations](/getting-started/typescript#wallet-integrations)
    if you have not configured the account signer yet.

    ### Set Up Remote Builder Signing

    Combo quote requests require authenticated account access. Create a
    `SecureClient` with `remoteBuilderSigning()` so the user's signer and the
    builder's signing service authorize their parts of the request separately.

    <CodeGroup>
      ```typescript client.ts theme={null}
      import { createSecureClient, remoteBuilderSigning } from "@polymarket/client";
      import { signerFrom } from "@polymarket/client/viem";

      const client = await createSecureClient({
        signer: signerFrom(walletClient),
        wallet: depositWalletAddress,
        apiKey: remoteBuilderSigning({
          url: "/api/builder/sign",
        }),
      });
      ```

      ```typescript server.ts theme={null}
      import { buildHmacSignature } from "@polymarket/client";

      // Handler for POST /api/builder/sign
      export async function handleSignRequest(request: Request): Promise<Response> {
        const { body, method, path } = await request.json();
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = await buildHmacSignature(
          process.env.POLYMARKET_BUILDER_SECRET!,
          timestamp,
          method,
          path,
          body,
        );

        return Response.json({
          POLY_BUILDER_API_KEY: process.env.POLYMARKET_BUILDER_API_KEY!,
          POLY_BUILDER_PASSPHRASE: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
          POLY_BUILDER_SIGNATURE: signature,
          POLY_BUILDER_TIMESTAMP: `${timestamp}`,
        });
      }
      ```
    </CodeGroup>

    Here, `walletClient` is the connected Viem `WalletClient` and
    `depositWalletAddress` is that user's Deposit Wallet. Authenticate calls to
    `/api/builder/sign` with your application session. For cookie authentication,
    pass `credentials: "include"` when the signing API is cross-origin. For bearer
    authentication, pass the token through the `headers` option on
    `remoteBuilderSigning()`.

    Use a Deposit Wallet already associated with the user. To provision a new
    account first, follow [Create New Accounts](/trading/wallets-auth#create-new-accounts).

    The signing response gives the browser the Builder key identifier, passphrase,
    timestamp, and a signature scoped to that request. The Builder secret never
    leaves the signing server.

    <Warning>
      Do not sign arbitrary request details from the browser. Bind the application
      session to the expected user and Deposit Wallet, allow only the required
      method and path combinations, and validate account identities in request
      bodies. Protect cookie-backed endpoints from CSRF and rate-limit signing
      requests. Client setup can request signatures for CLOB authentication and
      Deposit Wallet checks before the Combo create and accept requests, so include
      those setup operations in your allowlist. If you parse a body to validate it,
      still sign the original raw `body` string without reserializing it.
    </Warning>

    ### Request and Execute a User-Authorized Quote

    Use the same Combo requester methods as the custodial TypeScript flow. The
    account identity now comes from the user's signer and Deposit Wallet, while
    Builder authentication comes from your signing API.

    ```ts theme={null}
    import { OrderSide, RfqStatus } from "@polymarket/client";

    async function requestAndTrackQuote() {
      const result = await client.requestComboQuote({
        legPositionIds: ["<yes-position-id-1>", "<yes-position-id-2>"],
        direction: OrderSide.BUY,
        amount: "10",
      });

      if (result.quote === null) {
        console.log(`No quote available: ${result.reason}`);
        return;
      }

      const acceptance = await client.acceptComboQuote(result.quote);

      if (acceptance.status === "failed") {
        console.log(`Quote not accepted: ${acceptance.reason}`);
        return;
      }

      const fill = await client.waitForComboFill({
        rfqId: acceptance.rfqId,
        timeoutMs: 120_000,
      });

      if (fill.status === RfqStatus.Filled) {
        console.log(`Filled: ${fill.txHash}`);
        return;
      }

      console.log(`Execution ended with ${fill.status}`);
    }

    await requestAndTrackQuote();
    ```

    The user must approve the requester order before the quote expires. Preserve the
    returned quote and retry acceptance before `result.quote.expiresAt` if wallet or
    remote signing fails. Keep the RFQ ID to recover status after an interrupted
    Gateway response or local timeout.
  </Tab>
</Tabs>

## Handle Outcomes and Errors

Custodial and non-custodial accounts share the same quote and execution
outcomes. The account model changes who authorizes the trade, not how the RFQ
progresses. Keep the RFQ ID until the request reaches a terminal state.

| Case                           | What happened                                                                 | What to do                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| No executable quote            | The competition ended without a usable quote.                                 | Treat it as a normal market outcome. Retry later or adjust the requested size. |
| Acceptance failed              | The maker declined, the deadline passed, or execution could not start.        | Request a fresh quote. Do not reuse an expired quote.                          |
| Local wait timed out           | Your client stopped waiting before a durable outcome was available.           | Fetch the RFQ status and continue until it reaches a terminal state.           |
| Execution ended without a fill | The RFQ failed, expired, or was canceled.                                     | Inspect the returned error before deciding whether to request another quote.   |
| Filled                         | The trade was confirmed onchain.                                              | Record the transaction hash and reconcile the trade and resulting positions.   |
| Request failed                 | Authentication, validation, rate limiting, transport, or a dependency failed. | Correct the reported cause; retry only when the request is safe to repeat.     |

No executable quote, failed acceptance, and terminal execution failure are
business outcomes. They can be returned successfully by the service and should
not be treated as transport failures.

### Check Each Case

<Tabs>
  <Tab title="TypeScript">
    Use `requestComboQuote()` and its follow-up methods on `SecureClient` to detect
    each case. Use the original RFQ ID when a local wait times out.

    | Case                           | How to detect or recover                                                                               |
    | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
    | No executable quote            | `result.quote === null`; inspect `result.reason`.                                                      |
    | Acceptance failed              | `acceptance.status === "failed"`; inspect `acceptance.reason`.                                         |
    | Local wait timed out           | Catch `TimeoutError`, then use the standalone `fetchRfqStatus()` action with `result.rfqId`.           |
    | Execution ended without a fill | `fill.status` is `RfqStatus.Failed`, `RfqStatus.Expired`, or `RfqStatus.Canceled`.                     |
    | Filled                         | `fill.status === RfqStatus.Filled`; the transaction hash is `fill.txHash`.                             |
    | Request failed                 | The SDK throws a typed request, input, authentication, rate-limit, transport, or response error.       |
    | Remote signing failed          | `SigningError` is thrown. This applies only when the non-custodial flow uses `remoteBuilderSigning()`. |

    If remote signing fails while accepting a quote, preserve `result.quote` and
    retry acceptance before `result.quote.expiresAt`. The acceptance may not have
    reached the Builder Gateway, so do not assume that a status read can recover it.
  </Tab>

  <Tab title="Python">
    Use `request_combo_quote()` and its follow-up methods on `AsyncSecureClient` or
    `SecureClient` to detect each case. Use the original RFQ ID when a local wait
    times out.

    | Case                           | How to detect or recover                                                                         |
    | ------------------------------ | ------------------------------------------------------------------------------------------------ |
    | No executable quote            | `result.quote is None`; inspect `result.reason`.                                                 |
    | Acceptance failed              | `acceptance.status == "failed"`; inspect `acceptance.reason`.                                    |
    | Local wait timed out           | Catch `TimeoutError`, then call `await client.fetch_rfq_status(rfq_id=result.rfq_id)`.           |
    | Execution ended without a fill | `fill.status` is `RfqStatus.FAILED`, `RfqStatus.EXPIRED`, or `RfqStatus.CANCELED`.               |
    | Filled                         | `fill.status is RfqStatus.FILLED`; the transaction hash is `fill.tx_hash`.                       |
    | Request failed                 | The SDK raises a typed request, input, authentication, rate-limit, transport, or response error. |
  </Tab>

  <Tab title="API">
    Inspect the response `status` and `error` fields after each Direct API request.
    Do not use the HTTP status alone to decide whether the trade filled.

    | Case                           | How to detect or recover                                                                                                 |
    | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
    | No executable quote            | HTTP `200` with `status: "FAILED"` and a nested `error`.                                                                 |
    | Acceptance failed              | HTTP `200` with `status: "FAILED"`, or HTTP `409` if the acceptance window expired. Request a fresh quote.               |
    | Status polling was interrupted | Repeat `GET /v1/builder/rfq/requests/{rfq_id}` with account authentication after acceptance is recorded.                 |
    | Execution ended without a fill | `status` is `FAILED`, `EXPIRED`, or `CANCELED`.                                                                          |
    | Filled                         | `status` is `CONFIRMED` or `FILLED`; the transaction hash is `tx_hash`.                                                  |
    | Request failed                 | A non-2xx response contains a stable `code` and a human-readable top-level `error`; a transport failure has no response. |

    If a create request is interrupted, do not assume that an RFQ was created. If
    an acceptance request is interrupted, safely retry the same authenticated
    acceptance before the quote expires. Once acceptance is recorded, use the RFQ
    ID for status polling.

    For requests rejected before an RFQ outcome, use the HTTP status to identify
    the failure category:

    | HTTP status | Meaning                                                                                         |
    | ----------- | ----------------------------------------------------------------------------------------------- |
    | `400`       | Invalid JSON, RFQ body, acceptance, or signed order                                             |
    | `401`       | Missing or invalid account or builder authentication                                            |
    | `403`       | Account authorization failed, or the builder key has no enabled builder code                    |
    | `404`       | Unknown RFQ                                                                                     |
    | `409`       | RFQ state conflict, expired acceptance window, quote mismatch, or status read before acceptance |
    | `429`       | RFQ request rate limit                                                                          |
    | `503`       | A required RFQ dependency is unavailable                                                        |
  </Tab>
</Tabs>

## Next Steps

<CardGroup cols={2}>
  <Card title="Collateral Return" icon="coins" href="/trading/combos/collateral-return">
    Release pUSD from compatible Combo positions before resolution.
  </Card>

  <Card title="Discover Combo Markets" icon="magnifying-glass" href="/trading/combos/market-makers#get-combo-markets">
    Find eligible markets and their leg position IDs.
  </Card>
</CardGroup>
