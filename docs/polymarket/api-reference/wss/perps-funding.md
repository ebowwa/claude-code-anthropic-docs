<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-funding.md
Downloaded: 2026-07-31T21:03:55.554Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Funding

> Perps WebSocket private funding updates.



## AsyncAPI

````yaml asyncapi-perps.json funding
id: funding
title: Funding
description: >-
  Real-time funding payment updates. Requires authentication, see
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
    id: FundingSubscribe
    title: Funding subscribe
    description: Subscribe to funding
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private funding payment updates (requires prior auth)
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
                description: 'Funding private channel: "funding"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - funding
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-513>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-514>
            chs:
              type: array
              description: 'Funding private channel: "funding"'
              items:
                type: string
                enum:
                  - funding
                x-parser-schema-id: <anonymous-schema-516>
              example:
                - funding
              x-parser-schema-id: <anonymous-schema-515>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-512>
        title: Subscribe
        description: Subscribe to private funding payment updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "funding"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: funding
  - &ref_3
    id: FundingSubscribeResponse
    title: Funding subscribe response
    description: Funding subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to funding subscribe request
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
              x-parser-schema-id: <anonymous-schema-518>
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
                        x-parser-schema-id: <anonymous-schema-522>
                    x-parser-schema-id: <anonymous-schema-521>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-524>
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
                        x-parser-schema-id: <anonymous-schema-525>
                    x-parser-schema-id: <anonymous-schema-523>
                x-parser-schema-id: <anonymous-schema-520>
              x-parser-schema-id: <anonymous-schema-519>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-517>
        title: Subscribe Response
        description: Response to funding subscribe request
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
    id: FundingUnsubscribe
    title: Funding unsubscribe
    description: Unsubscribe from funding
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private funding updates
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
                description: 'Funding private channel: "funding"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - funding
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-527>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-528>
            chs:
              type: array
              description: 'Funding private channel: "funding"'
              items:
                type: string
                enum:
                  - funding
                x-parser-schema-id: <anonymous-schema-530>
              example:
                - funding
              x-parser-schema-id: <anonymous-schema-529>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-526>
        title: Unsubscribe
        description: Unsubscribe from private funding updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "funding"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: FundingUnsubscribeResponse
    title: Funding unsubscribe response
    description: Funding unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to funding unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-532>
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
                        x-parser-schema-id: <anonymous-schema-536>
                    x-parser-schema-id: <anonymous-schema-535>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-538>
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
                        x-parser-schema-id: <anonymous-schema-539>
                    x-parser-schema-id: <anonymous-schema-537>
                x-parser-schema-id: <anonymous-schema-534>
              x-parser-schema-id: <anonymous-schema-533>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-531>
        title: Unsubscribe Response
        description: Response to funding unsubscribe request
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
    id: FundingUpdate
    title: Funding update
    description: Receive funding updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time funding payment updates for authenticated users
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
                description: Funding payment object (one update per charged instrument)
                required: true
                properties:
                  - name: id
                    type: integer
                    description: >-
                      Funding payment ID. Probabilistically unique (same
                      guarantees as trade IDs) and stable across REST and
                      WebSocket for the same funding record.
                    required: true
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: sz
                    type: string
                    description: >-
                      Signed position size in no. of contracts (positive = long,
                      negative = short)
                    required: true
                  - name: fr
                    type: string
                    description: Funding rate
                    required: true
                  - name: fund
                    type: string
                    description: Funding paid in USD
                    required: true
                  - name: fua
                    type: string
                    description: Funding asset name
                    required: true
                  - name: ts
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Funding Update
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
              x-parser-schema-id: <anonymous-schema-541>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-542>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-543>
            data:
              type: object
              description: Funding payment object (one update per charged instrument)
              properties:
                id:
                  type: integer
                  description: >-
                    Funding payment ID. Probabilistically unique (same
                    guarantees as trade IDs) and stable across REST and
                    WebSocket for the same funding record.
                  example: 1234567890
                  x-parser-schema-id: <anonymous-schema-545>
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-546>
                sz:
                  type: string
                  description: >-
                    Signed position size in no. of contracts (positive = long,
                    negative = short)
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-547>
                fr:
                  type: string
                  description: Funding rate
                  example: '0.0001'
                  x-parser-schema-id: <anonymous-schema-548>
                fund:
                  type: string
                  description: Funding paid in USD
                  example: '1.00'
                  x-parser-schema-id: <anonymous-schema-549>
                fua:
                  type: string
                  description: Funding asset name
                  example: USDC
                  x-parser-schema-id: <anonymous-schema-550>
                ts:
                  type: integer
                  description: >-
                    Request timestamp. Unix milliseconds for most operations;
                    Unix seconds for withdrawals (must match the on-chain
                    EIP-712 struct verified against block.timestamp).
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-551>
              required:
                - id
                - iid
                - sz
                - fr
                - fund
                - fua
                - ts
              x-parser-schema-id: <anonymous-schema-544>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-540>
        title: Update
        description: Real-time funding payment updates for authenticated users
        example: |-
          {
            "ch": "funding",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": {
              "id": 1234567890,
              "iid": 1,
              "sz": "10.00",
              "fr": "0.0001",
              "fund": "1.00",
              "fua": "USDC",
              "ts": 1767225600000
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
    value: funding
securitySchemes: []

````