<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-modify-orders.md
Downloaded: 2026-08-23T20:22:43.330Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Modify Orders

> Perps WebSocket order modification by order ID.



## AsyncAPI

````yaml asyncapi-perps.json modifyOrders
id: modifyOrders
title: Modify Orders
description: |
  Modify existing orders by exchange order ID. Only price and total quantity
  are mutable.
  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).

  <Badge color="gray" size="md">Action Weight: **1 / order**</Badge>
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
  - &ref_2
    id: ModifyOrdersReceive
    title: Modify orders receive
    description: Modify order response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Modify Orders Response
            description: Server responds with modify result for each order
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                description: >
                  Array of modify results. A request-level failure is returned
                  as

                  a single rejected item.
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
                      - name: order
                        type: object
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
                      - name: status
                        type: string
                        enumValues:
                          - err
                        required: true
                      - name: oid
                        type: integer
                        description: Order ID
                        required: false
                      - name: coid
                        type: string
                        description: Client order ID
                        required: false
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
              x-parser-schema-id: <anonymous-schema-921>
            data:
              type: array
              description: |
                Array of modify results. A request-level failure is returned as
                a single rejected item.
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                      - order
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-925>
                      order:
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
                            type: integer
                            description: Order ID
                            example: 1234567890
                            x-parser-schema-id: <anonymous-schema-927>
                          iid:
                            type: integer
                            description: Instrument ID
                            example: 1
                            x-parser-schema-id: <anonymous-schema-928>
                          buy:
                            type: boolean
                            description: Is buy
                            example: true
                            x-parser-schema-id: <anonymous-schema-929>
                          p:
                            type: string
                            description: Price
                            example: '100.00'
                            x-parser-schema-id: <anonymous-schema-930>
                          qty:
                            type: string
                            description: Quantity in no. of contracts
                            example: '10.00'
                            x-parser-schema-id: <anonymous-schema-931>
                          tif:
                            type: string
                            description: Time in force
                            enum:
                              - gtc
                              - ioc
                              - fok
                            x-parser-schema-id: <anonymous-schema-932>
                          po:
                            type: boolean
                            description: Post only
                            default: false
                            example: false
                            x-parser-schema-id: <anonymous-schema-933>
                          ro:
                            type: boolean
                            description: Reduce only
                            example: false
                            default: false
                            x-parser-schema-id: <anonymous-schema-934>
                          rest:
                            type: string
                            description: Resting quantity
                            example: '9.00'
                            x-parser-schema-id: <anonymous-schema-935>
                          fill:
                            type: string
                            description: Filled quantity
                            example: '1.00'
                            x-parser-schema-id: <anonymous-schema-936>
                          cts:
                            type: integer
                            description: Create timestamp in milliseconds
                            example: 1767225600000
                            x-parser-schema-id: <anonymous-schema-937>
                          uts:
                            type: integer
                            description: Update timestamp in milliseconds
                            example: 1767225600000
                            x-parser-schema-id: <anonymous-schema-938>
                          status:
                            type: string
                            description: Order status
                            example: open
                            x-parser-schema-id: <anonymous-schema-939>
                          coid:
                            type: string
                            description: Client order ID
                            minLength: 32
                            maxLength: 32
                            pattern: ^[0-9a-f]{32}$
                            example: 550e8400e29b41d4a716446655440000
                            x-parser-schema-id: <anonymous-schema-940>
                        x-parser-schema-id: <anonymous-schema-926>
                    x-parser-schema-id: <anonymous-schema-924>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-942>
                      oid:
                        type: integer
                        description: Order ID
                        example: 1234567890
                        x-parser-schema-id: <anonymous-schema-943>
                      coid:
                        type: string
                        description: Client order ID
                        minLength: 32
                        maxLength: 32
                        pattern: ^[0-9a-f]{32}$
                        example: 550e8400e29b41d4a716446655440000
                        x-parser-schema-id: <anonymous-schema-944>
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
                        x-parser-schema-id: <anonymous-schema-945>
                    x-parser-schema-id: <anonymous-schema-941>
                x-parser-schema-id: <anonymous-schema-923>
              x-parser-schema-id: <anonymous-schema-922>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-920>
        title: Modify Orders Response
        description: Server responds with modify result for each order
        example: |-
          {
            "id": 2,
            "data": [
              {
                "status": "ok",
                "order": {
                  "oid": 1234567890,
                  "iid": 1,
                  "buy": true,
                  "p": "100.25",
                  "qty": "8",
                  "tif": "gtc",
                  "po": false,
                  "ro": false,
                  "rest": "8",
                  "fill": "0",
                  "status": "open",
                  "cts": 1767225600000,
                  "uts": 1767225601000
                }
              }
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Response
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: modifyOrders
  - &ref_1
    id: ModifyOrdersSend
    title: Modify orders send
    description: Modify existing orders
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Modify Orders Request
            description: Client submits a signed order modification request
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
              - name: op
                type: object
                required: true
                properties:
                  - name: type
                    type: string
                    enumValues:
                      - modifyOrders
                    required: true
                  - name: args
                    type: array
                    description: Array of orders to modify
                    required: true
                    properties:
                      - name: oid
                        type: integer
                        description: Order ID
                        required: true
                      - name: p
                        type: string
                        description: Price
                        required: true
                      - name: qty
                        type: string
                        description: Quantity in no. of contracts
                        required: true
              - name: sig
                type: string
                description: Signature in hex format
                required: true
              - name: salt
                type: integer
                description: Salt
                required: true
              - name: ts
                type: integer
                description: >-
                  Request timestamp. Unix milliseconds for most operations; Unix
                  seconds for withdrawals (must match the on-chain EIP-712
                  struct verified against block.timestamp).
                required: true
              - name: exp
                type: integer
                description: >-
                  Command expiry timestamp in Unix milliseconds. If provided, it
                  must be in the future and within the gateway's default command
                  timeout. It can shorten request validity but cannot extend it.
                  This is not an order auto-cancel time.
                required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-907>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-908>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - modifyOrders
                  x-parser-schema-id: <anonymous-schema-910>
                args:
                  type: array
                  minItems: 1
                  description: Array of orders to modify
                  items:
                    type: object
                    additionalProperties: false
                    required:
                      - oid
                      - p
                      - qty
                    properties:
                      oid:
                        type: integer
                        description: Order ID
                        example: 1234567890
                        x-parser-schema-id: <anonymous-schema-913>
                      p:
                        type: string
                        description: Price
                        example: '100.00'
                        x-parser-schema-id: <anonymous-schema-914>
                      qty:
                        type: string
                        description: Quantity in no. of contracts
                        example: '10.00'
                        x-parser-schema-id: <anonymous-schema-915>
                    x-parser-schema-id: <anonymous-schema-912>
                  x-parser-schema-id: <anonymous-schema-911>
              x-parser-schema-id: <anonymous-schema-909>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-916>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-917>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-918>
            exp:
              type: integer
              description: >-
                Command expiry timestamp in Unix milliseconds. If provided, it
                must be in the future and within the gateway's default command
                timeout. It can shorten request validity but cannot extend it.
                This is not an order auto-cancel time.
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-919>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-906>
        title: Modify Orders Request
        description: Client submits a signed order modification request
        example: |-
          {
            "id": 2,
            "req": "post",
            "op": {
              "type": "modifyOrders",
              "args": [
                {
                  "oid": 1234567890,
                  "p": "100.25",
                  "qty": "8"
                }
              ]
            },
            "sig": "0x1234567890...",
            "salt": 1234567890,
            "ts": 1767225600000,
            "exp": 1767225660000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
receiveOperations:
  - *ref_2
sendMessages:
  - *ref_3
receiveMessages:
  - *ref_4
extensions:
  - id: x-parser-unique-object-id
    value: modifyOrders
securitySchemes: []

````