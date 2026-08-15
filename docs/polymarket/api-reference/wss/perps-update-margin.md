> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Isolated Margin

> Add or remove margin from an isolated Perps position over WebSocket.



## AsyncAPI

````yaml asyncapi-perps.json updateMargin
id: updateMargin
title: Update Isolated Margin
description: |
  Adjust the collateral allocated to an existing isolated position.
  Positive `amt` adds margin and negative `amt` removes it. A removal may
  include unrealized isolated profit, as long as the position's equity
  stays at or above its current required initial margin.

  The exchange rejects both additions and removals while the account is in
  cross liquidation or the target position is in isolated liquidation. An
  isolated liquidation on another instrument does not block the request,
  and neither does cancel-only mode.

  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
  Gateway validation rejects a stale or future-skewed timestamp as
  `invalid signature`. A request that passes the gateway can still be
  rejected with `invalid_margin_signature_timestamp` if its timestamp is no
  longer fresh when the exchange executes it. Reusing the exact signed
  request rejects with `signature_already_used`.

  <Badge color="gray" size="md">Action Weight: **1**</Badge>
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
    id: UpdateMarginSend
    title: Update margin send
    description: Update isolated margin
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Update Isolated Margin Request
            description: Client submits a signed isolated-margin adjustment
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
                      - updateMargin
                    required: true
                  - name: args
                    type: object
                    required: true
                    properties:
                      - name: iid
                        type: integer
                        description: Instrument ID
                        required: true
                      - name: amt
                        type: string
                        description: >-
                          Signed isolated-margin adjustment in the instrument
                          quote asset. Positive values add allocation; negative
                          values remove it.
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
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-183>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-184>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - updateMargin
                  x-parser-schema-id: <anonymous-schema-186>
                args:
                  type: object
                  required:
                    - iid
                    - amt
                  properties:
                    iid:
                      type: integer
                      description: Instrument ID
                      example: 1
                      x-parser-schema-id: <anonymous-schema-188>
                    amt:
                      type: string
                      description: >-
                        Signed isolated-margin adjustment in the instrument
                        quote asset. Positive values add allocation; negative
                        values remove it.
                      example: '100.00'
                      x-parser-schema-id: <anonymous-schema-189>
                  x-parser-schema-id: <anonymous-schema-187>
              x-parser-schema-id: <anonymous-schema-185>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-190>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-191>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-192>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-182>
        title: Update Isolated Margin Request
        description: Client submits a signed isolated-margin adjustment
        example: |-
          {
            "id": 7,
            "req": "post",
            "op": {
              "type": "updateMargin",
              "args": {
                "iid": 1,
                "amt": "100.00"
              }
            },
            "sig": "0x7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d1c",
            "salt": 444444444,
            "ts": 1767000013000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: updateMargin
  - &ref_2
    id: UpdateMarginReceive
    title: Update margin receive
    description: Update isolated margin response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Update Isolated Margin Response
            description: Server responds with the margin update result
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
              x-parser-schema-id: <anonymous-schema-194>
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
                        `margin_below_required_initial`, `account_liquidating`,
                        `unauthorized`, `not_found`. For `400` it is a
                        human-readable validation detail whose wording may
                        change. See the Error handling guide for the domain
                        identifiers. (Post-only / Fill-or-Kill outcomes are
                        order statuses such as `post_only_rejected`, not
                        rejections.)
                      example: insufficient_margin
                      x-parser-schema-id: <anonymous-schema-200>
                  x-parser-schema-id: <anonymous-schema-198>
              x-parser-schema-id: <anonymous-schema-195>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-193>
        title: Update Isolated Margin Response
        description: Server responds with the margin update result
        example: |-
          {
            "id": 7,
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
    value: updateMargin
securitySchemes: []

````