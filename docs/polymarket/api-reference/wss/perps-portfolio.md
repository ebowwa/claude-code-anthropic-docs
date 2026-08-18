> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Portfolio

> Perps WebSocket private portfolio updates.



## AsyncAPI

````yaml asyncapi-perps.json portfolio
id: portfolio
title: Portfolio
description: >-
  Real-time portfolio updates. Pushed every 5 seconds. Requires authentication,
  see [Auth](/ws/auth).
servers:
  - id: production
    protocol: wss
    host: ws.perpetuals.polymarket.com
    bindings: []
    variables: []
address: /v1/ws
parameters: []
bindings: []
operations:
  - &ref_1
    id: PortfolioSubscribe
    title: Portfolio subscribe
    description: Subscribe to portfolio
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private portfolio updates (requires prior auth)
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: req
                type: string
                description: Request type
                enumValues:
                  - post
                  - sub
                  - unsub
                required: true
              - name: chs
                type: array
                description: 'Portfolio private channel: "portfolio"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - portfolio
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-663>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-664>
            chs:
              type: array
              description: 'Portfolio private channel: "portfolio"'
              items:
                type: string
                enum:
                  - portfolio
                x-parser-schema-id: <anonymous-schema-666>
              example:
                - portfolio
              x-parser-schema-id: <anonymous-schema-665>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-662>
        title: Subscribe
        description: Subscribe to private portfolio updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "portfolio"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: portfolio
  - &ref_3
    id: PortfolioSubscribeResponse
    title: Portfolio subscribe response
    description: Portfolio subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to portfolio subscribe request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                title: Subscribe Response
                required: true
                properties:
                  - name: item
                    type: object
                    required: false
                    properties:
                      - name: status
                        type: string
                        enumValues:
                          - ok
                        required: true
                      - name: status
                        type: string
                        enumValues:
                          - err
                        required: true
                      - name: error
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `price_outside_bounds`, `position_not_found`,
                          `invalid_margin_mode`, `invalid_margin_amount`,
                          `margin_below_required_initial`,
                          `account_liquidating`, `unauthorized`, `not_found`.
                          For `400` it is a human-readable validation detail
                          whose wording may change. See the Error handling guide
                          for the domain identifiers. (Post-only / Fill-or-Kill
                          outcomes are order statuses such as
                          `post_only_rejected`, not rejections.)
                        required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-668>
            data:
              title: Subscribe Response
              type: array
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-672>
                    x-parser-schema-id: <anonymous-schema-671>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-674>
                      error:
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `price_outside_bounds`, `position_not_found`,
                          `invalid_margin_mode`, `invalid_margin_amount`,
                          `margin_below_required_initial`,
                          `account_liquidating`, `unauthorized`, `not_found`.
                          For `400` it is a human-readable validation detail
                          whose wording may change. See the Error handling guide
                          for the domain identifiers. (Post-only / Fill-or-Kill
                          outcomes are order statuses such as
                          `post_only_rejected`, not rejections.)
                        example: insufficient_margin
                        x-parser-schema-id: <anonymous-schema-675>
                    x-parser-schema-id: <anonymous-schema-673>
                x-parser-schema-id: <anonymous-schema-670>
              x-parser-schema-id: <anonymous-schema-669>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-667>
        title: Subscribe Response
        description: Response to portfolio subscribe request
        example: |-
          {
            "data": []
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeResponse
    bindings: []
    extensions: *ref_0
  - &ref_2
    id: PortfolioUnsubscribe
    title: Portfolio unsubscribe
    description: Unsubscribe from portfolio
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private portfolio updates
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: req
                type: string
                description: Request type
                enumValues:
                  - post
                  - sub
                  - unsub
                required: true
              - name: chs
                type: array
                description: 'Portfolio private channel: "portfolio"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - portfolio
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-677>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-678>
            chs:
              type: array
              description: 'Portfolio private channel: "portfolio"'
              items:
                type: string
                enum:
                  - portfolio
                x-parser-schema-id: <anonymous-schema-680>
              example:
                - portfolio
              x-parser-schema-id: <anonymous-schema-679>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-676>
        title: Unsubscribe
        description: Unsubscribe from private portfolio updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "portfolio"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: PortfolioUnsubscribeResponse
    title: Portfolio unsubscribe response
    description: Portfolio unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to portfolio unsubscribe request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                title: Subscribe Response
                required: true
                properties:
                  - name: item
                    type: object
                    required: false
                    properties:
                      - name: status
                        type: string
                        enumValues:
                          - ok
                        required: true
                      - name: status
                        type: string
                        enumValues:
                          - err
                        required: true
                      - name: error
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `price_outside_bounds`, `position_not_found`,
                          `invalid_margin_mode`, `invalid_margin_amount`,
                          `margin_below_required_initial`,
                          `account_liquidating`, `unauthorized`, `not_found`.
                          For `400` it is a human-readable validation detail
                          whose wording may change. See the Error handling guide
                          for the domain identifiers. (Post-only / Fill-or-Kill
                          outcomes are order statuses such as
                          `post_only_rejected`, not rejections.)
                        required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-682>
            data:
              title: Subscribe Response
              type: array
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-686>
                    x-parser-schema-id: <anonymous-schema-685>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-688>
                      error:
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `price_outside_bounds`, `position_not_found`,
                          `invalid_margin_mode`, `invalid_margin_amount`,
                          `margin_below_required_initial`,
                          `account_liquidating`, `unauthorized`, `not_found`.
                          For `400` it is a human-readable validation detail
                          whose wording may change. See the Error handling guide
                          for the domain identifiers. (Post-only / Fill-or-Kill
                          outcomes are order statuses such as
                          `post_only_rejected`, not rejections.)
                        example: insufficient_margin
                        x-parser-schema-id: <anonymous-schema-689>
                    x-parser-schema-id: <anonymous-schema-687>
                x-parser-schema-id: <anonymous-schema-684>
              x-parser-schema-id: <anonymous-schema-683>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-681>
        title: Unsubscribe Response
        description: Response to portfolio unsubscribe request
        example: |-
          {
            "data": []
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeResponse
    bindings: []
    extensions: *ref_0
  - &ref_5
    id: PortfolioUpdate
    title: Portfolio update
    description: Receive portfolio updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Portfolio updates pushed every 5 seconds
            type: object
            properties:
              - name: ch
                type: string
                description: >-
                  Channel name for push data. Parameterized channels include the
                  instrument ID (e.g. "trades::1", "book::1", "klines::1::1m",
                  "tickers::all"). Private channels use plain names (e.g.
                  "fills", "orders").
                required: true
              - name: ts
                type: integer
                description: >-
                  Request timestamp. Unix milliseconds for most operations; Unix
                  seconds for withdrawals (must match the on-chain EIP-712
                  struct verified against block.timestamp).
                required: true
              - name: sq
                type: integer
                description: Sequence number
                required: true
              - name: data
                type: object
                required: true
                properties:
                  - name: positions
                    type: array
                    required: true
                    properties:
                      - name: instrument_id
                        type: integer
                        description: Instrument ID
                        required: true
                      - name: symbol
                        type: string
                        description: Instrument symbol
                        required: true
                      - name: size
                        type: string
                        description: >-
                          Signed position size in no. of contracts (positive =
                          long, negative = short)
                        required: true
                      - name: entry_price
                        type: string
                        description: Average entry price
                        required: true
                      - name: leverage
                        type: integer
                        description: Leverage
                        required: true
                      - name: cross
                        type: boolean
                        description: Whether to use cross margin mode
                        required: true
                      - name: initial_margin
                        type: string
                        description: >
                          Current collateral backing the position. For cross
                          positions, this is

                          the required initial margin based on position size,
                          mark price, the

                          applicable risk tier, and configured leverage. For
                          isolated positions,

                          this is the position's current equity: signed
                          allocated margin plus

                          unrealized PnL minus settled funding.


                          The legacy `initial_margin` name is retained for API
                          compatibility;

                          `margin` would more accurately describe the field.
                        required: true
                      - name: maintenance_margin
                        type: string
                        description: Maintenance margin amount
                        required: true
                      - name: position_value
                        type: string
                        description: Notional position value in USD
                        required: true
                      - name: liquidation_price
                        type: string
                        description: Liquidation price
                        required: true
                      - name: unrealized_pnl
                        type: string
                        description: Unrealized PnL in USD
                        required: true
                      - name: return_on_equity
                        type: string
                        description: >-
                          Unrealized PnL divided by the position's current
                          required initial margin, as a decimal.
                        required: true
                      - name: cumulative_funding
                        type: string
                        description: Cumulative funding paid/received in USD
                        required: true
                      - name: adl_index
                        type: integer
                        description: >-
                          Auto-deleveraging tier; higher means higher risk of
                          being ADL'd.
                        enumValues:
                          - 0
                          - 1
                          - 2
                          - 3
                        required: true
                  - name: margin
                    type: object
                    required: true
                    properties:
                      - name: total_account_value
                        type: string
                        description: Total account value in USD (equity + unrealized PnL)
                        required: true
                      - name: available_order_margin
                        type: string
                        description: >-
                          Collateral available in USD for additional order
                          initial margin after existing exposure, open orders,
                          orders and isolated-margin additions awaiting risk
                          processing, and pending withdrawals or transfers
                        required: true
                      - name: total_initial_margin
                        type: string
                        description: Total initial margin in use across all positions
                        required: true
                      - name: total_maintenance_margin
                        type: string
                        description: Total maintenance margin across all positions
                        required: true
                      - name: total_position_value
                        type: string
                        description: Total notional position value in USD
                        required: true
                  - name: withdrawable
                    type: string
                    description: Withdrawable balance in USD
                    required: true
                  - name: in_liquidation
                    type: boolean
                    description: Whether the account is currently under liquidation
                    required: true
                  - name: timestamp
                    type: integer
                    description: Update timestamp in milliseconds
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Portfolio Update
          type: object
          properties:
            ch:
              type: string
              description: >-
                Channel name for push data. Parameterized channels include the
                instrument ID (e.g. "trades::1", "book::1", "klines::1::1m",
                "tickers::all"). Private channels use plain names (e.g. "fills",
                "orders").
              example: trades::1
              x-parser-schema-id: <anonymous-schema-691>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-692>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-693>
            data:
              type: object
              required:
                - positions
                - margin
                - withdrawable
                - in_liquidation
                - timestamp
              properties:
                positions:
                  type: array
                  items:
                    type: object
                    required:
                      - instrument_id
                      - symbol
                      - size
                      - entry_price
                      - leverage
                      - cross
                      - initial_margin
                      - maintenance_margin
                      - position_value
                      - liquidation_price
                      - unrealized_pnl
                      - return_on_equity
                      - cumulative_funding
                      - adl_index
                    properties:
                      instrument_id:
                        type: integer
                        description: Instrument ID
                        x-parser-schema-id: <anonymous-schema-697>
                      symbol:
                        type: string
                        description: Instrument symbol
                        example: NVDA-USDC
                        x-parser-schema-id: <anonymous-schema-698>
                      size:
                        type: string
                        description: >-
                          Signed position size in no. of contracts (positive =
                          long, negative = short)
                        example: '10.00'
                        x-parser-schema-id: <anonymous-schema-699>
                      entry_price:
                        type: string
                        description: Average entry price
                        example: '2986.30'
                        x-parser-schema-id: <anonymous-schema-700>
                      leverage:
                        type: integer
                        description: Leverage
                        example: 10
                        x-parser-schema-id: <anonymous-schema-701>
                      cross:
                        type: boolean
                        description: Whether to use cross margin mode
                        x-parser-schema-id: <anonymous-schema-702>
                      initial_margin:
                        type: string
                        description: >
                          Current collateral backing the position. For cross
                          positions, this is

                          the required initial margin based on position size,
                          mark price, the

                          applicable risk tier, and configured leverage. For
                          isolated positions,

                          this is the position's current equity: signed
                          allocated margin plus

                          unrealized PnL minus settled funding.


                          The legacy `initial_margin` name is retained for API
                          compatibility;

                          `margin` would more accurately describe the field.
                        example: '10.00'
                        x-parser-schema-id: <anonymous-schema-703>
                      maintenance_margin:
                        type: string
                        description: Maintenance margin amount
                        example: '100.00'
                        x-parser-schema-id: <anonymous-schema-704>
                      position_value:
                        type: string
                        description: Notional position value in USD
                        example: '100.03'
                        x-parser-schema-id: <anonymous-schema-705>
                      liquidation_price:
                        type: string
                        description: Liquidation price
                        example: '2866.27'
                        x-parser-schema-id: <anonymous-schema-706>
                      unrealized_pnl:
                        type: string
                        description: Unrealized PnL in USD
                        example: '-0.01'
                        x-parser-schema-id: <anonymous-schema-707>
                      return_on_equity:
                        type: string
                        description: >-
                          Unrealized PnL divided by the position's current
                          required initial margin, as a decimal.
                        example: '-0.0027'
                        x-parser-schema-id: <anonymous-schema-708>
                      cumulative_funding:
                        type: string
                        description: Cumulative funding paid/received in USD
                        example: '514.09'
                        x-parser-schema-id: <anonymous-schema-709>
                      adl_index:
                        type: integer
                        enum:
                          - 0
                          - 1
                          - 2
                          - 3
                        description: >-
                          Auto-deleveraging tier; higher means higher risk of
                          being ADL'd.
                        example: 2
                        x-parser-schema-id: <anonymous-schema-710>
                    x-parser-schema-id: <anonymous-schema-696>
                  x-parser-schema-id: <anonymous-schema-695>
                margin:
                  type: object
                  required:
                    - total_account_value
                    - available_order_margin
                    - total_initial_margin
                    - total_maintenance_margin
                    - total_position_value
                  properties:
                    total_account_value:
                      type: string
                      description: Total account value in USD (equity + unrealized PnL)
                      example: '13109.48'
                      x-parser-schema-id: <anonymous-schema-712>
                    available_order_margin:
                      type: string
                      description: >-
                        Collateral available in USD for additional order initial
                        margin after existing exposure, open orders, orders and
                        isolated-margin additions awaiting risk processing, and
                        pending withdrawals or transfers
                      example: '5055.79'
                      x-parser-schema-id: <anonymous-schema-713>
                    total_initial_margin:
                      type: string
                      description: Total initial margin in use across all positions
                      example: '4.97'
                      x-parser-schema-id: <anonymous-schema-714>
                    total_maintenance_margin:
                      type: string
                      description: Total maintenance margin across all positions
                      example: '2.49'
                      x-parser-schema-id: <anonymous-schema-715>
                    total_position_value:
                      type: string
                      description: Total notional position value in USD
                      example: '100.03'
                      x-parser-schema-id: <anonymous-schema-716>
                  x-parser-schema-id: <anonymous-schema-711>
                withdrawable:
                  type: string
                  description: Withdrawable balance in USD
                  example: '13104.51'
                  x-parser-schema-id: <anonymous-schema-717>
                in_liquidation:
                  type: boolean
                  description: Whether the account is currently under liquidation
                  x-parser-schema-id: <anonymous-schema-718>
                timestamp:
                  type: integer
                  description: Update timestamp in milliseconds
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-719>
              x-parser-schema-id: <anonymous-schema-694>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-690>
        title: Update
        description: Portfolio updates pushed every 5 seconds
        example: |-
          {
            "ch": "portfolio",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": {
              "positions": [
                {
                  "symbol": "NVDA-USDC",
                  "size": "10.00",
                  "entry_price": "2986.30",
                  "leverage": 10,
                  "initial_margin": "10.00",
                  "maintenance_margin": "100.00",
                  "position_value": "100.03",
                  "liquidation_price": "2866.27",
                  "unrealized_pnl": "-0.01",
                  "return_on_equity": "-0.0027",
                  "cumulative_funding": "514.09",
                  "adl_index": 2
                }
              ],
              "margin": {
                "total_account_value": "13109.48",
                "available_order_margin": "13104.51",
                "total_initial_margin": "4.97",
                "total_maintenance_margin": "2.49",
                "total_position_value": "100.03"
              },
              "withdrawable": "13104.51",
              "timestamp": 1767225600000
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Update
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
  - *ref_2
receiveOperations:
  - *ref_3
  - *ref_4
  - *ref_5
sendMessages:
  - *ref_6
  - *ref_7
receiveMessages:
  - *ref_8
  - *ref_9
  - *ref_10
extensions:
  - id: x-parser-unique-object-id
    value: portfolio
securitySchemes: []

````