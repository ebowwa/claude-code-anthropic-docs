> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user activity



## OpenAPI

````yaml /api-spec/data-openapi.yaml get /activity
openapi: 3.0.3
info:
  title: Polymarket Data API
  version: 1.0.0
  description: >
    HTTP API for Polymarket data. This specification documents all public
    routes.
servers:
  - url: https://data-api.polymarket.com
    description: Relative server (same host)
security: []
tags:
  - name: Data API Status
    description: Data API health check
  - name: Core
  - name: Builders
  - name: Misc
paths:
  /activity:
    get:
      tags:
        - Core
      summary: Get user activity
      parameters:
        - in: query
          name: limit
          schema:
            type: integer
            default: 100
            minimum: 0
            maximum: 500
          description: Page size. Values above the maximum are clamped to 500.
        - in: query
          name: offset
          schema:
            type: integer
            default: 0
            minimum: 0
            maximum: 5000
          description: >-
            Starting index for pagination. Requests past the cap are rejected
            with a 400 (never silently clamped). To read history deeper than
            offset 5000, page inside `start`/`end` windows — each window has its
            own offset budget.
        - in: query
          name: user
          required: true
          schema:
            $ref: '#/components/schemas/Address'
        - in: query
          name: market
          style: form
          explode: false
          schema:
            type: array
            items:
              $ref: '#/components/schemas/Hash64'
          description: >-
            Comma-separated list of condition IDs. Mutually exclusive with
            eventId.
        - in: query
          name: eventId
          style: form
          explode: false
          schema:
            type: array
            items:
              type: integer
              minimum: 1
          description: Comma-separated list of event IDs. Mutually exclusive with market.
        - in: query
          name: type
          style: form
          explode: false
          schema:
            type: array
            items:
              type: string
              enum:
                - TRADE
                - SPLIT
                - MERGE
                - REDEEM
                - REWARD
                - CONVERSION
                - DEPOSIT
                - WITHDRAWAL
                - YIELD
                - MAKER_REBATE
                - TAKER_REBATE
                - REFERRAL_REWARD
          description: >-
            Comma-separated list of activity types to include. DEPOSIT and
            WITHDRAWAL records also require `excludeDepositsWithdrawals=false`.
        - in: query
          name: excludeDepositsWithdrawals
          schema:
            type: boolean
            default: true
          description: >-
            Excludes deposit and withdrawal records. The default `true` applies
            even when `type` requests those records, so to get deposits and
            withdrawals you must pass `false`.
        - in: query
          name: start
          schema:
            type: integer
            minimum: 0
          description: >-
            Lower-bound timestamp (epoch seconds) for the activity window. Omit
            or pass `0` for the default window (most recent ~3 years); pass a
            positive epoch (e.g. `1`) to retrieve full history. With
            `sortDirection=ASC`, omitting `start` already reads from the
            beginning of the account's history (no default window).
        - in: query
          name: end
          schema:
            type: integer
            minimum: 0
          description: >-
            Upper-bound timestamp (epoch seconds) for the activity window. Omit
            for the default (current time); rows newer than `end` are excluded.
        - in: query
          name: sortBy
          schema:
            type: string
            enum:
              - TIMESTAMP
              - TOKENS
              - CASH
            default: TIMESTAMP
        - in: query
          name: sortDirection
          schema:
            type: string
            enum:
              - ASC
              - DESC
            default: DESC
          description: >-
            `DESC` (default) returns the newest rows first; `ASC` the oldest
            first. Both orders are stable — the same query returns the same rows
            at any `limit`/`offset`, so pages compose without gaps or repeats.
        - in: query
          name: side
          schema:
            type: string
            enum:
              - BUY
              - SELL
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Activity'
        '400':
          description: Bad Request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    Address:
      type: string
      description: User Profile Address (0x-prefixed, 40 hex chars)
      pattern: ^0x[a-fA-F0-9]{40}$
      example: '0x56687bf447db6ffa42ffe2204a05edaa20f55839'
    Hash64:
      type: string
      description: 0x-prefixed 64-hex string
      pattern: ^0x[a-fA-F0-9]{64}$
      example: '0xdd22472e552920b8438158ea7238bfadfa4f736aa4cee91a6b86c39ead110917'
    Activity:
      type: object
      properties:
        proxyWallet:
          $ref: '#/components/schemas/Address'
        timestamp:
          type: integer
          format: int64
        conditionId:
          $ref: '#/components/schemas/Hash64'
        type:
          type: string
          enum:
            - TRADE
            - SPLIT
            - MERGE
            - REDEEM
            - REWARD
            - CONVERSION
            - DEPOSIT
            - WITHDRAWAL
            - YIELD
            - MAKER_REBATE
            - TAKER_REBATE
            - REFERRAL_REWARD
        size:
          type: number
          description: >-
            Token amount for this row. On `REDEEM` rows it is the number of
            tokens burned for this row's outcome, so redeeming both sides of a
            market returns one row per outcome instead of a single combined row.
        usdcSize:
          type: number
          description: >-
            USDC amount for this row. On `REDEEM` rows it is the payout for this
            row's outcome and is `0` for a losing outcome; the rows of one
            redemption sum to the total payout.
        transactionHash:
          type: string
        price:
          type: number
        asset:
          type: string
          description: >-
            Token ID this row refers to. Populated on `REDEEM` rows with the
            token that row settles. Empty when the row is not token-specific.
        side:
          type: string
          enum:
            - BUY
            - SELL
        outcomeIndex:
          type: integer
          description: >-
            Zero-based index of this row's outcome in the market's `outcomes`
            array, so `outcome` always equals `outcomes[outcomeIndex]`. On
            `REDEEM` rows it identifies the outcome the row settles, not the
            market's winning outcome. `999` means the outcome could not be
            determined, in which case `outcome` is empty.
        title:
          type: string
        slug:
          type: string
        icon:
          type: string
          description: >-
            Market artwork. Falls back to the market image, then to the parent
            event's icon and image, when the market has no icon of its own.
            Empty on `CONVERSION` rows.
        eventSlug:
          type: string
        outcome:
          type: string
        name:
          type: string
        pseudonym:
          type: string
        bio:
          type: string
        profileImage:
          type: string
        profileImageOptimized:
          type: string
        isCombo:
          type: boolean
          description: >-
            True when this row is part of a combinatorial (multi-market)
            position. Flag only — combo detail is not embedded here. The row's
            conditionId equals the combo's combo_condition_id; pass it to
            /v1/activity/combos or /v1/positions/combos via market_id to fetch
            legs and detail. Omitted on non-combo rows.
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error

````