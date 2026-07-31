<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-orders.md
Downloaded: 2026-07-31T21:03:55.555Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Orders

> Perps WebSocket private order updates.



## AsyncAPI

````yaml asyncapi-perps.json orders
id: orders
title: Orders
description: Real-time order updates. Requires authentication, see [Auth](/ws/auth).
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
    id: OrdersSubscribe
    title: Orders subscribe
    description: Subscribe to orders
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private order updates (requires prior auth)
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
                description: 'Orders private channel: "orders"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - orders
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-466>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-467>
            chs:
              type: array
              description: 'Orders private channel: "orders"'
              items:
                type: string
                enum:
                  - orders
                x-parser-schema-id: <anonymous-schema-469>
              example:
                - orders
              x-parser-schema-id: <anonymous-schema-468>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-465>
        title: Subscribe
        description: Subscribe to private order updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "orders"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: orders
  - &ref_3
    id: OrdersSubscribeResponse
    title: Orders subscribe response
    description: Orders subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to orders subscribe request
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
              x-parser-schema-id: <anonymous-schema-471>
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
                        x-parser-schema-id: <anonymous-schema-475>
                    x-parser-schema-id: <anonymous-schema-474>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-477>
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
                        x-parser-schema-id: <anonymous-schema-478>
                    x-parser-schema-id: <anonymous-schema-476>
                x-parser-schema-id: <anonymous-schema-473>
              x-parser-schema-id: <anonymous-schema-472>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-470>
        title: Subscribe Response
        description: Response to orders subscribe request
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
    id: OrdersUnsubscribe
    title: Orders unsubscribe
    description: Unsubscribe from orders
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private order updates
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
                description: 'Orders private channel: "orders"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - orders
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-480>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-481>
            chs:
              type: array
              description: 'Orders private channel: "orders"'
              items:
                type: string
                enum:
                  - orders
                x-parser-schema-id: <anonymous-schema-483>
              example:
                - orders
              x-parser-schema-id: <anonymous-schema-482>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-479>
        title: Unsubscribe
        description: Unsubscribe from private order updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "orders"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: OrdersUnsubscribeResponse
    title: Orders unsubscribe response
    description: Orders unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to orders unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-485>
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
                        x-parser-schema-id: <anonymous-schema-489>
                    x-parser-schema-id: <anonymous-schema-488>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-491>
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
                        x-parser-schema-id: <anonymous-schema-492>
                    x-parser-schema-id: <anonymous-schema-490>
                x-parser-schema-id: <anonymous-schema-487>
              x-parser-schema-id: <anonymous-schema-486>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-484>
        title: Unsubscribe Response
        description: Response to orders unsubscribe request
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
    id: OrdersUpdate
    title: Orders update
    description: Receive order updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time order updates for authenticated users
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
                description: Order object
                required: true
                properties:
                  - name: oid
                    type: integer
                    description: Order ID
                    required: true
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: buy
                    type: boolean
                    description: Is buy
                    required: true
                  - name: p
                    type: string
                    description: Price
                    required: true
                  - name: qty
                    type: string
                    description: Quantity in no. of contracts
                    required: true
                  - name: tif
                    type: string
                    description: Time in force
                    enumValues:
                      - gtc
                      - ioc
                      - fok
                    required: true
                  - name: po
                    type: boolean
                    description: Post only
                    required: true
                  - name: ro
                    type: boolean
                    description: Reduce only
                    required: true
                  - name: rest
                    type: string
                    description: Resting quantity
                    required: true
                  - name: fill
                    type: string
                    description: Filled quantity
                    required: true
                  - name: cts
                    type: integer
                    description: Create timestamp in milliseconds
                    required: true
                  - name: uts
                    type: integer
                    description: Update timestamp in milliseconds
                    required: true
                  - name: status
                    type: string
                    description: Order status
                    required: true
                  - name: coid
                    type: string
                    description: Client order ID
                    required: false
        headers: []
        jsonPayloadSchema:
          title: Orders Update
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
              x-parser-schema-id: <anonymous-schema-494>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-495>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-496>
            data:
              type: object
              description: Order object
              properties:
                oid:
                  type: integer
                  description: Order ID
                  example: 1234567890
                  x-parser-schema-id: <anonymous-schema-498>
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-499>
                buy:
                  type: boolean
                  description: Is buy
                  example: true
                  x-parser-schema-id: <anonymous-schema-500>
                p:
                  type: string
                  description: Price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-501>
                qty:
                  type: string
                  description: Quantity in no. of contracts
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-502>
                tif:
                  type: string
                  description: Time in force
                  enum:
                    - gtc
                    - ioc
                    - fok
                  x-parser-schema-id: <anonymous-schema-503>
                po:
                  type: boolean
                  description: Post only
                  default: false
                  example: false
                  x-parser-schema-id: <anonymous-schema-504>
                ro:
                  type: boolean
                  description: Reduce only
                  example: false
                  default: false
                  x-parser-schema-id: <anonymous-schema-505>
                rest:
                  type: string
                  description: Resting quantity
                  example: '9.00'
                  x-parser-schema-id: <anonymous-schema-506>
                fill:
                  type: string
                  description: Filled quantity
                  example: '1.00'
                  x-parser-schema-id: <anonymous-schema-507>
                cts:
                  type: integer
                  description: Create timestamp in milliseconds
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-508>
                uts:
                  type: integer
                  description: Update timestamp in milliseconds
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-509>
                status:
                  type: string
                  description: Order status
                  example: open
                  x-parser-schema-id: <anonymous-schema-510>
                coid:
                  type: string
                  description: Client order ID
                  minLength: 32
                  maxLength: 32
                  pattern: ^[0-9a-f]{32}$
                  example: 550e8400e29b41d4a716446655440000
                  x-parser-schema-id: <anonymous-schema-511>
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
              x-parser-schema-id: <anonymous-schema-497>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-493>
        title: Update
        description: Real-time order updates for authenticated users
        example: |-
          {
            "ch": "orders",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": {
              "oid": 1234567890,
              "iid": 1,
              "buy": true,
              "p": "100.00",
              "qty": "10.00",
              "tif": "gtc",
              "po": false,
              "ro": false,
              "rest": "9.00",
              "fill": "1.00",
              "cts": 1767225600000,
              "uts": 1767225600000,
              "status": "open",
              "coid": "550e8400e29b41d4a716446655440000"
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
    value: orders
securitySchemes: []

````