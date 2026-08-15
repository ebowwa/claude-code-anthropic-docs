> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Leverages

> Perps WebSocket batch leverage updates.



## AsyncAPI

````yaml asyncapi-perps.json updateLeverages
id: updateLeverages
title: Update Leverages
description: >
  Update leverage for up to 100 unique instruments. Updates are processed

  sequentially and are not atomic. If only some responses arrive before the

  gateway deadline, missing item results use `internal_error`; whether those

  updates applied is unknown. If no responses arrive, the request is rejected

  with `internal_error` instead.

  Requires proxy signature, see [Update
  Leverage](/perps/trading#update-leverage).


  <Badge color="gray" size="md">Action Weight: **1 / instrument**</Badge>
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
    id: UpdateLeveragesSend
    title: Update leverages send
    description: Update leverage for multiple instruments
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Update Leverages Request
            description: Client submits a signed batch leverage update request
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
                      - updateLeverages
                    required: true
                  - name: args
                    type: array
                    required: true
                    properties:
                      - name: iid
                        type: integer
                        description: Instrument ID
                        required: true
                      - name: lev
                        type: integer
                        description: Leverage
                        required: true
                      - name: cross
                        type: boolean
                        description: Whether to use cross margin mode
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
              x-parser-schema-id: <anonymous-schema-153>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-154>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - updateLeverages
                  x-parser-schema-id: <anonymous-schema-156>
                args:
                  type: array
                  minItems: 1
                  maxItems: 100
                  items:
                    type: object
                    required:
                      - iid
                      - lev
                      - cross
                    properties:
                      iid:
                        type: integer
                        description: Instrument ID
                        example: 1
                        x-parser-schema-id: <anonymous-schema-159>
                      lev:
                        type: integer
                        description: Leverage
                        example: 10
                        x-parser-schema-id: <anonymous-schema-160>
                      cross:
                        type: boolean
                        description: Whether to use cross margin mode
                        x-parser-schema-id: <anonymous-schema-161>
                    x-parser-schema-id: <anonymous-schema-158>
                  x-parser-schema-id: <anonymous-schema-157>
              x-parser-schema-id: <anonymous-schema-155>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-162>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-163>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-164>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-152>
        title: Update Leverages Request
        description: Client submits a signed batch leverage update request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "updateLeverages",
              "args": [
                {
                  "iid": 1,
                  "lev": 10,
                  "cross": true
                }
              ]
            },
            "sig": "0x1234567890...",
            "salt": 1234567890,
            "ts": 1767225600000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: updateLeverages
  - &ref_2
    id: UpdateLeveragesReceive
    title: Update leverages receive
    description: Batch leverage update response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Update Leverages Response
            description: Server responds with an ordered result for each instrument
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                description: |
                  Ordered per-instrument results. A request-level failure is
                  returned as a single rejected item without an instrument id.
                required: true
                properties:
                  - name: item
                    type: object
                    required: false
                    properties:
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
              x-parser-schema-id: <anonymous-schema-166>
            data:
              type: array
              description: |
                Ordered per-instrument results. A request-level failure is
                returned as a single rejected item without an instrument id.
              items:
                anyOf:
                  - oneOf:
                      - description: >-
                          The instrument's effective leverage configuration
                          after the update.
                        type: object
                        required:
                          - status
                          - instrument_id
                          - leverage
                          - cross
                        properties:
                          status:
                            type: string
                            enum:
                              - ok
                            x-parser-schema-id: <anonymous-schema-171>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            example: 1
                            x-parser-schema-id: <anonymous-schema-172>
                          leverage:
                            type: integer
                            description: Leverage
                            example: 10
                            x-parser-schema-id: <anonymous-schema-173>
                          cross:
                            type: boolean
                            description: Whether to use cross margin mode
                            x-parser-schema-id: <anonymous-schema-174>
                        x-parser-schema-id: <anonymous-schema-170>
                      - type: object
                        required:
                          - status
                          - instrument_id
                          - error
                        properties:
                          status:
                            type: string
                            enum:
                              - err
                            x-parser-schema-id: <anonymous-schema-176>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            example: 1
                            x-parser-schema-id: <anonymous-schema-177>
                          error:
                            type: string
                            description: >-
                              Error identifier. For domain rejections and
                              transport errors (`401`/`404`/`429`/`500`) this is
                              a stable, machine-readable snake_case identifier
                              that is part of the API contract and safe to
                              branch on, e.g. `insufficient_margin`,
                              `insufficient_balance`, `order_not_found`,
                              `reduce_only_invalid`, `price_outside_bounds`,
                              `position_not_found`, `invalid_margin_mode`,
                              `invalid_margin_amount`,
                              `margin_below_required_initial`,
                              `account_liquidating`, `unauthorized`,
                              `not_found`. For `400` it is a human-readable
                              validation detail whose wording may change. See
                              the Error handling guide for the domain
                              identifiers. (Post-only / Fill-or-Kill outcomes
                              are order statuses such as `post_only_rejected`,
                              not rejections.)
                            example: insufficient_margin
                            x-parser-schema-id: <anonymous-schema-178>
                        x-parser-schema-id: <anonymous-schema-175>
                    x-parser-schema-id: <anonymous-schema-169>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-180>
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
                        x-parser-schema-id: <anonymous-schema-181>
                    x-parser-schema-id: <anonymous-schema-179>
                x-parser-schema-id: <anonymous-schema-168>
              x-parser-schema-id: <anonymous-schema-167>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-165>
        title: Update Leverages Response
        description: Server responds with an ordered result for each instrument
        example: |-
          {
            "id": 7,
            "data": [
              {
                "status": "ok",
                "instrument_id": 1,
                "leverage": 5,
                "cross": false
              },
              {
                "status": "err",
                "instrument_id": 2,
                "error": "insufficient_margin"
              }
            ]
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
    value: updateLeverages
securitySchemes: []

````