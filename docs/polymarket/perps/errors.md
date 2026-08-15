> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

> Error messages returned by the API and the conditions that trigger them

The API returns descriptive error messages when a request is rejected. Below are
the errors you may encounter when placing or cancelling orders.

## Order Placement Errors

| Error                                          | Condition                                          |
| ---------------------------------------------- | -------------------------------------------------- |
| `invalid signature`                            | EIP-712 signature verification or timestamp failed |
| `signature expired`                            | Signature older than 5 minutes                     |
| `account not found for proxy`                  | Signer proxy not linked to any account             |
| `no orders provided`                           | Empty order array                                  |
| `FOK orders cannot be post-only`               | FOK + `post_only=true`                             |
| `IOC orders cannot be post-only`               | IOC + `post_only=true`                             |
| `GTC orders require a price`                   | GTC without price                                  |
| `price cannot be zero`                         | Price = 0                                          |
| `client order id cannot be all zeros`          | Client order ID is all zeros                       |
| `price exceeds allowed decimal places`         | Too many decimal places in price                   |
| `price exceeds allowed significant figures`    | More than 5 significant figures in price           |
| `quantity must be positive`                    | Quantity is zero or negative                       |
| `quantity exceeds allowed decimal places`      | Too many decimal places in quantity                |
| `quantity exceeds allowed significant figures` | More than 5 significant figures in quantity        |
| `command expired`                              | `exp_ms` is in the past                            |
| `command expiry too far in future`             | `exp_ms` is more than 5 seconds from now           |

## Order Cancellation Errors

| Error                      | Condition                       |
| -------------------------- | ------------------------------- |
| `order_not_found`          | Order doesn't exist             |
| `order_not_pending_risk`   | Order is in the risk engine     |
| `order_not_pending_engine` | Order is in engine matching     |
| `order_not_in_orderbook`   | Order is not in the active book |

## Auto-Cancel Errors

Returned when arming the auto-cancel switch with `PATCH /v1/trade/auto-cancel`.
Disarming skips these checks and is always allowed. A deadline already in the
past is rejected earlier with a plain `400` message.

| Error                             | Condition                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `auto_cancel_deadline_too_soon`   | Deadline is less than 5 seconds in the future                                  |
| `auto_cancel_daily_limit_reached` | Account already triggered auto-cancel the maximum number of times this UTC day |
| `auto_cancel_in_flight`           | A previous trigger is still cancelling the account's open orders               |

`auto_cancel_in_flight` is transient. Arming succeeds once the engine finishes
the earlier cancellation.

## Isolated Margin Adjustment Errors

These stable identifiers are returned when an isolated margin adjustment is
rejected after sequencing.

Gateway signature validation can reject a stale or future-skewed timestamp
earlier as `invalid signature`; that request never reaches sequencing.

| Error                                | Condition                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `position_not_found`                 | The target open position does not exist                                     |
| `invalid_margin_mode`                | The target position is not using isolated margin                            |
| `invalid_margin_amount`              | The amount is zero, over-precise, or cannot be represented safely           |
| `insufficient_margin`                | An addition exceeds available, unreserved collateral                        |
| `account_liquidating`                | Cross liquidation is active, or the target isolated position is liquidating |
| `margin_below_required_initial`      | A removal would leave position equity below current required initial margin |
| `invalid_margin_signature_timestamp` | Sequencer found the timestamp over five minutes old or one minute ahead     |
| `signature_already_used`             | The exact signed margin request has already been ingested                   |
