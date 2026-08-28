> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Isolated Margin

> Adjust the signed collateral allocation for an existing isolated position.
Use a positive amount to add margin and a negative amount to remove it.
A removal may include unrealized isolated profit, but the resulting
isolated position equity (allocation + unrealized PnL - settled funding)
must remain at or above the position's current required initial margin.

Both additions and removals are rejected while the account is in cross
liquidation or the target isolated position is in isolated liquidation.
An isolated liquidation on another instrument does not block this request.

Cancel-only mode does not gate margin adjustments.

Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
Gateway signature validation rejects a stale or future-skewed timestamp as
`invalid signature`. A request that passes gateway validation can still fail
sequencer freshness revalidation with
`invalid_margin_signature_timestamp`. Reusing the exact signed request
rejects with `signature_already_used`.


<Badge color="gray" size="md">Request Weight: **1**</Badge> <Badge color="gray" size="md">Action Weight: **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json patch /v1/trade/margin
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
  /v1/trade/margin:
    patch:
      summary: Update Isolated Margin
      description: >
        Adjust the signed collateral allocation for an existing isolated
        position.

        Use a positive amount to add margin and a negative amount to remove it.

        A removal may include unrealized isolated profit, but the resulting

        isolated position equity (allocation + unrealized PnL - settled funding)

        must remain at or above the position's current required initial margin.


        Both additions and removals are rejected while the account is in cross

        liquidation or the target isolated position is in isolated liquidation.

        An isolated liquidation on another instrument does not block this
        request.


        Cancel-only mode does not gate margin adjustments.


        Requires proxy signature, see [proxy
        signing](/http/signing#2-proxy-signing).

        Gateway signature validation rejects a stale or future-skewed timestamp
        as

        `invalid signature`. A request that passes gateway validation can still
        fail

        sequencer freshness revalidation with

        `invalid_margin_signature_timestamp`. Reusing the exact signed request

        rejects with `signature_already_used`.
      operationId: updateMargin
      requestBody:
        description: Margin request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MarginRequest'
            examples:
              addMargin:
                summary: Add margin to a position
                value:
                  op:
                    type: updateMargin
                    args:
                      iid: 1
                      amt: '100.00'
                  sig: >-
                    0x7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d1c
                  salt: 444444444
                  ts: 1767000013000
              removeMargin:
                summary: Remove margin or unrealized isolated profit
                value:
                  op:
                    type: updateMargin
                    args:
                      iid: 1
                      amt: '-25.00'
                  sig: >-
                    0x7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d1c
                  salt: 444444445
                  ts: 1767000013001
      responses:
        '200':
          description: Generic response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenericResponse'
        '400':
          $ref: '#/components/responses/Error400Response'
        '422':
          description: >
            Sequenced domain rejection. Stable errors include

            `position_not_found`, `invalid_margin_mode`,

            `invalid_margin_amount`, `insufficient_margin`,

            `account_liquidating`, `margin_below_required_initial`, and

            `signature_already_used`. `invalid_margin_signature_timestamp`

            specifically indicates that sequencer freshness revalidation
            rejected

            a request that passed gateway validation.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenericResponse'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          description: >
            Internal server error or timeout. The outcome may be indeterminate
            if

            the request was sequenced but its Risk decision did not reach the

            gateway before the timeout. Before retrying, refresh the position
            using

            `GET /v1/account/portfolio`.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error500'
      security: []
components:
  schemas:
    MarginRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpUpdateMargin'
        - $ref: '#/components/schemas/BaseOp'
    GenericResponse:
      oneOf:
        - $ref: '#/components/schemas/GenericAccepted'
        - $ref: '#/components/schemas/GenericRejected'
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
    OpUpdateMargin:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - updateMargin
        args:
          type: object
          required:
            - iid
            - amt
          properties:
            iid:
              $ref: '#/components/schemas/iid'
            amt:
              $ref: '#/components/schemas/margin_amount'
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
    GenericAccepted:
      type: object
      required:
        - status
      properties:
        status:
          type: string
          enum:
            - ok
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
    iid:
      type: integer
      description: Instrument ID
      example: 1
    margin_amount:
      type: string
      description: >-
        Signed isolated-margin adjustment in the instrument quote asset.
        Positive values add allocation; negative values remove it.
      example: '100.00'
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

````