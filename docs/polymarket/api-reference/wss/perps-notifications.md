<!--
Source: https://docs.polymarket.com/api-reference/wss/perps-notifications.md
Downloaded: 2026-08-10T20:41:52.066Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Notifications

> Perps WebSocket private notification updates.



## AsyncAPI

````yaml asyncapi-perps.json notifications
id: notifications
title: Notifications
description: >-
  Real-time perps notifications for the in-app bell. Requires authentication,
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
  - &ref_2
    id: NotificationsSubscribe
    title: Notifications subscribe
    description: Subscribe to notifications
    type: receive
    messages:
      - &ref_7
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private perps notifications (requires prior auth)
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
                description: 'Notifications private channel: "notifications"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - notifications
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-798>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-799>
            chs:
              type: array
              description: 'Notifications private channel: "notifications"'
              items:
                type: string
                enum:
                  - notifications
                x-parser-schema-id: <anonymous-schema-801>
              example:
                - notifications
              x-parser-schema-id: <anonymous-schema-800>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-797>
        title: Subscribe
        description: Subscribe to private perps notifications (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "notifications"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: notifications
  - &ref_4
    id: NotificationsSubscribeResponse
    title: Notifications subscribe response
    description: Notifications subscribe response
    type: send
    messages:
      - &ref_9
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to notifications subscribe request
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
              x-parser-schema-id: <anonymous-schema-803>
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
                        x-parser-schema-id: <anonymous-schema-807>
                    x-parser-schema-id: <anonymous-schema-806>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-809>
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
                        x-parser-schema-id: <anonymous-schema-810>
                    x-parser-schema-id: <anonymous-schema-808>
                x-parser-schema-id: <anonymous-schema-805>
              x-parser-schema-id: <anonymous-schema-804>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-802>
        title: Subscribe Response
        description: Response to notifications subscribe request
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
  - &ref_3
    id: NotificationsUnsubscribe
    title: Notifications unsubscribe
    description: Unsubscribe from notifications
    type: receive
    messages:
      - &ref_8
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private perps notifications
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
                description: 'Notifications private channel: "notifications"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - notifications
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-812>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-813>
            chs:
              type: array
              description: 'Notifications private channel: "notifications"'
              items:
                type: string
                enum:
                  - notifications
                x-parser-schema-id: <anonymous-schema-815>
              example:
                - notifications
              x-parser-schema-id: <anonymous-schema-814>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-811>
        title: Unsubscribe
        description: Unsubscribe from private perps notifications
        example: |-
          {
            "req": "unsub",
            "chs": [
              "notifications"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_5
    id: NotificationsUnsubscribeResponse
    title: Notifications unsubscribe response
    description: Notifications unsubscribe response
    type: send
    messages:
      - &ref_10
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to notifications unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-817>
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
                        x-parser-schema-id: <anonymous-schema-821>
                    x-parser-schema-id: <anonymous-schema-820>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-823>
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
                        x-parser-schema-id: <anonymous-schema-824>
                    x-parser-schema-id: <anonymous-schema-822>
                x-parser-schema-id: <anonymous-schema-819>
              x-parser-schema-id: <anonymous-schema-818>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-816>
        title: Unsubscribe Response
        description: Response to notifications unsubscribe request
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
  - &ref_6
    id: NotificationsUpdate
    title: Notifications update
    description: Receive notification updates
    type: send
    messages:
      - &ref_11
        id: Update
        contentType: application/json
        payload:
          - oneOf: &ref_1
              - type: object
                title: Base Update
                properties:
                  ch:
                    const: notifications
                    x-parser-schema-id: <anonymous-schema-827>
                  ts:
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    example: 1767225600000
                    x-parser-schema-id: <anonymous-schema-828>
                  sq:
                    type: integer
                    description: Sequence number
                    example: 1234567890
                    x-parser-schema-id: <anonymous-schema-829>
                  data:
                    oneOf:
                      - type: object
                        properties:
                          id:
                            type: string
                            description: >-
                              Stable notification id. The same notification
                              always has the same id on the WebSocket feed and
                              in the notifications history, so you can safely
                              deduplicate across the two.
                            example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                            x-parser-schema-id: <anonymous-schema-832>
                          type:
                            type: string
                            enum:
                              - position_opened
                              - position_increased
                              - position_reduced
                            x-parser-schema-id: <anonymous-schema-833>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            x-parser-schema-id: <anonymous-schema-834>
                          side:
                            type: string
                            description: Side
                            enum:
                              - long
                              - short
                            x-parser-schema-id: <anonymous-schema-835>
                          size:
                            type: string
                            description: Quantity in no. of contracts
                            example: '10.00'
                            x-parser-schema-id: <anonymous-schema-836>
                          avg_price:
                            type: string
                            description: Volume-weighted average fill price in USD
                            example: '64210'
                            x-parser-schema-id: <anonymous-schema-837>
                          leverage:
                            type: integer
                            description: Leverage
                            example: 10
                            x-parser-schema-id: <anonymous-schema-838>
                          order_type:
                            type: string
                            description: >-
                              Kind of order whose execution produced this
                              notification, decided by the account's own order
                              in the fill. A TP/SL-triggered order reports the
                              trigger that fired it (take_profit / stop_loss)
                              whether it aggressed or rested; otherwise an
                              aggressor submitted without a limit price is
                              market and everything else — including a maker's
                              resting order — is limit. Optional — omitted when
                              the deriver cannot attribute the fill to an order
                              (e.g. a consumer restarted inside the
                              trigger-to-fill window).
                            enum:
                              - market
                              - limit
                              - take_profit
                              - stop_loss
                            x-parser-schema-id: <anonymous-schema-839>
                          fill_qty:
                            type: string
                            description: >-
                              Quantity filled in this event, in no. of
                              contracts. When the account has more than one fill
                              in the event, this is their combined quantity.
                              Always a positive decimal string.
                            example: '0.05'
                            x-parser-schema-id: <anonymous-schema-840>
                          order_qty:
                            type: string
                            description: >-
                              Original total quantity of the account's own order
                              that produced the fill, in no. of contracts.
                              Optional: omitted when the deriver cannot resolve
                              the order, or when the account's fills in this
                              event span multiple of its own orders (fill_qty
                              then combines quantities across orders, so no
                              single original quantity applies). order_qty can
                              be present while order_type is absent, because
                              order_type is also omitted when a triggered
                              order's conditional cannot be classified.
                            example: '0.10'
                            x-parser-schema-id: <anonymous-schema-841>
                        required:
                          - id
                          - type
                          - instrument_id
                          - side
                          - size
                          - avg_price
                          - leverage
                          - fill_qty
                        x-parser-schema-id: <anonymous-schema-831>
                      - type: object
                        properties:
                          id:
                            type: string
                            description: >-
                              Stable notification id. The same notification
                              always has the same id on the WebSocket feed and
                              in the notifications history, so you can safely
                              deduplicate across the two.
                            example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                            x-parser-schema-id: <anonymous-schema-843>
                          type:
                            type: string
                            const: position_closed
                            x-parser-schema-id: <anonymous-schema-844>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            x-parser-schema-id: <anonymous-schema-845>
                          side:
                            type: string
                            description: Side
                            enum:
                              - long
                              - short
                            x-parser-schema-id: <anonymous-schema-846>
                          size:
                            type: string
                            description: Quantity in no. of contracts
                            example: '10.00'
                            x-parser-schema-id: <anonymous-schema-847>
                          avg_price:
                            type: string
                            description: Volume-weighted average fill price in USD
                            example: '64210'
                            x-parser-schema-id: <anonymous-schema-848>
                          pnl:
                            type: string
                            description: PnL in USD
                            example: '100.00'
                            x-parser-schema-id: <anonymous-schema-849>
                          order_type:
                            type: string
                            description: >-
                              Kind of order whose execution produced this
                              notification, decided by the account's own order
                              in the fill. A TP/SL-triggered order reports the
                              trigger that fired it (take_profit / stop_loss)
                              whether it aggressed or rested; otherwise an
                              aggressor submitted without a limit price is
                              market and everything else — including a maker's
                              resting order — is limit. Optional — omitted when
                              the deriver cannot attribute the fill to an order
                              (e.g. a consumer restarted inside the
                              trigger-to-fill window).
                            enum:
                              - market
                              - limit
                              - take_profit
                              - stop_loss
                            x-parser-schema-id: <anonymous-schema-850>
                          fill_qty:
                            type: string
                            description: >-
                              Quantity filled in this event, in no. of
                              contracts. When the account has more than one fill
                              in the event, this is their combined quantity.
                              Always a positive decimal string.
                            example: '0.05'
                            x-parser-schema-id: <anonymous-schema-851>
                          order_qty:
                            type: string
                            description: >-
                              Original total quantity of the account's own order
                              that produced the fill, in no. of contracts.
                              Optional: omitted when the deriver cannot resolve
                              the order, or when the account's fills in this
                              event span multiple of its own orders (fill_qty
                              then combines quantities across orders, so no
                              single original quantity applies). order_qty can
                              be present while order_type is absent, because
                              order_type is also omitted when a triggered
                              order's conditional cannot be classified.
                            example: '0.10'
                            x-parser-schema-id: <anonymous-schema-852>
                        required:
                          - id
                          - type
                          - instrument_id
                          - side
                          - size
                          - avg_price
                          - pnl
                          - fill_qty
                        x-parser-schema-id: <anonymous-schema-842>
                      - type: object
                        properties:
                          id:
                            type: string
                            description: >-
                              Stable notification id. The same notification
                              always has the same id on the WebSocket feed and
                              in the notifications history, so you can safely
                              deduplicate across the two.
                            example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                            x-parser-schema-id: <anonymous-schema-854>
                          type:
                            type: string
                            const: limit_order_canceled
                            x-parser-schema-id: <anonymous-schema-855>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            x-parser-schema-id: <anonymous-schema-856>
                          side:
                            type: string
                            description: Side
                            enum:
                              - long
                              - short
                            x-parser-schema-id: <anonymous-schema-857>
                          size:
                            type: string
                            description: Quantity in no. of contracts
                            example: '10.00'
                            x-parser-schema-id: <anonymous-schema-858>
                          price:
                            type: string
                            description: Price
                            example: '100.00'
                            x-parser-schema-id: <anonymous-schema-859>
                        required:
                          - id
                          - type
                          - instrument_id
                          - side
                          - size
                          - price
                        x-parser-schema-id: <anonymous-schema-853>
                      - oneOf:
                          - type: object
                            properties:
                              id:
                                type: string
                                description: >-
                                  Stable notification id. The same notification
                                  always has the same id on the WebSocket feed
                                  and in the notifications history, so you can
                                  safely deduplicate across the two.
                                example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                                x-parser-schema-id: <anonymous-schema-862>
                              type:
                                type: string
                                const: liquidation_warning
                                x-parser-schema-id: <anonymous-schema-863>
                              instrument_id:
                                type: integer
                                description: Instrument ID
                                x-parser-schema-id: <anonymous-schema-864>
                              margin_type:
                                type: string
                                const: isolated
                                x-parser-schema-id: <anonymous-schema-865>
                              mark_price:
                                type: string
                                description: Mark price
                                example: '100.00'
                                x-parser-schema-id: <anonymous-schema-866>
                              liq_price:
                                type: string
                                description: Liquidation price
                                example: '2866.27'
                                x-parser-schema-id: <anonymous-schema-867>
                            required:
                              - id
                              - type
                              - instrument_id
                              - margin_type
                              - mark_price
                              - liq_price
                            not:
                              required:
                                - affected_instruments
                              x-parser-schema-id: <anonymous-schema-868>
                            x-parser-schema-id: <anonymous-schema-861>
                          - type: object
                            properties:
                              id:
                                type: string
                                description: >-
                                  Stable notification id. The same notification
                                  always has the same id on the WebSocket feed
                                  and in the notifications history, so you can
                                  safely deduplicate across the two.
                                example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                                x-parser-schema-id: <anonymous-schema-870>
                              type:
                                type: string
                                const: liquidation_warning
                                x-parser-schema-id: <anonymous-schema-871>
                              instrument_id:
                                type: 'null'
                                x-parser-schema-id: <anonymous-schema-872>
                              margin_type:
                                type: string
                                const: cross
                                x-parser-schema-id: <anonymous-schema-873>
                              mark_price:
                                type: string
                                description: Mark price
                                example: '100.00'
                                x-parser-schema-id: <anonymous-schema-874>
                              affected_instruments:
                                type: array
                                description: >-
                                  Instrument ids contributing to a cross-margin
                                  liquidation warning
                                items:
                                  type: integer
                                  x-parser-schema-id: <anonymous-schema-876>
                                example:
                                  - 42
                                  - 7
                                x-parser-schema-id: <anonymous-schema-875>
                            required:
                              - id
                              - type
                              - instrument_id
                              - margin_type
                              - mark_price
                              - affected_instruments
                            not:
                              required:
                                - liq_price
                              x-parser-schema-id: <anonymous-schema-877>
                            x-parser-schema-id: <anonymous-schema-869>
                        x-parser-schema-id: <anonymous-schema-860>
                      - type: object
                        properties:
                          id:
                            type: string
                            description: >-
                              Stable notification id. The same notification
                              always has the same id on the WebSocket feed and
                              in the notifications history, so you can safely
                              deduplicate across the two.
                            example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                            x-parser-schema-id: <anonymous-schema-879>
                          type:
                            type: string
                            const: position_liquidated
                            x-parser-schema-id: <anonymous-schema-880>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            x-parser-schema-id: <anonymous-schema-881>
                          side:
                            type: string
                            description: Side
                            enum:
                              - long
                              - short
                            x-parser-schema-id: <anonymous-schema-882>
                          size_closed:
                            type: string
                            description: Position size closed by a liquidation (base units)
                            example: '0.05'
                            x-parser-schema-id: <anonymous-schema-883>
                          pnl:
                            type:
                              - string
                              - 'null'
                            description: >-
                              Realized PnL in USD; null when not available (e.g.
                              a backstop close with no fill)
                            example: '290.00'
                            x-parser-schema-id: <anonymous-schema-884>
                          margin_type:
                            type: string
                            description: Margin mode
                            enum:
                              - cross
                              - isolated
                            x-parser-schema-id: <anonymous-schema-885>
                          via_backstop:
                            type: boolean
                            description: >-
                              Whether an insurance-fund backstop applied to the
                              liquidation
                            example: false
                            x-parser-schema-id: <anonymous-schema-886>
                        required:
                          - id
                          - type
                          - instrument_id
                          - side
                          - size_closed
                          - pnl
                          - margin_type
                          - via_backstop
                        x-parser-schema-id: <anonymous-schema-878>
                      - type: object
                        properties:
                          id:
                            type: string
                            description: >-
                              Stable notification id. The same notification
                              always has the same id on the WebSocket feed and
                              in the notifications history, so you can safely
                              deduplicate across the two.
                            example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
                            x-parser-schema-id: <anonymous-schema-888>
                          type:
                            type: string
                            const: position_deleveraged
                            x-parser-schema-id: <anonymous-schema-889>
                          instrument_id:
                            type: integer
                            description: Instrument ID
                            x-parser-schema-id: <anonymous-schema-890>
                          side:
                            type: string
                            description: Side
                            enum:
                              - long
                              - short
                            x-parser-schema-id: <anonymous-schema-891>
                          size_closed:
                            type: string
                            description: >-
                              Position size closed by auto-deleveraging (base
                              units)
                            example: '0.05'
                            x-parser-schema-id: <anonymous-schema-892>
                          price:
                            type: string
                            description: Price
                            example: '100.00'
                            x-parser-schema-id: <anonymous-schema-893>
                          pnl:
                            type: string
                            description: PnL in USD
                            example: '100.00'
                            x-parser-schema-id: <anonymous-schema-894>
                          margin_type:
                            type: string
                            description: Margin mode
                            enum:
                              - cross
                              - isolated
                            x-parser-schema-id: <anonymous-schema-895>
                        required:
                          - id
                          - type
                          - instrument_id
                          - side
                          - size_closed
                          - price
                          - pnl
                          - margin_type
                        x-parser-schema-id: <anonymous-schema-887>
                    x-parser-schema-id: <anonymous-schema-830>
                required:
                  - ch
                  - ts
                  - sq
                  - data
                x-parser-schema-id: <anonymous-schema-826>
              - description: >-
                  Resync control frame sent when the connection falls behind and
                  the server drops one or more data frames. Its sq is the
                  highest sequence among the dropped notifications. To recover,
                  backfill from the REST notifications history anchored at the
                  last data frame you processed, and keep paging until the
                  returned durable_source_seq reaches this sq and no more pages
                  remain.
                type: object
                title: Base Update
                properties:
                  ch:
                    const: notifications
                    x-parser-schema-id: <anonymous-schema-897>
                  ts:
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    example: 1767225600000
                    x-parser-schema-id: <anonymous-schema-898>
                  sq:
                    type: integer
                    description: Sequence number
                    example: 1234567890
                    x-parser-schema-id: <anonymous-schema-899>
                  type:
                    const: resync
                    x-parser-schema-id: <anonymous-schema-900>
                required:
                  - ch
                  - ts
                  - sq
                  - type
                not:
                  required:
                    - data
                  x-parser-schema-id: <anonymous-schema-901>
                x-parser-schema-id: <anonymous-schema-896>
            x-parser-schema-id: <anonymous-schema-825>
            name: Update
            description: >-
              Real-time perps notification frame (data or resync) for
              authenticated users
        headers: []
        jsonPayloadSchema:
          oneOf: *ref_1
          x-parser-schema-id: <anonymous-schema-825>
        title: Update
        description: >-
          Real-time perps notification frame (data or resync) for authenticated
          users
        example: '{}'
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Update
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_2
  - *ref_3
receiveOperations:
  - *ref_4
  - *ref_5
  - *ref_6
sendMessages:
  - *ref_7
  - *ref_8
receiveMessages:
  - *ref_9
  - *ref_10
  - *ref_11
extensions:
  - id: x-parser-unique-object-id
    value: notifications
securitySchemes: []

````