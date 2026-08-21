> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK Changelog

> Recent changes to the official SDKs.

<Tabs>
  <Tab title="TypeScript">
    ### `0.6.0`

    * Added requester-side Combos RFQ support through `client.requestComboQuote(...)`, `client.acceptComboQuote(...)`, and `client.waitForComboFill(...)`. You can also call `fetchRfqStatus` from `@polymarket/client/actions`. Authenticate requests with `builderApiKey(...)` or `remoteBuilderSigning(...)`. Winning quotes can be stored as JSON, and SELL quotes include the exact post-fee `netReceive`. No-quote, decline, and expiry outcomes return values. Gateway rejections throw `RfqRequestRejectedError`.
    * Market outcomes now include a nullable PolyV2 `positionId` alongside the CLOB `tokenId`. New code should use the protocol-neutral `ConditionId`, `ConditionIdSchema`, `OptionalConditionIdSchema`, and `toConditionId`. The CTF-named aliases and market-level `positionIds` array remain available for compatibility but are deprecated.
    * Breaking change: `client.fetchLastTradePrice(...)` now returns `LastTradePrice | null`. It returns `null` when the token has not traded. `client.fetchLastTradePrices(...)` leaves untraded tokens out of the response, so match results by `tokenId` instead of array position.

    ```diff theme={null}
    -const price = (await client.fetchLastTradePrice({ tokenId })).price;
    +const lastTrade = await client.fetchLastTradePrice({ tokenId });
    +const price = lastTrade?.price ?? null;
    ```

    ### `0.5.0`

    * Added a Perps dead man's switch: `session.armAutoCancel()` schedules a one-shot cancel-all, `session.disarmAutoCancel()` clears it, and `session.fetchAutoCancelStatus()` reports the current deadline and daily trigger usage. Arming after the daily limit raises `AutoCancelDailyLimitError`.
    * Perps funding history and realtime funding events now include a required `id`, typed as `PerpsFundingPaymentId`.
    * Fixed `session.placeOrder()` missing private order updates that arrive before the command acknowledgement. When the caller omits a client order ID, the SDK now generates one before submitting the order.

    ### `0.4.0`

    * Added `PerpsSession.updateMargin`, which adjusts isolated margin for an instrument position. Positive `amount` values add margin; negative values remove it.
    * Repeated order preparation now caches market configuration and platform and builder fees. If cached tick data rejects a limit or protected market price, the SDK fetches current metadata once before returning the input error.
    * Unprotected market orders now derive depth, price, tick size, and exchange selection from one live order book response. `maxSpend` remains an estimated all-in spend target based on recently resolved fees, not a hard cap.
    * `AcceptedOrderResponse.orderId` is now typed as `OrderId`.
    * Breaking TypeScript type change: `OrderBook.tickSize` is now a numeric `TickSizeValue` instead of a `DecimalString`.

    ```diff theme={null}
    -const isOneCentTick = orderBook.tickSize === "0.01";
    +const isOneCentTick = orderBook.tickSize === 0.01;
    ```

    ### `0.3.0`

    * Added typed 30-second and 60-second Chainlink TWAP realtime subscriptions. `subscribe` validates subscription input when called: an unsupported TWAP window throws `UserInputError` before the connection opens.
    * Added Perps account notifications: `session.listNotifications()`, `session.fetchUnreadNotificationsCount()`, `session.markNotificationsRead()`, and a `notifications` session WebSocket channel with typed `notification` events.
    * Perps fills pagination now uses the API-native cursor and adds a `sort` direction option (newest first by default). Previously issued SDK-encoded fills cursors no longer work.
    * Added the `DEPOSIT`, `WITHDRAWAL`, and `TAKER_REBATE` activity types. `listActivity` now returns all activity types by default, including deposits and withdrawals.
    * `RequestRejectedError` and `RateLimitError` now expose `retryAfter` from the `Retry-After` response header.
    * Fixes:
      * Open order `createdAt` and `expiresAt` now parse epoch-seconds wire timestamps correctly instead of treating them as milliseconds.
      * RFQ quote rejections now carry the granular Combos quote-validation error codes instead of a generic validation failure.
      * Deposit Wallet gasless and Collateral Return submits now self-heal nonce mismatches: when the relayer rejects a batch and reports the on-chain nonce, the SDK re-signs the batch with that nonce and resubmits it once.
      * Cursor-paginated reads no longer report the per-page item count as `Page.totalCount`. Use `page.items.length` instead.

    ### `0.2.0`

    * Added `client.waitForOrderFillSettlement(order)`, which waits until every fill in an order response reaches a terminal settlement outcome and returns the settlement transaction hashes. Matched order responses are no longer guaranteed to include `transactionsHashes`; use this method to obtain hashes reliably.
    * `ClobTrade.status` is now typed with the shared `TradeStatus` enum instead of a plain string.
    * Added Collateral Return support: `planCollateralReturn` returns an inspectable plan and `executeCollateralReturnPlan` signs and submits it for Deposit Wallet, Safe, and Proxy accounts, returning a transaction handle.
    * Added `isolatedOnly` to `PerpsInstrument`, indicating whether the instrument supports only isolated margin.
    * Added volume-based fee tiers to the Perps fee schedule: each `PerpsFeeScheduleEntry` carries a `tiers` array of `PerpsFeeTier` values, including negative maker rebate rates.
    * Perps withdrawal statuses are now forward-compatible: known statuses are enumerated in `PerpsKnownWithdrawalStatus`, which adds `failed`, and statuses introduced after a release flow through as plain strings instead of failing the response parse.
    * Deprecated the `PerpsWithdrawalStatus` value alias; migrate enum member access:

    ```diff theme={null}
    -if (withdrawal.status === PerpsWithdrawalStatus.Confirmed) {
    +if (withdrawal.status === PerpsKnownWithdrawalStatus.Confirmed) {
    ```

    * Fixed offset-paginated list methods silently stopping after the first page when `pageSize` reached the server's limit cap. `pageSize` is now validated per endpoint and values above the cap are rejected with `UserInputError`. A full page reports `hasMore: true`; when a collection ends exactly on a page boundary, the final page is empty.
    * Limit and protected market order prices must be a multiple of the market tick size. Off-grid prices (for example `0.007` on a `0.005` tick market) are now rejected client-side instead of by the exchange after signing.

    ### `0.1.0`

    * Graduated the SDK to the stable 0.x release line, marked Perps APIs as experimental, and removed deprecated compatibility APIs.
    * Added Perps support for reduce-only orders, account stats, cancel-all, TP/SL metadata and placement, batched fill and trade frames, and stricter order request validation.
    * Added `conditionId` aliases to CLOB order book, open order, trade, and builder trade models while keeping `market` available as a deprecated alias.
    * Typed CLOB cancellation results with branded `OrderId` values for `canceled` and `notCanceled` keys.

    ### `0.1.0-beta.18`

    * `setupTradingApprovals` and `prepareTradingApprovals` no longer request approvals for the retired CLOB v1 Neg Risk Adapter.
    * Streams drop unknown or unreadable WebSocket frames instead of closing the connection. RFQ quoter sessions no longer fail with `TransportError` on an unrecognized frame; a caller waiting on an unreadable acknowledgement fails through its acknowledgement timeout instead.
    * Removed `RfqKnownInboundMessageSchema` from `@polymarket/bindings`; each RFQ inbound message schema declares its own object shape directly.

    ### `0.1.0-beta.17`

    * RFQ quoter sessions now keep running when the server introduces new error codes. `RfqErrorCode` is an open type: known codes are enumerated in `RfqKnownErrorCode`, and unrecognized codes flow through rejection errors as plain strings.
    * Deprecated the `RfqErrorCode` value alias; migrate enum member access:

    ```diff theme={null}
    -if (error.code === RfqErrorCode.RateLimited) {
    +if (error.code === RfqKnownErrorCode.RateLimited) {
    ```

    * Added `ConnectionLostError` carrying the WebSocket close `code` and `reason`. Losing an RFQ session connection now rejects in-flight operations and fails the session iterator with it, instead of ending the event loop silently. Closing the session still ends iteration cleanly.
    * Streamed market and user events normalize empty-string optional decimal fields (for example a trade's `feeRateBps` or a price change's `bestBid` and `bestAsk`) to `null`.
    * Batch price reads (`fetchPrices`, `fetchMidpoints`, `fetchSpreads`) return `TokenId`-keyed records of branded decimal strings.
    * Perps sessions handle fills and trades frames that batch multiple entries.

    ### `0.1.0-beta.16`

    * Added `RESOLVED_PARTIAL` to `ComboPositionStatus` so Combo positions that resolve at a fractional payout (for example a voided leg) parse correctly instead of failing validation.

    ### `0.1.0-beta.15`

    * Combo activity now parses the canonical `type` field returned by the Data API, instead of deriving lifecycle actions from legacy fields.

    ### `0.1.0-beta.14`

    * Added SDK pagination for Combo lifecycle activity and server-cursor pagination for Combo positions.
    * Added Combo position sync request fields and exposed `outcome` and `redeemable` on Combo positions.
    * Branded Combo activity row IDs.
    * Breaking beta change: Combo activity and position fields now use `wallet`, `amount`, and `payout`; Combo activity rows no longer expose `moduleKind`.

    ```diff theme={null}
    -activity.userAddress
    -activity.amountUsdc
    -redeemActivity.payoutUsdc
    -position.userAddress
    +activity.wallet
    +activity.amount
    +redeemActivity.payout
    +position.wallet
    ```

    ### `0.1.0-beta.13`

    * Added `listMarketClarifications` for reading market clarification text with SDK-owned pagination and market, event, state, question, and transaction filters.
    * Fixed legacy Proxy wallet gasless execution and added live Safe and Proxy wallet coverage.
    * Resolve closed markets when preparing market position redemptions.
    * Gasless transaction handles now wait for relayer transactions to reach confirmed state before resolving.

    ### `0.1.0-beta.12`

    * Require GTD limit order expirations to be at least 3 minutes in the future.

    ### `0.1.0-beta.11`

    * Support CLOB order tick sizes `0.005` and `0.0025`.
    * Pagination request cursors now infer the branded pagination cursor type.

    ### `0.1.0-beta.10`

    * Preserve already-deployed legacy UUPS Deposit Wallets when `createSecureClient` resolves the default wallet, while new Deposit Wallet deployments use the beacon factory path.

    ### `0.1.0-beta.9`

    * Added `PriceHistoryInterval` and `SearchSort` exports, preserved `groupItemTitle` on normalized markets, and published `expectPrivateKey` from `@polymarket/types`.

    ### `0.1.0-beta.8`

    * RFQ quoter sessions now emit typed `trade` events for confirmed Combos fills.
    * RFQ rejection errors now expose `errorId` values and parse `INVALID_SIGNATURE` and `INTERNAL_ERROR` codes.

    ### `0.1.0-beta.7`

    * Added `parentEventId` to `Event` so child events can link back to their parent event.
    * Added `maxPrice` and `minPrice` protection fields to market order requests.
    * Handle legacy multi-outcome markets more safely: `listMarkets` skips markets that cannot be represented by the binary market model, and `fetchMarket` returns a typed SDK error for unsupported markets.
    * Normalize empty-string order and activity fields to SDK values: decimal amounts become `"0"`, missing maker order fee rates become `null`, and missing trade or position market icons become `null`.
    * Parse Combo trade activity rows with an `isCombo` discriminated union.
    * Support new Combos RFQ websocket error codes for balance, allowance, and pre-execution reservation failures.
    * Broad user websocket subscriptions now omit market filters so all-market streams receive trade events.
    * Retry rejected JSON-RPC `eth_call` batches by splitting them into smaller batches.

    ### `0.1.0-beta.6`

    * Point Combos RFQ endpoints at the production domains: `combos-rfq-api.polymarket.com` (REST) and `combos-rfq-gateway-quoter.polymarket.com` (quoter WebSocket).

    ### `0.1.0-beta.5`

    * Added `listComboMarkets` for fetching the Combo market catalog with typed bindings and SDK-owned pagination. See [Combos](/trading/combos/overview).
    * Parse RFQ quote rejections that use the `SUBMISSION_WINDOW_CLOSED` gateway error code.

    ### `0.1.0-beta.4`

    * Added Combos support for multi-leg RFQ positions. See [Combos](/trading/combos/overview).
    * Reject whitespace-only search queries and trim leading or trailing search input.
    * `ConditionId` is now deprecated in favor of `CtfConditionId`; existing
      `ConditionId` exports remain available as deprecated aliases.

    ### `0.1.0-beta.3`

    **Secure client setup now defaults to the Deposit Wallet flow**

    `createSecureClient` can now derive and use the signer's deterministic Deposit
    Wallet when you omit `wallet`. If you already know which Polymarket wallet you
    want to use, keep passing `wallet`.

    ```diff theme={null}
    const secureClient = await createSecureClient({
    -  wallet: "YOUR_POLYMARKET_WALLET_ADDRESS",
       signer,
    });
    ```

    If you want to keep account selection explicit, no change is required:

    ```ts theme={null}
    const secureClient = await createSecureClient({
      wallet: "YOUR_POLYMARKET_WALLET_ADDRESS",
      signer,
    });
    ```

    **`setupTradingApprovals()` now waits internally**

    You no longer need to wait on the returned handle. Call the method once before
    trading; it is safe to call again if approvals are already set.

    ```diff theme={null}
    -const handle = await secureClient.setupTradingApprovals();
    -await handle.wait();
    +await secureClient.setupTradingApprovals();
    ```

    **Gasless setup helpers are deprecated**

    You no longer need to call `isGaslessReady()` or `setupGaslessWallet()` in the
    normal setup path. Create the secure client, then set up trading approvals.

    ```diff theme={null}
    -const ready = await secureClient.isGaslessReady();
    -
    -if (!ready) {
    -  secureClient = await secureClient.setupGaslessWallet();
    -}
    -
     await secureClient.setupTradingApprovals();
    ```

    ### `0.1.0-beta.2`

    First beta release of the unified TypeScript SDK. Install the beta package with
    your package manager:

    ```bash theme={null}
    pnpm add @polymarket/client@beta
    ```
  </Tab>

  <Tab title="Python">
    ### `0.6.0`

    * Added requester-side Combos RFQ support to `SecureClient` and `AsyncSecureClient` through `request_combo_quote(...)`, `accept_combo_quote(...)`, `wait_for_combo_fill(...)`, and `fetch_rfq_status(...)`. Pass a Builder API key through `api_key=`. `ComboQuote` values can be serialized, and SELL quotes include the exact post-fee `net_receive`. No-quote, decline, expiry, and terminal failure outcomes return values. Gateway rejections raise `RfqRequestRejectedError`.
    * Breaking change: `get_last_trade_price(...)` now returns `LastTradePrice | None`. Untraded tokens return `None` instead of a `Decimal("0.5")` placeholder. `get_last_trade_prices(...)` leaves untraded tokens out of the response, so match results by `token_id` instead of array position.

    ```diff theme={null}
    -price = client.get_last_trade_price(token_id=token_id).price
    +last_trade = client.get_last_trade_price(token_id=token_id)
    +price = last_trade.price if last_trade is not None else None
    ```

    ### `0.5.0`

    * Added a Perps dead man's switch: `session.arm_auto_cancel()` schedules a one-shot cancel-all, `session.disarm_auto_cancel()` clears it, and `session.fetch_auto_cancel_status()` reports the current deadline and daily trigger usage. Arming after the daily limit raises `AutoCancelDailyLimitError`.
    * Perps funding history and realtime funding events now include a required `id`, typed as `PerpsFundingPaymentId`.
    * Fixed `session.place_order()` missing private order updates that arrive before the command acknowledgement. When the caller omits a client order ID, the SDK now generates one before submitting the order.
    * Order placement now caches market configuration and platform and builder fees, reducing repeated metadata reads while refreshing stale tick data before returning an input error.

    ### `0.4.0`

    * Added async `PerpsSession.update_margin`, which adjusts isolated margin for an instrument position. Positive `amount` values add margin; negative values remove it.
    * `AcceptedOrder.order_id` is now typed as `OrderId`.

    ### `0.3.0`

    * Added typed 30-second and 60-second Chainlink TWAP realtime subscriptions.
    * Added Perps account notifications: `session.list_notifications()` with the account's `unread` count on each page, `session.mark_notifications_read()`, and a `notifications` session WebSocket channel with typed `notification` events.
    * Perps fills pagination now uses the API-native cursor, and `list_fills` accepts a `sort` direction (newest first by default).
    * Added the `DEPOSIT`, `WITHDRAWAL`, and `TAKER_REBATE` activity types. `list_activity` now returns all activity types by default, including deposits and withdrawals.
    * `RequestRejectedError` now exposes `retry_after` from the `Retry-After` response header or a `retry_after_seconds` response field.
    * Fixes:
      * RFQ quote rejections now carry the granular Combos quote-validation error codes instead of a generic validation failure.
      * Deposit Wallet gasless and Collateral Return submits now self-heal nonce mismatches: when the relayer rejects a batch and reports the on-chain nonce, the SDK re-signs the batch with that nonce and resubmits it once.
      * Collateral Return operation `event_id` values are now typed as `EventId`.

    ### `0.2.0`

    * Added `wait_for_order_fill_settlement`, which waits until every fill in an order response reaches a terminal settlement outcome and returns the settlement transaction hashes.
    * Added Collateral Return support to secure clients: `plan_collateral_return` returns an inspectable plan and `execute_collateral_return_plan` signs and submits it for Deposit Wallet, Safe, and Proxy accounts, returning a transaction handle.
    * Added `isolated_only` to Perps instruments, indicating whether the instrument supports only isolated margin.
    * Added volume-based fee tiers to the Perps fee schedule, including negative maker rebate rates, typed with `PerpsFeeTier`.
    * Perps withdrawal statuses are now forward-compatible: known statuses are enumerated in `PerpsKnownWithdrawalStatus`, which adds `failed`, and statuses introduced after a release flow through as plain strings instead of failing the response parse. `list_withdrawals` accepts `withdrawal_status="failed"`.
    * Fixed offset-paginated reads silently stopping after the first page when `page_size` reached the server's limit cap. `page_size` is now validated per endpoint and values above the cap raise `UserInputError`. A full page reports `has_more=True`; when a collection ends exactly on a page boundary, the final page is empty.
    * CLOB cursor-paginated reads no longer report the per-page row count as `Page.total_count`; it was never the total across pages. Use the page items instead:

    ```diff theme={null}
    -count = page.total_count
    +count = len(page.items)
    ```

    * Open orders with no expiration now parse `expires_at` as `None`. GTC orders report a zero expiration, which previously parsed as the Unix epoch.

    ### `0.1.0`

    * Graduated the SDK to the stable 0.x release line, marked Perps APIs as experimental, and removed deprecated beta compatibility APIs.
    * Added `condition_id` aliases to CLOB models while keeping `market` available as a deprecated alias.
    * Typed CLOB cancellation result IDs with `OrderId`.
    * Streams drop unknown or unreadable WebSocket frames instead of closing the connection.
    * Limit and market order helpers reject prices that are not a multiple of the market tick size.

    ### `0.1.0b21`

    * `setup_trading_approvals` no longer requests approvals for the retired CLOB v1 Neg Risk Adapter.

    ### `0.1.0b20`

    * RFQ quoter sessions now keep running when the server introduces new error codes: unrecognized codes are carried on rejection errors as plain strings, while known codes stay typed through the `RfqErrorCode` enum.
    * Added `ConnectionLostError` carrying the WebSocket close `code` and `reason`. Losing an RFQ session connection now raises it from in-flight operations and the session iterator, instead of a generic `TransportError`. Closing the session still ends iteration cleanly.
    * Optional decimal fields on streamed market and user events treat empty strings as absent (for example a trade's `fee_rate_bps` or a price change's `best_bid` and `best_ask`).
    * Batch price reads return `TokenId`-keyed maps.
    * Perps streams handle fill and trade frames that batch multiple entries.

    ### `0.1.0b19`

    * Added `RESOLVED_PARTIAL` to `ComboPositionStatus` so Combo positions that resolve at a fractional payout (for example a voided leg) parse correctly instead of failing validation.

    ### `0.1.0b18`

    * Combo activity now parses the canonical `type` field returned by the Data API, instead of deriving lifecycle actions from legacy fields.

    ### `0.1.0b17`

    * Added SDK pagination for Combo lifecycle activity and server-cursor pagination for Combo positions.
    * Added typed overloads for market, event, and tag lookups, mutually-exclusive lookup arguments, and `redeem_positions`.
    * Added trade time filters.
    * Hardened Combo pagination filters and branded Combo activity IDs.
    * Breaking beta change: Combo activity and position fields now use `wallet`, `amount`, and `payout`; Combo activity rows no longer expose `module_kind`.

    ```diff theme={null}
    -activity.user_address
    -activity.amount_usdc
    -redeem_activity.payout_usdc
    -position.user_address
    +activity.wallet
    +activity.amount
    +redeem_activity.payout
    +position.wallet
    ```

    ### `0.1.0b16`

    * Fixed Deposit Wallet trading setup approvals to use the current Protocol V2 auto-redeem operator.

    ### `0.1.0b15`

    * Added support for Perps.

    ### `0.1.0b14`

    * Added builder API key management for creating, fetching, and revoking builder API keys.
    * Added support for merging multiple positions in one request.
    * Added runnable Python SDK examples for common integration workflows.
    * Resolve closed markets when redeeming positions.
    * Gasless transaction handles now wait for relayer transactions to reach confirmed state before resolving.

    ### `0.1.0b13`

    * Require GTD limit order expirations to be at least 3 minutes in the future.

    ### `0.1.0b12`

    * Support CLOB order tick sizes `0.005` and `0.0025`.

    ### `0.1.0b11`

    * Preserve already-deployed legacy UUPS Deposit Wallets when secure clients resolve the default wallet, while new Deposit Wallet deployments use the beacon factory path.
    * Retry rejected JSON-RPC batches by splitting them into smaller batches.
    * Added typed Gamma search sort fields for search requests.

    ### `0.1.0b10`

    * Preserve `group_item_title` on market responses so grouped market titles remain available after normalization.

    ### `0.1.0b9`

    * RFQ quoter sessions now emit typed `RfqTradeEvent` events for confirmed Combos fills.
    * RFQ rejection errors now expose `error_id` values and parse `INVALID_SIGNATURE` and `INTERNAL_ERROR` codes.

    ### `0.1.0b8`

    * Added `parent_event_id` to `Event` so child events can link back to their parent event.
    * Added `max_price` and `min_price` protection fields to market order requests.
    * Handle legacy multi-outcome market listings more safely by omitting markets that cannot be represented by the binary market model.
    * Normalize empty-string trade and position market icons to `None`.
    * Parse Combo trade activity rows correctly.
    * Support new Combos RFQ error codes for balance, allowance, and pre-execution reservation failures.
    * Broad user websocket subscriptions now omit market filters so all-market streams receive trade events.

    ### `0.1.0b7`

    * Point Combos RFQ endpoints at the production domains: `combos-rfq-api.polymarket.com` (REST) and `combos-rfq-gateway-quoter.polymarket.com` (quoter WebSocket).

    ### `0.1.0b6`

    * Added `list_combo_markets` for fetching the Combo market catalog with SDK pagination. See [Combos](/trading/combos/overview).
    * Parse RFQ quote rejections that use the `SUBMISSION_WINDOW_CLOSED` gateway error code.

    ### `0.1.0b5`

    * Added Combos support for multi-leg RFQ positions. See [Combos](/trading/combos/overview).
    * Added notebook-friendly model display for Jupyter workflows.
    * `ConditionId` is now deprecated in favor of `CtfConditionId`; existing
      `ConditionId` exports remain available as deprecated aliases.

    ### `0.1.0b4`

    * Added dataframe conversion support for SDK models and response collections.

    **Secure client setup now defaults to the Deposit Wallet flow**

    `AsyncSecureClient.create` can now derive and use the signer's deterministic
    Deposit Wallet when you omit `wallet`. If you already know which Polymarket
    wallet you want to use, keep passing `wallet`.

    ```diff theme={null}
    secure_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
    -    wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    If you want to keep account selection explicit, no change is required:

    ```python theme={null}
    secure_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    **`setup_trading_approvals()` now waits internally**

    You no longer need to wait on the returned handle. Call the method once before
    trading; it is safe to call again if approvals are already set.

    ```diff theme={null}
    -handle = await secure_client.setup_trading_approvals()
    -await handle.wait()
    +await secure_client.setup_trading_approvals()
    ```

    **Gasless setup helpers are deprecated**

    You no longer need to call `is_gasless_ready()` or `setup_gasless_wallet()` in
    the normal setup path. Create the secure client, then set up trading approvals.

    ```diff theme={null}
    -ready = await secure_client.is_gasless_ready()
    -
    -if not ready:
    -    secure_client = await secure_client.setup_gasless_wallet()
    -
     await secure_client.setup_trading_approvals()
    ```

    ### `0.1.0b1`

    First beta release of the unified Python SDK. Install the beta package with your
    package manager:

    ```bash theme={null}
    uv add polymarket-client
    ```
  </Tab>
</Tabs>
