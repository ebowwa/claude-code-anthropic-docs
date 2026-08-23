<!--
Source: https://docs.polymarket.com/api-reference/modify-orders.md
Downloaded: 2026-08-23T20:22:43.324Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Modify Orders

> Modify the price and total quantity of existing orders by exchange order ID.
Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).


<Badge color="gray" size="md">Request Weight: **1 + floor(n / 20)**</Badge> <Badge color="gray" size="md">Action Weight: **1 / order**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json patch /v1/trade/orders
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
  /v1/trade/orders:
    patch:
      summary: Modify Orders
      description: >
        Modify the price and total quantity of existing orders by exchange order
        ID.

        Requires proxy signature, see [proxy
        signing](/http/signing#2-proxy-signing).
      operationId: modifyOrders
      requestBody:
        description: Modify request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ModifyRequest'
      responses:
        '200':
          description: One modify result per requested order, in request order.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ModifyResponse'
        '400':
          $ref: '#/components/responses/BatchError400Response'
        '404':
          $ref: '#/components/responses/BatchError404Response'
        '429':
          $ref: '#/components/responses/BatchError429Response'
        '500':
          $ref: '#/components/responses/BatchError500Response'
      security: []
components:
  schemas:
    ModifyRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpModifyOrders'
        - $ref: '#/components/schemas/BaseOp'
        - type: object
          properties:
            exp:
              $ref: '#/components/schemas/exp'
    ModifyResponse:
      oneOf:
        - $ref: '#/components/schemas/ModifyAccepted'
        - $ref: '#/components/schemas/ModifyRejected'
    OpModifyOrders:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - modifyOrders
        args:
          type: array
          minItems: 1
          items:
            $ref: '#/components/schemas/ModifyOrder'
    BaseOp:
      type: object
      required:
        - sig
        - salt
        - ts
      properties:
        sig:
          $ref: '#/components/schemas/sig'
        salt:
          $ref: '#/components/schemas/salt'
        ts:
          $ref: '#/components/schemas/ts'
    exp:
      type: integer
      description: >-
        Command expiry timestamp in Unix milliseconds. If provided, it must be
        in the future and within the gateway's default command timeout. It can
        shorten request validity but cannot extend it. This is not an order
        auto-cancel time.
      example: 1767225600000
    ModifyAccepted:
      type: object
      required:
        - status
        - order
      properties:
        status:
          type: string
          enum:
            - ok
        order:
          $ref: '#/components/schemas/Order'
    ModifyRejected:
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        oid:
          $ref: '#/components/schemas/oid'
        coid:
          $ref: '#/components/schemas/coid'
        error:
          $ref: '#/components/schemas/error'
    GenericRejected:
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
    ModifyOrder:
      type: object
      additionalProperties: false
      required:
        - oid
        - p
        - qty
      properties:
        oid:
          $ref: '#/components/schemas/oid'
        p:
          $ref: '#/components/schemas/p'
        qty:
          $ref: '#/components/schemas/qty'
    sig:
      type: string
      description: Signature in hex format
      example: 0x1234567890...
    salt:
      type: integer
      description: Salt
      example: 1234567890
    ts:
      type: integer
      description: >-
        Request timestamp. Unix milliseconds for most operations; Unix seconds
        for withdrawals (must match the on-chain EIP-712 struct verified against
        block.timestamp).
      example: 1767225600000
    Order:
      type: object
      required:
        - oid
        - iid
        - buy
        - p
        - qty
        - tif
        - po
        - ro
        - status
        - rest
        - fill
        - cts
        - uts
      properties:
        oid:
          $ref: '#/components/schemas/oid'
        iid:
          $ref: '#/components/schemas/iid'
        buy:
          $ref: '#/components/schemas/buy'
        p:
          $ref: '#/components/schemas/p'
        qty:
          $ref: '#/components/schemas/qty'
        tif:
          $ref: '#/components/schemas/tif'
        po:
          $ref: '#/components/schemas/po'
        ro:
          $ref: '#/components/schemas/ro'
        rest:
          $ref: '#/components/schemas/rest'
        fill:
          $ref: '#/components/schemas/fill'
        cts:
          $ref: '#/components/schemas/cts'
        uts:
          $ref: '#/components/schemas/uts'
        status:
          $ref: '#/components/schemas/st'
        coid:
          $ref: '#/components/schemas/coid'
    oid:
      type: integer
      description: Order ID
      example: 1234567890
    coid:
      type: string
      description: Client order ID
      minLength: 32
      maxLength: 32
      pattern: ^[0-9a-f]{32}$
      example: 550e8400e29b41d4a716446655440000
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
    p:
      type: string
      description: Price
      example: '100.00'
    qty:
      type: string
      description: Quantity in no. of contracts
      example: '10.00'
    iid:
      type: integer
      description: Instrument ID
      example: 1
    buy:
      type: boolean
      description: Is buy
      example: true
    tif:
      type: string
      description: Time in force
      enum:
        - gtc
        - ioc
        - fok
    po:
      type: boolean
      description: Post only
      default: false
      example: false
    ro:
      type: boolean
      description: Reduce only
      example: false
      default: false
    rest:
      type: string
      description: Resting quantity
      example: '9.00'
    fill:
      type: string
      description: Filled quantity
      example: '1.00'
    cts:
      type: integer
      description: Create timestamp in milliseconds
      example: 1767225600000
    uts:
      type: integer
      description: Update timestamp in milliseconds
      example: 1767225600000
    st:
      type: string
      description: Order status
      example: open
  responses:
    BatchError400Response:
      description: >
        Bad request — the batch request was malformed or failed validation

        (unparseable body, invalid signature, or a domain pre-check).
        Request-level

        failures are returned as a single rejected item so batch endpoints

        always return an array. The `error` field is a human-readable validation

        detail.
      content:
        application/json:
          schema:
            type: array
            minItems: 1
            maxItems: 1
            items:
              $ref: '#/components/schemas/GenericRejected'
    BatchError404Response:
      description: >
        Not found — the batch endpoint is disabled on this venue. Request-level

        failures are returned as a single rejected item so batch endpoints
        always

        return an array. `error` is `not_found`.
      content:
        application/json:
          schema:
            type: array
            minItems: 1
            maxItems: 1
            items:
              $ref: '#/components/schemas/GenericRejected'
    BatchError429Response:
      description: |
        Too Many Requests. Request-level failures are returned as a single
        rejected item so batch endpoints always return an array. `error`
        distinguishes the limit that was hit: `ip_rate_limited` (per-IP token
        bucket), `action_rate_limited` (per-account action rate), or
        `open_orders_limit` (resting open-order cap).
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
            type: array
            minItems: 1
            maxItems: 1
            items:
              $ref: '#/components/schemas/GenericRejected'
    BatchError500Response:
      description: |
        Internal server error. Request-level failures are returned as a single
        rejected item so batch endpoints always return an array. `error` is
        `internal_error`.
      content:
        application/json:
          schema:
            type: array
            minItems: 1
            maxItems: 1
            items:
              $ref: '#/components/schemas/GenericRejected'

````