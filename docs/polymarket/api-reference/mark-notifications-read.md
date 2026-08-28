> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Mark Notifications Read

> Mark notifications as read. Send a list of notification ids, or a before
cursor to mark everything up to and including that point. You can only
mark your own notifications.


<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json post /v1/account/notifications/read
openapi: 3.0.3
info:
  title: Polymarket Perps HTTP API
  version: 1.0.0
  description: HTTP API for Polymarket perpetual trading system.
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.perpetuals.polymarket.com
    description: Production Perps HTTP API
security: []
paths:
  /v1/account/notifications/read:
    post:
      summary: Mark Notifications Read
      description: |
        Mark notifications as read. Send a list of notification ids, or a before
        cursor to mark everything up to and including that point. You can only
        mark your own notifications.
      operationId: markAccountNotificationsRead
      requestBody:
        required: true
        description: The notifications to mark read.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NotificationsReadRequest'
            examples:
              byIds:
                summary: Mark specific ids read
                value:
                  ids:
                    - 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
              beforeCursor:
                summary: Mark everything up to a cursor read
                value:
                  before: >-
                    eyJ0cyI6MTc2NzIyNTYwMDAwMCwiaWQiOiIwYTVkOGYxZS0zYjJjLTVlNGEtOWY4Yi0xYzJkM2U0ZjVhNmIifQ
      responses:
        '200':
          description: Read markers accepted.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenericAccepted'
        '400':
          $ref: '#/components/responses/Error400Response'
        '401':
          $ref: '#/components/responses/Error401Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security:
        - polymarket_proxy: []
          polymarket_secret: []
components:
  schemas:
    NotificationsReadRequest:
      oneOf:
        - type: object
          required:
            - ids
          additionalProperties: false
          properties:
            ids:
              type: array
              description: Notification ids to mark read.
              items:
                $ref: '#/components/schemas/notif_id'
        - type: object
          required:
            - before
          additionalProperties: false
          properties:
            before:
              type: string
              description: >-
                Pagination cursor. Marks every notification at or before this
                point as read.
    GenericAccepted:
      type: object
      required:
        - status
      properties:
        status:
          type: string
          enum:
            - ok
    notif_id:
      type: string
      description: >-
        Stable notification id. The same notification always has the same id on
        the WebSocket feed and in the notifications history, so you can safely
        deduplicate across the two.
      example: 0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b
    Error400:
      title: Error400
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error401:
      title: Error401
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error429:
      title: Error429
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error500:
      title: Error500
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    error:
      type: string
      description: >-
        Error identifier. For domain rejections and transport errors
        (`401`/`404`/`429`/`500`) this is a stable, machine-readable snake_case
        identifier that is part of the API contract and safe to branch on, e.g.
        `insufficient_margin`, `insufficient_balance`, `order_not_found`,
        `reduce_only_invalid`, `price_outside_bounds`, `position_not_found`,
        `invalid_margin_mode`, `invalid_margin_amount`,
        `margin_below_required_initial`, `account_liquidating`, `unauthorized`,
        `not_found`. For `400` it is a human-readable validation detail whose
        wording may change. See the Error handling guide for the domain
        identifiers. (Post-only / Fill-or-Kill outcomes are order statuses such
        as `post_only_rejected`, not rejections.)
      example: insufficient_margin
  responses:
    Error400Response:
      description: |
        Bad request — the request was malformed or failed validation (bad query
        parameters, unparseable body, invalid signature, or a domain pre-check).
        The `error` field is a human-readable validation detail.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error400'
    Error401Response:
      description: >
        Unauthorized — missing or invalid `POLYMARKET-PROXY` /
        `POLYMARKET-SECRET`

        credentials. `error` is `unauthorized`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error401'
    Error429Response:
      description: >
        Too Many Requests. `error` distinguishes the limit that was hit:

        `ip_rate_limited` (per-IP token bucket), `action_rate_limited`
        (per-account

        action rate), or `open_orders_limit` (resting open-order cap).
      headers:
        Retry-After:
          description: >
            Whole seconds to wait before retrying. Present only on token-bucket

            rate-limit rejections (`ip_rate_limited` and `action_rate_limited`);
            a

            conservative estimate of when enough capacity will have refilled to

            admit the request. Absent on `open_orders_limit`, which is a
            capacity

            limit, not a rate limit — waiting does not free order slots; cancel

            resting orders or wait for fills instead.
          schema:
            type: integer
            example: 2
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error429'
    Error500Response:
      description: |
        Internal server error. `error` is `internal_error`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error500'
  securitySchemes:
    polymarket_proxy:
      type: apiKey
      name: POLYMARKET-PROXY
      in: header
      description: Proxy address
    polymarket_secret:
      type: apiKey
      name: POLYMARKET-SECRET
      in: header
      description: Correponding proxy secret

````