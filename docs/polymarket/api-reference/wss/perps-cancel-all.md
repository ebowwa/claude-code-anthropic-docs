> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel All Orders

> Perps WebSocket cancellation of all open orders.



## AsyncAPI

````yaml asyncapi-perps.json cancelAll
id: cancelAll
title: Cancel All Orders
description: |
  Cancel all open orders for the authenticated account, optionally scoped to
  one instrument.
  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).

  <Badge color="gray" size="md">Action Weight: **0**</Badge>
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
    id: CancelAllSend
    title: Cancel all send
    description: Cancel all open orders
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Cancel All Orders Request
            description: Client submits a signed cancel-all request
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
                      - cancelAll
                    required: true
                  - name: args
                    type: object
                    description: >
                      Optional cancel scope. When `iid` is provided, only open
                      orders for

                      that instrument are canceled. When omitted, all open
                      orders for the

                      signing account are canceled.
                    required: true
                    properties:
                      - name: iid
                        type: integer
                        description: Instrument ID
                        required: false
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
              x-parser-schema-id: <anonymous-schema-96>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-97>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - cancelAll
                  x-parser-schema-id: <anonymous-schema-99>
                args:
                  type: object
                  description: >
                    Optional cancel scope. When `iid` is provided, only open
                    orders for

                    that instrument are canceled. When omitted, all open orders
                    for the

                    signing account are canceled.
                  properties:
                    iid:
                      type: integer
                      description: Instrument ID
                      example: 1
                      x-parser-schema-id: <anonymous-schema-101>
                  x-parser-schema-id: <anonymous-schema-100>
              x-parser-schema-id: <anonymous-schema-98>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-102>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-103>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-104>
            exp:
              type: integer
              description: >-
                Command expiry timestamp in Unix milliseconds. If provided, it
                must be in the future and within the gateway's default command
                timeout. It can shorten request validity but cannot extend it.
                This is not an order auto-cancel time.
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-105>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-95>
        title: Cancel All Orders Request
        description: Client submits a signed cancel-all request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "cancelAll",
              "args": {
                "iid": 1
              }
            },
            "sig": "0x1234567890...",
            "salt": 1234567890,
            "ts": 1767225600000,
            "exp": 1767225600000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: cancelAll
  - &ref_2
    id: CancelAllReceive
    title: Cancel all receive
    description: Cancel all orders response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Cancel All Orders Response
            description: Server responds with the cancel-all result
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: object
                required: true
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
                      machine-readable snake_case identifier that is part of the
                      API contract and safe to branch on, e.g.
                      `insufficient_margin`, `insufficient_balance`,
                      `order_not_found`, `reduce_only_invalid`,
                      `price_outside_bounds`, `position_not_found`,
                      `invalid_margin_mode`, `invalid_margin_amount`,
                      `margin_below_required_initial`, `account_liquidating`,
                      `unauthorized`, `not_found`. For `400` it is a
                      human-readable validation detail whose wording may change.
                      See the Error handling guide for the domain identifiers.
                      (Post-only / Fill-or-Kill outcomes are order statuses such
                      as `post_only_rejected`, not rejections.)
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-107>
            data:
              oneOf:
                - type: object
                  required:
                    - status
                  properties:
                    status:
                      type: string
                      enum:
                        - ok
                      x-parser-schema-id: <anonymous-schema-110>
                  x-parser-schema-id: <anonymous-schema-109>
                - type: object
                  required:
                    - status
                    - error
                  properties:
                    status:
                      type: string
                      enum:
                        - err
                      x-parser-schema-id: <anonymous-schema-112>
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
                        `margin_below_required_initial`, `account_liquidating`,
                        `unauthorized`, `not_found`. For `400` it is a
                        human-readable validation detail whose wording may
                        change. See the Error handling guide for the domain
                        identifiers. (Post-only / Fill-or-Kill outcomes are
                        order statuses such as `post_only_rejected`, not
                        rejections.)
                      example: insufficient_margin
                      x-parser-schema-id: <anonymous-schema-113>
                  x-parser-schema-id: <anonymous-schema-111>
              x-parser-schema-id: <anonymous-schema-108>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-106>
        title: Cancel All Orders Response
        description: Server responds with the cancel-all result
        example: |-
          {
            "id": 5,
            "data": {
              "status": "ok"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Response
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
    value: cancelAll
securitySchemes: []

````