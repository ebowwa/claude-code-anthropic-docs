<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-trades.md
Downloaded: 2026-07-31T21:03:55.556Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Trades

> Perps WebSocket public trade updates.



## AsyncAPI

````yaml asyncapi-perps.json trades
id: trades
title: Trades
description: Real-time trade stream.
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
    id: TradesSubscribe
    title: Trades subscribe
    description: Subscribe to trades
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to public trade updates for an instrument
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
                description: >-
                  Trades subscription in format "trades::{iid}" (e.g.,
                  "trades::1")
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-188>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-189>
            chs:
              type: array
              description: >-
                Trades subscription in format "trades::{iid}" (e.g.,
                "trades::1")
              items:
                type: string
                pattern: ^trades::\d+$
                x-parser-schema-id: <anonymous-schema-191>
              example:
                - trades::1
              x-parser-schema-id: <anonymous-schema-190>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-187>
        title: Subscribe
        description: Subscribe to public trade updates for an instrument
        example: |-
          {
            "req": "sub",
            "chs": [
              "trades::1"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: trades
  - &ref_3
    id: TradesSubscribeResponse
    title: Trades subscribe response
    description: Trades subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to trades subscribe request
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
              x-parser-schema-id: <anonymous-schema-193>
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
                        x-parser-schema-id: <anonymous-schema-197>
                    x-parser-schema-id: <anonymous-schema-196>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-199>
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
                        x-parser-schema-id: <anonymous-schema-200>
                    x-parser-schema-id: <anonymous-schema-198>
                x-parser-schema-id: <anonymous-schema-195>
              x-parser-schema-id: <anonymous-schema-194>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-192>
        title: Subscribe Response
        description: Response to trades subscribe request
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
    id: TradesUnsubscribe
    title: Trades unsubscribe
    description: Unsubscribe from trades
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from public trade updates
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
                description: >-
                  Trades subscription in format "trades::{iid}" (e.g.,
                  "trades::1")
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-202>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-203>
            chs:
              type: array
              description: >-
                Trades subscription in format "trades::{iid}" (e.g.,
                "trades::1")
              items:
                type: string
                pattern: ^trades::\d+$
                x-parser-schema-id: <anonymous-schema-205>
              example:
                - trades::1
              x-parser-schema-id: <anonymous-schema-204>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-201>
        title: Unsubscribe
        description: Unsubscribe from public trade updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "trades::1"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: TradesUnsubscribeResponse
    title: Trades unsubscribe response
    description: Trades unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to trades unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-207>
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
                        x-parser-schema-id: <anonymous-schema-211>
                    x-parser-schema-id: <anonymous-schema-210>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-213>
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
                        x-parser-schema-id: <anonymous-schema-214>
                    x-parser-schema-id: <anonymous-schema-212>
                x-parser-schema-id: <anonymous-schema-209>
              x-parser-schema-id: <anonymous-schema-208>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-206>
        title: Unsubscribe Response
        description: Response to trades unsubscribe request
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
    id: TradesUpdate
    title: Trades update
    description: Receive trade updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time trade updates for subscribed instruments
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
                title: TradeResponse
                description: Array of trade objects
                required: true
                properties:
                  - name: tid
                    type: integer
                    description: Trade ID
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
                  - name: ts
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    required: true
                  - name: hash
                    type: string
                    description: On-chain transaction hash, "0x" if not yet mined
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Trades Update
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
              x-parser-schema-id: <anonymous-schema-216>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-217>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-218>
            data:
              type: object
              description: Array of trade objects
              title: TradeResponse
              properties:
                tid:
                  type: integer
                  description: Trade ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-220>
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-221>
                side:
                  type: string
                  description: Side
                  enum:
                    - long
                    - short
                  x-parser-schema-id: <anonymous-schema-222>
                p:
                  type: string
                  description: Price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-223>
                qty:
                  type: string
                  description: Quantity in no. of contracts
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-224>
                ts:
                  type: integer
                  description: >-
                    Request timestamp. Unix milliseconds for most operations;
                    Unix seconds for withdrawals (must match the on-chain
                    EIP-712 struct verified against block.timestamp).
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-225>
                hash:
                  type: string
                  description: On-chain transaction hash, "0x" if not yet mined
                  default: 0x
                  example: >-
                    0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                  x-parser-schema-id: <anonymous-schema-226>
              required:
                - tid
                - iid
                - side
                - p
                - qty
                - ts
                - hash
              x-parser-schema-id: <anonymous-schema-219>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-215>
        title: Update
        description: Real-time trade updates for subscribed instruments
        example: |-
          {
            "ch": "trades::1",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "tid": 1,
                "iid": 1,
                "side": "long",
                "p": "100.00",
                "qty": "10.00",
                "ts": 1767225600000,
                "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
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
    value: trades
securitySchemes: []

````