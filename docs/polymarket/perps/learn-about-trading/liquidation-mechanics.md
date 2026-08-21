> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Liquidation Mechanics

> Detection, execution, insurance-fund backstop, and auto-deleveraging

When a trader's equity drops below maintenance margin, the system closes the
position before it becomes insolvent. Normal liquidations route through the order
book as reduce-only immediate-or-cancel orders. If the breach is severe, the
position is absorbed directly by the insurance fund — or, when the fund cannot
safely take it on, closed against opposite-side traders through
auto-deleveraging.

## Trigger

An account or isolated position is at risk when:

```text theme={null}
MarginRatio = Equity / MaintenanceMargin
```

Liquidation starts when `MarginRatio < 1.0`, which means `Equity < MM`.

Cross and isolated positions are checked independently:

* Cross uses the account's cross equity and combined cross maintenance margin.
* Isolated evaluates each isolated position using its own equity and maintenance margin.

Margin health is re-evaluated continuously, so the system reacts as soon as a new
Mark Price, fill, or deposit moves the account across the threshold.

## While Liquidating

When liquidation starts, the affected scope is flagged:

* Cross liquidation blocks new orders on every market for the account.
* Isolated liquidation blocks new orders only on the affected market.

Order submissions from the account are rejected while the flag is set. The
system also cancels the account's resting orders inside the same scope before
it places the first liquidation order: cross liquidation cancels resting
orders on every cross-margined market but leaves isolated markets untouched,
while isolated liquidation cancels only the orders on the affected market.

These cancels race in-flight executions, so a resting order can still fill in
the moment between the flag being set and its cancel applying. Any maker or
taker fill on an instrument in the account's active liquidation scope reports
`liquidation: true` in the account's fill history and `liq: true` on the
WebSocket `fills` channel.

## Execution

The system closes flagged positions with reduce-only immediate-or-cancel orders.
These orders execute immediately against available liquidity and cancel any
unfilled quantity. Margin health is re-evaluated between orders, so partial fills
that restore the account naturally stop the process.

### Target Selection

Cross liquidation closes one position at a time. After each fill settles, the
system re-evaluates and picks again from the remaining cross positions, so a
trader with multiple cross positions is unwound across several cycles rather than
all at once.

Isolated liquidation closes the flagged position in full.

### Order Shape

Liquidation orders are IOC, reduce-only, and market-priced. They sweep whatever
liquidity is resting on the book at the moment they land. There is no protective
spread off Mark.

## Recovery

When a liquidating account's equity recovers to or above its recovery initial
margin, the flag clears and normal order submission resumes.

If a position is fully closed during liquidation, the flag is also cleared because
the market no longer has a position to liquidate.

## Insurance-Fund Backstop

If equity falls far enough below maintenance margin that order-book liquidation is
unlikely to recover value, the system skips the order book and absorbs the
position into the insurance fund.

* Cross backstop absorbs all of the trader's cross positions plus their quote-asset balance into the insurance-fund account.
* Isolated backstop absorbs the specific isolated position and its allocated isolated margin.

Once absorbed, the insurance fund holds the position and manages it like any other
account.

The backstop only fires when the fund can take the position on and remain
healthy itself — its equity after absorbing must stay at or above its own
maintenance margin. When it cannot, the system auto-deleverages instead.

## Auto-Deleveraging

If a breach is severe enough for the backstop but the insurance fund cannot
safely absorb the position, the system force-closes it directly against traders
holding the opposite side. This is auto-deleveraging (ADL): no order-book
matching, no draw on the insurance fund.

An isolated liquidation deleverages the affected market only. A cross
liquidation deleverages every open cross position the account holds.

### Counterparty Selection

For each affected market, opposite-side positions are ranked by:

```text theme={null}
AdlIndex = ProfitRatio * Notional / Equity
```

* `ProfitRatio` is `Mark / Entry` for longs and `Entry / Mark` for shorts.
* `Notional / Equity` is effective leverage: position notional at Mark over
  cross equity for a cross position, or over the position's own equity for an
  isolated position.

The most profitable, most leveraged counterparties rank first. The system works
down the queue, reducing each counterparty in turn, until the liquidated
position is fully closed. A counterparty position is only ever reduced — never
flipped to the other side or increased. Accounts that are themselves
liquidating, and the insurance fund, are never selected.

While a counterparty is being deleveraged, its new orders on that market are
rejected, exactly as during liquidation. The block clears automatically once
the deleveraging completes.

### Execution Price

* An isolated liquidation deleverages at the liquidated position's bankruptcy
  price — the price at which its isolated margin is exactly exhausted.
* A cross liquidation deleverages at the Mark Price frozen when the liquidation
  started, not the live mark.

Both legs settle at this price, and each side's realized PnL is credited to its
quote balance.

### What Counterparties See

* The fill arrives on the WebSocket `fills` channel and in trade history with
  `adl: true`. The `liq` flag marks only the leg whose own position is being
  liquidated, so it stays `false` on the counterparty leg.
* A `position_deleveraged` [notification](/perps/notifications) reports the
  market, side, size closed, execution price, and realized PnL.

## Fees

The liquidating account pays an extra liquidation fee on every fill while flagged,
on top of its normal maker or taker rate.

```text theme={null}
FillFee = Notional * (MakerOrTakerRate + LiquidationFeeRate)
```

Liquidation fee rates vary by market. If you're integrating Perps, read current
values from [Market Data](/perps/market-data#fetch-instruments).

Auto-deleveraging fills bypass the order book and carry no fee for either side.
