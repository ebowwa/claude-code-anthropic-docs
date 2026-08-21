<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-withdrawals.md
Downloaded: 2026-08-21T20:25:29.693Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Withdrawals

> Perps WebSocket private withdrawal updates.



## AsyncAPI

````yaml asyncapi-perps.json withdrawals
id: withdrawals
title: Withdrawals
description: >-
  Real-time withdrawal status updates. Requires authentication, see
  [Auth](/ws/auth).
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
    id: WithdrawalsSubscribe
    title: Withdrawals subscribe
    description: Subscribe to withdrawals
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private withdrawal updates (requires prior auth)
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
                description: 'Withdrawals private channel: "withdrawals"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - withdrawals
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-762>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-763>
            chs:
              type: array
              description: 'Withdrawals private channel: "withdrawals"'
              items:
                type: string
                enum:
                  - withdrawals
                x-parser-schema-id: <anonymous-schema-765>
              example:
                - withdrawals
              x-parser-schema-id: <anonymous-schema-764>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-761>
        title: Subscribe
        description: Subscribe to private withdrawal updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "withdrawals"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: withdrawals
  - &ref_3
    id: WithdrawalsSubscribeResponse
    title: Withdrawals subscribe response
    description: Withdrawals subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to withdrawals subscribe request
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
              x-parser-schema-id: <anonymous-schema-767>
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
                        x-parser-schema-id: <anonymous-schema-771>
                    x-parser-schema-id: <anonymous-schema-770>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-773>
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
                        x-parser-schema-id: <anonymous-schema-774>
                    x-parser-schema-id: <anonymous-schema-772>
                x-parser-schema-id: <anonymous-schema-769>
              x-parser-schema-id: <anonymous-schema-768>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-766>
        title: Subscribe Response
        description: Response to withdrawals subscribe request
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
    id: WithdrawalsUnsubscribe
    title: Withdrawals unsubscribe
    description: Unsubscribe from withdrawals
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private withdrawal updates
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
                description: 'Withdrawals private channel: "withdrawals"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - withdrawals
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-776>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-777>
            chs:
              type: array
              description: 'Withdrawals private channel: "withdrawals"'
              items:
                type: string
                enum:
                  - withdrawals
                x-parser-schema-id: <anonymous-schema-779>
              example:
                - withdrawals
              x-parser-schema-id: <anonymous-schema-778>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-775>
        title: Unsubscribe
        description: Unsubscribe from private withdrawal updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "withdrawals"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: WithdrawalsUnsubscribeResponse
    title: Withdrawals unsubscribe response
    description: Withdrawals unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to withdrawals unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-781>
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
                        x-parser-schema-id: <anonymous-schema-785>
                    x-parser-schema-id: <anonymous-schema-784>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-787>
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
                        x-parser-schema-id: <anonymous-schema-788>
                    x-parser-schema-id: <anonymous-schema-786>
                x-parser-schema-id: <anonymous-schema-783>
              x-parser-schema-id: <anonymous-schema-782>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-780>
        title: Unsubscribe Response
        description: Response to withdrawals unsubscribe request
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
    id: WithdrawalsUpdate
    title: Withdrawals update
    description: Receive withdrawal updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Withdrawal status updates for authenticated users
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
                description: Array of withdrawal objects
                required: true
                properties:
                  - name: withdraw_id
                    type: integer
                    description: Withdraw ID
                    required: true
                  - name: asset
                    type: string
                    description: Asset name
                    required: true
                  - name: amount
                    type: string
                    description: Token amount in decimal units (e.g. "100" for 100 USDC).
                    required: true
                  - name: fee
                    type: string
                    description: Withdrawal transaction fee in decimalized asset units
                    required: true
                  - name: to
                    type: string
                    description: Destination address in hex format
                    required: true
                  - name: status
                    type: string
                    description: Withdrawal status
                    enumValues:
                      - pending
                      - confirmed
                      - removed
                      - failed
                    required: true
                  - name: hash
                    type: string
                    description: On-chain transaction hash, "0x" if not yet mined
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Withdrawals Update
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
              x-parser-schema-id: <anonymous-schema-790>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-791>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-792>
            data:
              type: object
              description: Array of withdrawal objects
              properties:
                withdraw_id:
                  type: integer
                  description: Withdraw ID
                  x-parser-schema-id: <anonymous-schema-794>
                asset:
                  type: string
                  description: Asset name
                  example: USDC
                  x-parser-schema-id: <anonymous-schema-795>
                amount:
                  type: string
                  description: Token amount in decimal units (e.g. "100" for 100 USDC).
                  example: '100'
                  x-parser-schema-id: <anonymous-schema-796>
                fee:
                  type: string
                  description: Withdrawal transaction fee in decimalized asset units
                  example: '5.00'
                  x-parser-schema-id: <anonymous-schema-797>
                to:
                  type: string
                  description: Destination address in hex format
                  example: '0x1234567890abcdef1234567890abcdef12345678'
                  x-parser-schema-id: <anonymous-schema-798>
                status:
                  type: string
                  description: Withdrawal status
                  enum:
                    - pending
                    - confirmed
                    - removed
                    - failed
                  x-parser-schema-id: <anonymous-schema-799>
                hash:
                  type: string
                  description: On-chain transaction hash, "0x" if not yet mined
                  default: 0x
                  example: >-
                    0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                  x-parser-schema-id: <anonymous-schema-800>
              required:
                - withdraw_id
                - asset
                - amount
                - fee
                - to
                - status
                - hash
              x-parser-schema-id: <anonymous-schema-793>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-789>
        title: Update
        description: Withdrawal status updates for authenticated users
        example: |-
          {
            "ch": "withdrawals",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "asset": "USDC",
                "amount": "100000000",
                "fee": "5.00",
                "to": "0x1234567890abcdef1234567890abcdef12345678",
                "status": "pending",
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
    value: withdrawals
securitySchemes: []

````