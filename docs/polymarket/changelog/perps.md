<!--
Source: https://docs.polymarket.com/changelog/perps.md
Downloaded: 2026-08-21T20:25:29.694Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Perps Changelog

> Recent changes to the Polymarket Perps API and platform

Notable changes to the Polymarket Perps API.

<Update label="Aug 16, 2026" description="Current position fills endpoint added">
  Added `GET /v1/info/position-fills`, a public endpoint returning every fill
  in a registered account's current open position cycle for one instrument. A
  cycle begins when the position opens from flat or flips direction, and a
  multi-leg flip stays in one cycle. Pages of up to 100 fills are linked by an
  opaque `cursor` returned alongside the data; the cursor is validated against
  the live position on every page and returns `400` if the position changed
  mid-pagination. `GET /v1/account/fills` has returned the same opaque
  `cursor` field since Jul 24 — passing the last fill's trade ID as `cursor`
  still works there.
</Update>

<Update label="Aug 14, 2026" description="Equity and PnL history honour the requested interval">
  `GET /v1/account/equity` and `GET /v1/account/pnl` now bucket the returned
  series by the `interval` query parameter. Previously the parameter was
  validated but ignored: every accepted value returned the same
  fixed-granularity series (per minute for equity, per hour for PnL), and long
  windows were truncated at 1000 rows instead of aggregated. Each equity point
  is now the last sample in its interval bucket; each PnL point is the PnL
  realized inside its bucket — not a running total — and empty buckets are
  omitted. Buckets are aligned to the Unix epoch, points keep real sample
  timestamps, and the 1000-entry cap now counts buckets, so a coarser interval
  covers a longer window before `more` is set. Responses for the finest
  intervals (`1m` equity, `1h` PnL) are unchanged.
</Update>

<Update label="Aug 13, 2026" description="Deposit and withdrawal history amounts are always decimal token units">
  `GET /v1/account/deposits` and `GET /v1/account/withdrawals` now serialize
  every `amount` (and withdrawal `fee`) in decimal token units, e.g. `"10"` for
  10 pUSD. Previously, deposit rows in `pending` or `removed` status reported
  raw on-chain base units (`"10000000"` for the same 10 pUSD), and pending
  withdrawal rows could serve base-unit amounts and fees as well, so rows for
  the same transfer disagreed on units across statuses. Clients that divided
  pending amounts by `10^decimals` to compensate must drop that conversion.
  Confirmed rows and the WebSocket `deposits` and `withdrawals` channels are
  unchanged — they were already decimal. Signed operation inputs (`POST
      /v1/account/withdraw`) still take base-unit amounts matching the EIP-712
  signature.
</Update>

<Update label="Aug 11, 2026" description="Fill history flags maker fills executed under liquidation">
  `GET /v1/account/fills` and account trade history previously reported
  `liquidation: false` on every maker fill, even when the maker's own account
  was under liquidation on the instrument — while the WebSocket `fills` channel
  already reported `liq: true` for the same fill. The two surfaces now agree:
  any maker or taker fill on an instrument in the account's active liquidation
  scope reports `liquidation: true`. Rows written before the change are
  unaffected. Such maker legs are also excluded from leaderboard win counts.
</Update>

<Update label="Aug 10, 2026" description="Fills gain an adl flag; liq no longer set on ADL counterparty legs">
  Fill entries now carry a required boolean `adl` field on both the WebSocket
  `fills` channel and `GET /v1/account/fills`, set on both legs of an
  auto-deleveraging match. Behavior change: the counterparty leg of an ADL match
  previously reported `liq: true` on the WebSocket `fills` channel; it now
  reports `liq: false`. `liq` marks only the leg whose own position is being
  liquidated. Clients that detect forced closes via `liq` alone will no longer
  see ADL counterparty fills — check `adl` as well.
</Update>

<Update label="Aug 8, 2026" description="Position deleveraged notification added">
  Added the <code>position\_deleveraged</code> notification, sent to the
  counterparty of an auto-deleveraging match when its profitable position is
  closed or reduced to settle a liquidation on the other side. Delivered on the
  WebSocket <code>notifications</code> channel and in the notifications history.
</Update>

<Update label="Aug 7, 2026" description="Exchange info reports engine version and cancel-only state">
  `GET /v1/info/exchange` now includes `engine_version`, the engine release
  version of the build serving the response. The response also documents
  `cancel_only`, which reports whether the exchange is in cancel-only
  (maintenance) mode; the flag has been returned since maintenance mode shipped
  on Jul 15.
</Update>

<Update label="Aug 6, 2026" description="Portfolio margin summary includes available order margin">
  The portfolio response and <code>portfolio</code> WebSocket channel now
  include <code>margin.available\_order\_margin</code>: the collateral available
  for additional order initial margin after existing exposure, open orders,
  orders and isolated-margin additions awaiting risk processing, and pending
  withdrawals or transfers.
</Update>

<Update label="Jul 6, 2026" description="Cancel all orders added">
  Added <code>DELETE /v1/trade/orders/all</code> to cancel all open orders in
  one request, optionally scoped to a single instrument. Available in the SDKs
  as <code>cancelAllOrders</code> (TypeScript) and{" "}
  <code>cancel\_all\_orders</code> (Python).
</Update>

<Update label="Jun 11, 2026" description="Cancel responses include order IDs">
  Cancel responses now include `oid` and `coid` fields.
</Update>

<Update label="Jun 10, 2026" description="Taker delay added for immediately matching orders">
  Added a 20ms taker delay for orders that immediately match on entry.
</Update>

<Update label="Jun 9, 2026" description="Reduce-only orders added">
  Added the reduce-only field to order submission and order updates.
</Update>

<Update label="Jun 8, 2026" description="Auto-cancel and rate-limit updates">
  <ul>
    <li>
      Added <code>PATCH /v1/trade/auto-cancel</code> to arm or clear a dead
      man's switch that cancels all open orders at a specified time.
    </li>

    <li>
      Added <code>GET /v1/account/auto-cancel</code> to check the current
      auto-cancel status, trigger count, and daily reset time.
    </li>

    <li>Auto-cancel is limited to 1000 triggers per UTC day per account.</li>

    <li>
      Added <code>updateLeverage</code> and <code>autoCancel</code> WebSocket
      post messages.
    </li>

    <li>
      <code>portfolio</code> and <code>balances</code> WebSocket channels no
      longer push updates on every order or fill, only periodically.
    </li>

    <li>
      Rate limit error messages now distinguish between{" "}
      <code>ip\_rate\_limited</code>, <code>action\_rate\_limited</code>, and{" "}
      <code>message\_rate\_limited</code>.
    </li>
  </ul>
</Update>
