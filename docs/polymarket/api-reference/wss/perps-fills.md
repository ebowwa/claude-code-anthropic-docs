<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-fills.md
Downloaded: 2026-07-31T21:03:55.554Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fills

> Perps WebSocket private fill updates.



## AsyncAPI

````yaml asyncapi-perps.json fills
id: fills
title: Fills
description: Real-time fill updates. Requires authentication, see [Auth](/ws/auth).
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
    id: FillsSubscribe
    title: Fills subscribe
    description: Subscribe to fills
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private fill updates (requires prior auth)
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
                description: 'Fills private channel: "fills"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - fills
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-418>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-419>
            chs:
              type: array
              description: 'Fills private channel: "fills"'
              items:
                type: string
                enum:
                  - fills
                x-parser-schema-id: <anonymous-schema-421>
              example:
                - fills
              x-parser-schema-id: <anonymous-schema-420>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-417>
        title: Subscribe
        description: Subscribe to private fill updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "fills"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: fills
  - &ref_3
    id: FillsSubscribeResponse
    title: Fills subscribe response
    description: Fills subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to fills subscribe request
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
              x-parser-schema-id: <anonymous-schema-423>
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
                        x-parser-schema-id: <anonymous-schema-427>
                    x-parser-schema-id: <anonymous-schema-426>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-429>
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
                        x-parser-schema-id: <anonymous-schema-430>
                    x-parser-schema-id: <anonymous-schema-428>
                x-parser-schema-id: <anonymous-schema-425>
              x-parser-schema-id: <anonymous-schema-424>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-422>
        title: Subscribe Response
        description: Response to fills subscribe request
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
    id: FillsUnsubscribe
    title: Fills unsubscribe
    description: Unsubscribe from fills
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private fill updates
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
                description: 'Fills private channel: "fills"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - fills
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-432>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-433>
            chs:
              type: array
              description: 'Fills private channel: "fills"'
              items:
                type: string
                enum:
                  - fills
                x-parser-schema-id: <anonymous-schema-435>
              example:
                - fills
              x-parser-schema-id: <anonymous-schema-434>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-431>
        title: Unsubscribe
        description: Unsubscribe from private fill updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "fills"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: FillsUnsubscribeResponse
    title: Fills unsubscribe response
    description: Fills unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to fills unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-437>
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
                        x-parser-schema-id: <anonymous-schema-441>
                    x-parser-schema-id: <anonymous-schema-440>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-443>
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
                        x-parser-schema-id: <anonymous-schema-444>
                    x-parser-schema-id: <anonymous-schema-442>
                x-parser-schema-id: <anonymous-schema-439>
              x-parser-schema-id: <anonymous-schema-438>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-436>
        title: Unsubscribe Response
        description: Response to fills unsubscribe request
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
    id: FillsUpdate
    title: Fills update
    description: Receive fill updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time fill updates for authenticated users
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
                description: Array of fill objects
                required: true
                properties:
                  - name: tid
                    type: integer
                    description: Trade ID
                    required: true
                  - name: oid
                    type: integer
                    description: Order ID
                    required: true
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: side
                    type: string
                    description: Side
                    enumValues:
                      - long
                      - short
                    required: true
                  - name: p
                    type: string
                    description: Price
                    required: true
                  - name: qty
                    type: string
                    description: Quantity in no. of contracts
                    required: true
                  - name: taker
                    type: boolean
                    description: Whether this side was the taker
                    required: true
                  - name: fee
                    type: string
                    description: Fee amount for this trade side
                    required: true
                  - name: fea
                    type: string
                    description: Fee asset name
                    required: true
                  - name: psz
                    type: string
                    description: Position size before the fill
                    required: true
                  - name: pep
                    type: string
                    description: Position entry price before the fill
                    required: true
                  - name: pnl
                    type: string
                    description: PnL in USD
                    required: true
                  - name: liq
                    type: boolean
                    description: Whether the fill was a liquidation
                    required: true
                  - name: ts
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    required: true
                  - name: coid
                    type: string
                    description: Client order ID
                    required: false
        headers: []
        jsonPayloadSchema:
          title: Fills Update
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
              x-parser-schema-id: <anonymous-schema-446>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-447>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-448>
            data:
              type: object
              description: Array of fill objects
              properties:
                tid:
                  type: integer
                  description: Trade ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-450>
                oid:
                  type: integer
                  description: Order ID
                  example: 1234567890
                  x-parser-schema-id: <anonymous-schema-451>
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-452>
                side:
                  type: string
                  description: Side
                  enum:
                    - long
                    - short
                  x-parser-schema-id: <anonymous-schema-453>
                p:
                  type: string
                  description: Price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-454>
                qty:
                  type: string
                  description: Quantity in no. of contracts
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-455>
                taker:
                  type: boolean
                  description: Whether this side was the taker
                  x-parser-schema-id: <anonymous-schema-456>
                fee:
                  type: string
                  description: Fee amount for this trade side
                  example: '1.25'
                  x-parser-schema-id: <anonymous-schema-457>
                fea:
                  type: string
                  description: Fee asset name
                  example: USDC
                  x-parser-schema-id: <anonymous-schema-458>
                psz:
                  type: string
                  description: Position size before the fill
                  example: '26.86'
                  x-parser-schema-id: <anonymous-schema-459>
                pep:
                  type: string
                  description: Position entry price before the fill
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-460>
                pnl:
                  type: string
                  description: PnL in USD
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-461>
                liq:
                  type: boolean
                  description: Whether the fill was a liquidation
                  x-parser-schema-id: <anonymous-schema-462>
                ts:
                  type: integer
                  description: >-
                    Request timestamp. Unix milliseconds for most operations;
                    Unix seconds for withdrawals (must match the on-chain
                    EIP-712 struct verified against block.timestamp).
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-463>
                coid:
                  type: string
                  description: Client order ID
                  minLength: 32
                  maxLength: 32
                  pattern: ^[0-9a-f]{32}$
                  example: 550e8400e29b41d4a716446655440000
                  x-parser-schema-id: <anonymous-schema-464>
              required:
                - tid
                - oid
                - iid
                - side
                - p
                - qty
                - taker
                - fee
                - fea
                - psz
                - pep
                - pnl
                - ts
                - liq
              x-parser-schema-id: <anonymous-schema-449>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-445>
        title: Update
        description: Real-time fill updates for authenticated users
        example: |-
          {
            "ch": "fills",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "tid": 1,
                "oid": 1234567890,
                "iid": 1,
                "side": "long",
                "p": "100.00",
                "qty": "10.00",
                "fee": "1.25",
                "fea": "USDC",
                "psz": "26.86",
                "pep": "100.00",
                "pnl": "100.00",
                "ts": 1767225600000,
                "coid": "550e8400e29b41d4a716446655440000"
              }
            ]
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
    value: fills
securitySchemes: []

````