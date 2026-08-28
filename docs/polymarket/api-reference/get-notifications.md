> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Notifications

> Get the authenticated account's notifications, newest first.

Results come in pages. Pass the cursor returned by the previous page to
fetch the next, older one. If your WebSocket connection dropped or you
received a resync frame, pass since_seq to backfill anything you may have
missed; the same notification can show up again at the edges of the
window, so deduplicate by id. While paging through a backfill, keep
sending the same since_seq with each cursor so every page stays inside
the same window.

The response also includes your unread count and durable_source_seq, which
tells you how far the notification store has caught up. If a backfill has
not yet reached your target sequence, wait briefly and retry with the same
since_seq.


<Badge color="gray" size="md">Request Weight: **10**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/notifications
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
  /v1/account/notifications:
    get:
      summary: Get Notifications
      description: >
        Get the authenticated account's notifications, newest first.


        Results come in pages. Pass the cursor returned by the previous page to

        fetch the next, older one. If your WebSocket connection dropped or you

        received a resync frame, pass since_seq to backfill anything you may
        have

        missed; the same notification can show up again at the edges of the

        window, so deduplicate by id. While paging through a backfill, keep

        sending the same since_seq with each cursor so every page stays inside

        the same window.


        The response also includes your unread count and durable_source_seq,
        which

        tells you how far the notification store has caught up. If a backfill
        has

        not yet reached your target sequence, wait briefly and retry with the
        same

        since_seq.
      operationId: getAccountNotifications
      parameters:
        - name: cursor
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/notif_cursor'
        - name: since_seq
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/since_seq'
        - name: limit
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/limit'
      responses:
        '200':
          description: Notifications page.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotificationsResponse'
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
    notif_cursor:
      type: string
      nullable: true
      description: >-
        Opaque pagination cursor. Pass the next_cursor value from the previous
        page to fetch the next, older page. Null when there are no more pages.
      example: >-
        eyJ0cyI6MTc2NzIyNTYwMDAwMCwiaWQiOiIwYTVkOGYxZS0zYjJjLTVlNGEtOWY4Yi0xYzJkM2U0ZjVhNmIifQ
    since_seq:
      type: integer
      description: >-
        Backfill anchor for gap recovery. Pass the sequence number (sq) of the
        last notifications data frame you processed before the gap, never the sq
        of a resync frame. The bound is inclusive, so the response repeats the
        boundary event in full; deduplicate by notification id.
      example: 1043
    limit:
      type: integer
      description: Maximum number of entries to return
      example: 100
    NotificationsResponse:
      type: object
      required:
        - items
        - unread
        - durable_source_seq
        - has_more
        - next_cursor
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/NotificationItem'
        unread:
          $ref: '#/components/schemas/unread'
        durable_source_seq:
          $ref: '#/components/schemas/durable_source_seq'
        has_more:
          type: boolean
          description: Whether older notifications exist beyond this page.
        next_cursor:
          $ref: '#/components/schemas/notif_cursor'
    NotificationItem:
      type: object
      required:
        - notification
        - read_at
        - ts
      properties:
        notification:
          type: object
          description: >-
            The notification payload. Fields vary by notification type; see the
            [Notifications channel](/api-reference/wss/perps-notifications) for
            the per-type shapes.
        read_at:
          $ref: '#/components/schemas/read_at'
        ts:
          $ref: '#/components/schemas/ts'
    unread:
      type: integer
      description: >-
        Count of the authenticated owner's unread notifications within the
        retention window.
      example: 3
    durable_source_seq:
      type: integer
      description: >-
        Highest notification sequence the store has persisted for your account.
        If it is still below the sequence you are catching up to, the store is
        lagging; retry the backfill until it catches up.
      example: 1043
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
    read_at:
      type: integer
      nullable: true
      description: >-
        When the recipient marked this notification read, Unix milliseconds;
        null if unread.
      example: 1767225600000
    ts:
      type: integer
      description: >-
        Request timestamp. Unix milliseconds for most operations; Unix seconds
        for withdrawals (must match the on-chain EIP-712 struct verified against
        block.timestamp).
      example: 1767225600000
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