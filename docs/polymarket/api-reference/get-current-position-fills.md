<!--
Source: https://docs.polymarket.com/api-reference/get-current-position-fills.md
Downloaded: 2026-08-21T20:25:29.684Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Current Position Fills

> Get every fill in a registered account's current open position cycle for
one instrument. A cycle begins when the position opens from flat or flips
direction. For a flip, every fill from the flipping engine event belongs
to the new cycle so a fill is never split between cycles.

Returns an empty page when the account has no open position for the
instrument. Maximum of 100 entries returned per request. Results are
ordered by time; use `sort` to choose newest-first (`desc`, default) or
oldest-first (`asc`). To page through more than 100 fills, pass the opaque
`cursor` returned by the previous page and keep `sort` unchanged. Each page
verifies that the cursor still describes the account's current position
cycle. If that position changes while pagination is in progress, the
cursor returns `400` and pagination must restart from the first page.

Cycle discovery for a position inherited from a gateway snapshot is
limited to 250,000 account-history rows. A cycle older than that bound
returns `413` rather than allowing a public request to run an unbounded
ClickHouse scan. Positions opened or flipped after gateway startup carry
their cycle boundary directly and do not use this discovery scan.


<Badge color="gray" size="md">Request Weight: **10**</Badge>

<br />

<Badge color="gray" size="md">Cached 2s — a request served from cache costs **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/position-fills
openapi: 3.0.3
info:
  title: Polymarket Perps HTTP API
  version: 1.0.0
  description: HTTP API for Polymarket perpetual trading system.
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.perpetuals.polymarket.com
    description: Production Perps HTTP API
security: []
paths:
  /v1/info/position-fills:
    get:
      summary: Get Current Position Fills
      description: >
        Get every fill in a registered account's current open position cycle for

        one instrument. A cycle begins when the position opens from flat or
        flips

        direction. For a flip, every fill from the flipping engine event belongs

        to the new cycle so a fill is never split between cycles.


        Returns an empty page when the account has no open position for the

        instrument. Maximum of 100 entries returned per request. Results are

        ordered by time; use `sort` to choose newest-first (`desc`, default) or

        oldest-first (`asc`). To page through more than 100 fills, pass the
        opaque

        `cursor` returned by the previous page and keep `sort` unchanged. Each
        page

        verifies that the cursor still describes the account's current position

        cycle. If that position changes while pagination is in progress, the

        cursor returns `400` and pagination must restart from the first page.


        Cycle discovery for a position inherited from a gateway snapshot is

        limited to 250,000 account-history rows. A cycle older than that bound

        returns `413` rather than allowing a public request to run an unbounded

        ClickHouse scan. Positions opened or flipped after gateway startup carry

        their cycle boundary directly and do not use this discovery scan.
      operationId: getPublicPositionFills
      parameters:
        - name: address
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/address'
        - name: instrument_id
          in: query
          required: true
          schema:
            type: integer
            format: int64
            minimum: 0
            maximum: 4294967295
            description: Instrument ID
        - name: cursor
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/fills_cursor'
        - name: sort
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/sort'
      responses:
        '200':
          description: Current position fills response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AccountTrades'
        '400':
          $ref: '#/components/responses/Error400Response'
        '408':
          $ref: '#/components/responses/Error408Response'
        '413':
          $ref: '#/components/responses/Error413Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    address:
      type: string
      description: Address
      example: '0x1234567890abcdef1234567890abcdef12345678'
    fills_cursor:
      type: string
      description: >-
        Opaque keyset pagination cursor for the next page of fills. Present
        while `more` is true; pass it as `cursor` on the next request, keeping
        the other parameters the same across pages.
      example: eyJ0cyI6MTc2NzIyNTYwMDAwMDAwMDAwMCwiaWQiOjF9
    sort:
      type: string
      description: >-
        Time sort direction. `desc` (default) returns newest fills first; `asc`
        returns oldest first.
      default: desc
      enum:
        - desc
        - asc
    AccountTrades:
      type: object
      required:
        - data
        - more
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/AccountTradeData'
          description: Account's trade history
        more:
          $ref: '#/components/schemas/more'
        cursor:
          $ref: '#/components/schemas/fills_cursor'
    AccountTradeData:
      type: object
      required:
        - trade_id
        - order_id
        - instrument_id
        - side
        - price
        - quantity
        - taker
        - fee
        - fee_asset
        - previous_size
        - previous_entry_price
        - pnl
        - timestamp
        - liquidation
        - adl
        - hash
      properties:
        trade_id:
          $ref: '#/components/schemas/tid'
        order_id:
          $ref: '#/components/schemas/oid'
        instrument_id:
          $ref: '#/components/schemas/iid'
        side:
          $ref: '#/components/schemas/side'
        price:
          $ref: '#/components/schemas/p'
        quantity:
          $ref: '#/components/schemas/qty'
        taker:
          $ref: '#/components/schemas/taker'
        fee:
          $ref: '#/components/schemas/fee'
        fee_asset:
          $ref: '#/components/schemas/fea'
        previous_size:
          $ref: '#/components/schemas/psz'
        previous_entry_price:
          $ref: '#/components/schemas/pep'
        pnl:
          $ref: '#/components/schemas/pnl'
        liquidation:
          $ref: '#/components/schemas/liq'
        adl:
          $ref: '#/components/schemas/adl'
        timestamp:
          $ref: '#/components/schemas/ts'
        hash:
          $ref: '#/components/schemas/hash'
    more:
      type: boolean
      description: More data available
    Error400:
      title: Error400
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error408:
      title: Error408
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error413:
      title: Error413
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error429:
      title: Error429
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error500:
      title: Error500
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    tid:
      type: integer
      description: Trade ID
      example: 1
    oid:
      type: integer
      description: Order ID
      example: 1234567890
    iid:
      type: integer
      description: Instrument ID
      example: 1
    side:
      type: string
      description: Side
      enum:
        - long
        - short
    p:
      type: string
      description: Price
      example: '100.00'
    qty:
      type: string
      description: Quantity in no. of contracts
      example: '10.00'
    taker:
      type: boolean
      description: Whether this side was the taker
    fee:
      type: string
      description: Fee amount for this trade side
      example: '1.25'
    fea:
      type: string
      description: Fee asset name
      example: USDC
    psz:
      type: string
      description: Position size before the fill
      example: '26.86'
    pep:
      type: string
      description: Position entry price before the fill
      example: '100.00'
    pnl:
      type: string
      description: PnL in USD
      example: '100.00'
    liq:
      type: boolean
      description: >-
        Whether this fill was part of a liquidation of the account's position —
        true on forced closes and on any fill executed while the account was
        under liquidation on the instrument, maker or taker. False on the
        counterparty leg of an auto-deleveraging or backstop match — its fill is
        part of someone else's liquidation, flagged by `adl` where applicable
    adl:
      type: boolean
      description: Whether the fill came from auto-deleveraging
    ts:
      type: integer
      description: >-
        Request timestamp. Unix milliseconds for most operations; Unix seconds
        for withdrawals (must match the on-chain EIP-712 struct verified against
        block.timestamp).
      example: 1767225600000
    hash:
      type: string
      description: On-chain transaction hash, "0x" if not yet mined
      default: 0x
      example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    error:
      type: string
      description: >-
        Error identifier. For domain rejections and transport errors
        (`401`/`404`/`429`/`500`) this is a stable, machine-readable snake_case
        identifier that is part of the API contract and safe to branch on, e.g.
        `insufficient_margin`, `insufficient_balance`, `order_not_found`,
        `reduce_only_invalid`, `price_outside_bounds`, `position_not_found`,
        `invalid_margin_mode`, `invalid_margin_amount`,
        `margin_below_required_initial`, `account_liquidating`, `unauthorized`,
        `not_found`. For `400` it is a human-readable validation detail whose
        wording may change. See the Error handling guide for the domain
        identifiers. (Post-only / Fill-or-Kill outcomes are order statuses such
        as `post_only_rejected`, not rejections.)
      example: insufficient_margin
  responses:
    Error400Response:
      description: |
        Bad request — the request was malformed or failed validation (bad query
        parameters, unparseable body, invalid signature, or a domain pre-check).
        The `error` field is a human-readable validation detail.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error400'
    Error408Response:
      description: |
        Request Timeout — the request body was not delivered within the
        gateway's read deadline. Protects against slow uploads holding
        connections open; send the complete body promptly and retry.
        `error` is `request_body_timeout`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error408'
    Error413Response:
      description: |
        Content Too Large — the request body exceeds the gateway's size cap,
        judged on the declared `Content-Length` or the actual stream. Split
        oversized batches into smaller requests. `error` is
        `payload_too_large`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error413'
    Error429Response:
      description: >
        Too Many Requests. `error` distinguishes the limit that was hit:

        `ip_rate_limited` (per-IP token bucket), `action_rate_limited`
        (per-account

        action rate), or `open_orders_limit` (resting open-order cap).
      headers:
        Retry-After:
          description: >
            Whole seconds to wait before retrying. Present only on token-bucket

            rate-limit rejections (`ip_rate_limited` and `action_rate_limited`);
            a

            conservative estimate of when enough capacity will have refilled to

            admit the request. Absent on `open_orders_limit`, which is a
            capacity

            limit, not a rate limit — waiting does not free order slots; cancel

            resting orders or wait for fills instead.
          schema:
            type: integer
            example: 2
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error429'
    Error500Response:
      description: |
        Internal server error. `error` is `internal_error`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error500'

````