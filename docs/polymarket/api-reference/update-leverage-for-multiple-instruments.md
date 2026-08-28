> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Leverage for Multiple Instruments

> Update leverage for up to 100 unique instruments. Updates are processed
sequentially and are not atomic. If only some responses arrive before the
gateway deadline, missing item results use `internal_error`; whether those
updates applied is unknown. If no responses arrive, the request returns 500.
Requires proxy signature, see [Update Leverage](/perps/trading#update-leverage).


<Badge color="gray" size="md">Request Weight: **1 + floor(n / 20)**</Badge> <Badge color="gray" size="md">Action Weight: **1 / instrument**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json patch /v1/trade/leverage/batch
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
  /v1/trade/leverage/batch:
    patch:
      summary: Update Leverage for Multiple Instruments
      description: >
        Update leverage for up to 100 unique instruments. Updates are processed

        sequentially and are not atomic. If only some responses arrive before
        the

        gateway deadline, missing item results use `internal_error`; whether
        those

        updates applied is unknown. If no responses arrive, the request returns
        500.

        Requires proxy signature, see [Update
        Leverage](/perps/trading#update-leverage).
      operationId: updateLeverages
      requestBody:
        description: Batch leverage request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LeverageBatchRequest'
            examples:
              updateLeverages:
                summary: Update leverage for multiple instruments
                value:
                  op:
                    type: updateLeverages
                    args:
                      - iid: 1
                        lev: 5
                        cross: false
                      - iid: 2
                        lev: 10
                        cross: true
                  sig: >-
                    0x59ed57f6dce8d15aa01e774ef53d9957c84801fb34ec655f6a2ea344af8a58843095314730a3f1bd8f0f4560f6dc6f8de69d3f2d0a6f3365fc877f7f4845d40b1c
                  salt: 333333333
                  ts: 1767000012000
      responses:
        '200':
          description: Ordered result for each requested instrument.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/LeverageBatchResponse'
              examples:
                mixedResult:
                  summary: One update succeeds and one is rejected
                  value:
                    - status: ok
                      instrument_id: 1
                      leverage: 5
                      cross: false
                    - status: err
                      instrument_id: 2
                      error: insufficient_margin
        '400':
          $ref: '#/components/responses/BatchError400Response'
        '429':
          $ref: '#/components/responses/BatchError429Response'
        '500':
          $ref: '#/components/responses/BatchError500Response'
      security: []
components:
  schemas:
    LeverageBatchRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpUpdateLeverages'
        - $ref: '#/components/schemas/BaseOp'
    LeverageBatchResponse:
      oneOf:
        - $ref: '#/components/schemas/LeverageResponse'
        - $ref: '#/components/schemas/LeverageRejected'
    OpUpdateLeverages:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - updateLeverages
        args:
          type: array
          minItems: 1
          maxItems: 100
          items:
            $ref: '#/components/schemas/OpUpdateLeveragesArgsItem'
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
    LeverageResponse:
      description: The instrument's effective leverage configuration after the update.
      type: object
      required:
        - status
        - instrument_id
        - leverage
        - cross
      properties:
        status:
          type: string
          enum:
            - ok
        instrument_id:
          $ref: '#/components/schemas/iid'
        leverage:
          $ref: '#/components/schemas/lev'
        cross:
          $ref: '#/components/schemas/cross'
    LeverageRejected:
      type: object
      required:
        - status
        - instrument_id
        - error
      properties:
        status:
          type: string
          enum:
            - err
        instrument_id:
          $ref: '#/components/schemas/iid'
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
    OpUpdateLeveragesArgsItem:
      type: object
      required:
        - iid
        - lev
        - cross
      properties:
        iid:
          $ref: '#/components/schemas/iid'
        lev:
          $ref: '#/components/schemas/lev'
        cross:
          $ref: '#/components/schemas/cross'
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
    iid:
      type: integer
      description: Instrument ID
      example: 1
    lev:
      type: integer
      description: Leverage
      example: 10
    cross:
      type: boolean
      description: Whether to use cross margin mode
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