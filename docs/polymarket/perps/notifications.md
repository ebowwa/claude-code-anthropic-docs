<!--
Source: https://docs.polymarket.com/perps/notifications.md
Downloaded: 2026-08-10T20:41:52.046Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Notifications

> Show Perps account activity as an in-app notification feed

Notifications turn a Perps account's activity into a ready-to-display feed of
position changes, canceled orders, and liquidation events. They are the same
events that drive the notification bell in the Polymarket app.

Read recent notifications to render the feed, then stream the live channel to
keep it fresh. Mark notifications read as the user catches up. Notifications
summarize activity for display. To reconcile order, fill, and position state,
use [Reconcile Trade State](/perps/trading#reconcile-trade-state) instead.

<Note>
  Notifications require an [authenticated
  session](/perps/authenticated-sessions).
</Note>

## Read Notifications

Start with a read to render the feed. It returns the account's notifications
newest first, together with the unread count for the badge.

<Tabs>
  <Tab title="TypeScript">
    Fetch the first page of notifications.

    ```ts theme={null}
    const page = await session.listNotifications().firstPage();
    // page.items: PerpsNotificationEntry[]
    ```

    Each entry pairs one notification with its read state, and `readAt` stays
    `null` until the notification is marked read. The read is paginated, so iterate
    it to walk older history.

    ```ts theme={null}
    for await (const page of session.listNotifications()) {
      // page.items: PerpsNotificationEntry[]
    }
    ```

    For the unread badge, fetch the count directly.

    ```ts theme={null}
    const unread = await session.fetchUnreadNotificationsCount();
    ```

    <Accordion title="Output: PerpsNotificationEntry[]">
      <CodeGroup>
        ```ts Type theme={null}
        type PerpsNotificationEntry = {
          notification: PerpsNotification;
          readAt: number | null;
          timestamp: number;
        };
        ```

        ```json Example theme={null}
        [
          {
            "notification": {
              "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
              "type": "position_opened",
              "instrumentId": 1,
              "side": "long",
              "size": "0.01",
              "avgPrice": "65000",
              "leverage": 5,
              "orderType": "market"
            },
            "readAt": null,
            "timestamp": 1767225600000
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Fetch the first page of notifications.

    ```python theme={null}
    page = await session.list_notifications().first_page()
    # page.items: tuple[PerpsNotificationEntry, ...]
    # page.unread: int
    ```

    Each entry pairs one notification with its read state, and `read_at` stays
    `None` until the notification is marked read. The page also carries the
    account's `unread` count for the badge. The read is paginated, so iterate it to
    walk older history.

    ```python theme={null}
    async for page in session.list_notifications():
        # page.items: tuple[PerpsNotificationEntry, ...]
        pass
    ```

    <Accordion title="Output: tuple[PerpsNotificationEntry, ...]">
      ```json theme={null}
      [
        {
          "notification": {
            "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
            "type": "position_opened",
            "instrument_id": 1,
            "side": "long",
            "size": "0.01",
            "avg_price": "65000",
            "leverage": 5,
            "order_type": "market"
          },
          "read_at": null,
          "timestamp": 1767225600000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch the account's notifications, newest first.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/notifications" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "limit=50"
    ```

    Each item pairs one notification with its read state, and `read_at` stays
    `null` until the notification is marked read. `unread` counts the account's
    unread notifications. While `has_more` is true, pass `next_cursor` back as
    `cursor` to fetch the next, older page.

    <Accordion title="Output: Notifications">
      ```json theme={null}
      {
        "items": [
          {
            "notification": {
              "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
              "type": "position_opened",
              "instrument_id": 1,
              "side": "long",
              "size": "0.01",
              "avg_price": "65000",
              "leverage": 5,
              "order_type": "market"
            },
            "read_at": null,
            "ts": 1767225600000
          }
        ],
        "unread": 3,
        "durable_source_seq": 1234567890,
        "has_more": true,
        "next_cursor": "eyJ0cyI6MTc2NzIyNTYwMDAwMCwiaWQiOiIwYTVkOGYxZS0zYjJjLTVlNGEtOWY4Yi0xYzJkM2U0ZjVhNmIifQ"
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

## Stream Notifications

Subscribe to the live channel to append new notifications and bump the unread
badge without polling.

<Tabs>
  <Tab title="TypeScript">
    Notification events arrive on the session stream alongside the other private
    session updates.

    ```ts theme={null}
    for await (const event of session) {
      if (event.type === "notification") {
        // event.payload: PerpsNotification
      }
    }
    ```

    The stream yields `PerpsNotificationUpdateEvent` objects like this.

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsNotificationUpdateEvent = {
        type: "notification";
        channel: "notifications";
        timestamp: number;
        sequence: number;
        payload: PerpsNotification;
      };
      ```

      ```json Example theme={null}
      {
        "type": "notification",
        "channel": "notifications",
        "timestamp": 1767225600000,
        "sequence": 1234567890,
        "payload": {
          "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
          "type": "position_opened",
          "instrumentId": 1,
          "side": "long",
          "size": "0.01",
          "avgPrice": "65000",
          "leverage": 5,
          "orderType": "market"
        }
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Notification events arrive on the session stream alongside the other private
    session updates.

    ```python theme={null}
    async for event in session:
        if event.type == "notification":
            # event.payload: PerpsNotification
            pass
    ```

    The stream yields `PerpsNotificationEvent` objects like this.

    ```json Example theme={null}
    {
      "type": "notification",
      "channel": "notifications",
      "timestamp": 1767225600000,
      "sequence": 1234567890,
      "payload": {
        "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
        "type": "position_opened",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "avg_price": "65000",
        "leverage": 5,
        "order_type": "market"
      }
    }
    ```
  </Tab>

  <Tab title="API">
    Authenticate the WebSocket connection first, then subscribe to the
    `notifications` channel.

    ```json Subscribe theme={null}
    {
      "id": 1,
      "req": "sub",
      "chs": ["notifications"]
    }
    ```

    After subscribing, the stream emits notification data frames like this.

    ```json theme={null}
    {
      "ch": "notifications",
      "ts": 1767225600000,
      "sq": 1234567890,
      "data": {
        "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
        "type": "position_opened",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "avg_price": "65000",
        "leverage": 5,
        "order_type": "market"
      }
    }
    ```

    Use `req: "unsub"` with the same `chs` value to unsubscribe. See [Authenticated
    Sessions](/perps/authenticated-sessions) for the authentication frame and
    connection lifecycle.
  </Tab>
</Tabs>

## Mark Notifications Read

Read state drives the unread count. Mark notifications read when the user views
them, either one by one or everything up to the newest one they have seen. Read
state is scoped to the account, so a session can only mark its own
notifications read.

<Tabs>
  <Tab title="TypeScript">
    Mark specific notifications read by id, or mark everything up to an entry read.

    <CodeGroup>
      ```ts By ids theme={null}
      await session.markNotificationsRead({
        ids: [entry.notification.id],
      });
      ```

      ```ts Up to an entry theme={null}
      await session.markNotificationsRead({
        upTo: { id: entry.notification.id, timestamp: entry.timestamp },
      });
      ```
    </CodeGroup>

    `upTo` marks the given notification and every earlier one read, inclusive. Pass
    the newest entry the user has seen to clear the feed in one call.
  </Tab>

  <Tab title="Python">
    Mark specific notifications read by id, or mark everything up to an entry read.

    <CodeGroup>
      ```python By ids theme={null}
      await session.mark_notifications_read(ids=[entry.notification.id])
      ```

      ```python Up to an entry theme={null}
      await session.mark_notifications_read(up_to=entry)
      ```
    </CodeGroup>

    `up_to` takes a `PerpsNotificationEntry` and marks it and every earlier
    notification read, inclusive. Pass the newest entry the user has seen to clear
    the feed in one call.
  </Tab>

  <Tab title="API">
    Mark specific notifications read by id, or mark everything at or before a
    cursor read.

    <CodeGroup>
      ```bash By ids theme={null}
      curl -X POST "https://api.perpetuals.polymarket.com/v1/account/notifications/read" \
        -H "polymarket-proxy: <proxy_address>" \
        -H "polymarket-secret: <proxy_secret>" \
        -H "content-type: application/json" \
        -d '{"ids": ["0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b"]}'
      ```

      ```bash Before a cursor theme={null}
      curl -X POST "https://api.perpetuals.polymarket.com/v1/account/notifications/read" \
        -H "polymarket-proxy: <proxy_address>" \
        -H "polymarket-secret: <proxy_secret>" \
        -H "content-type: application/json" \
        -d '{"before": "eyJ0cyI6MTc2NzIyNTYwMDAwMCwiaWQiOiIwYTVkOGYxZS0zYjJjLTVlNGEtOWY4Yi0xYzJkM2U0ZjVhNmIifQ"}'
      ```
    </CodeGroup>

    `before` takes a keyset cursor (base64url-encoded JSON
    `{"ts": <unix_ms>, "id": "<notification_id>"}`) and marks every notification at
    or before it read, inclusive. `next_cursor` values returned by the notifications
    read use the same format.

    The response confirms the read markers were accepted.

    ```json theme={null}
    {
      "status": "ok"
    }
    ```
  </Tab>
</Tabs>

## Backfill Missed Notifications

The live channel can miss notifications. A reconnect leaves a gap, and under
load the server can drop frames. The notifications read closes these gaps. Pass
a sequence lower bound and it returns every notification from that point
forward, so the feed catches up with stored history.

Anchor the bound at the sequence of the last notification you processed, not at
the sequence of the signal that told you to resync. The bound is inclusive and
one event can emit several notifications that share one sequence, so the
backfill re-covers the boundary. Deduplicate merged results by notification
`id`, which is identical across the read and the live channel.

<Tabs>
  <Tab title="TypeScript">
    Track the sequence of the last notification event you processed. When the
    session signals a `resync`, run the backfill from that anchor.

    ```ts theme={null}
    let lastSequence: number | undefined;

    for await (const event of session) {
      if (event.type === "notification") {
        // Apply event.payload to the local feed.
        lastSequence = event.sequence;
      }

      if (event.type === "resync") {
        for await (const page of session.listNotifications({
          sinceSeq: lastSequence,
        })) {
          // Merge page.items into the local feed, deduplicated by notification id.
        }
      }
    }
    ```

    Follow-up pages keep the same `sinceSeq` bound automatically. If you have not
    processed any notifications yet, leave `sinceSeq` unset and the read returns the
    newest notifications.
  </Tab>

  <Tab title="Python">
    Track the sequence of the last notification event you processed. When the
    session signals a `resync`, run the backfill from that anchor.

    ```python theme={null}
    last_sequence = None

    async for event in session:
        if event.type == "notification":
            # Apply event.payload to the local feed.
            last_sequence = event.sequence
        elif event.type == "resync":
            async for page in session.list_notifications(since_seq=last_sequence):
                # Merge page.items into the local feed, deduplicated by notification id.
                pass
    ```

    Follow-up pages keep the same `since_seq` bound automatically. If you have not
    processed any notifications yet, leave `since_seq` unset and the read returns
    the newest notifications.

    A resync with `event.reason == "server"` means the server dropped notification
    frames, and its `event.sequence` is the highest sequence among the dropped
    notifications. The store can persist those notifications slightly after the
    drop signal, so if a page still reports `page.durable_source_seq` below that
    target, wait briefly and run the same backfill again. The `since_seq` bound and
    id-based deduplication make retries safe.
  </Tab>

  <Tab title="API">
    <Steps>
      <Step title="Track the Last Processed Frame">
        Keep the `sq` of the last notifications data frame you processed. When the
        server drops frames under load, it sends a `resync` control frame instead. Its
        `sq` is the highest sequence among the dropped notifications.

        ```json theme={null}
        {
          "ch": "notifications",
          "ts": 1767225600000,
          "sq": 1234568100,
          "type": "resync"
        }
        ```

        A `resync` frame carries no data. Never anchor the backfill on its `sq`, which
        can be later than the dropped notifications and would skip them.
      </Step>

      <Step title="Backfill From the Anchor">
        Request the notifications read with `since_seq` set to the `sq` of the last
        data frame you processed. The bound is inclusive, so deduplicate the results by
        notification `id`.

        ```bash theme={null}
        curl -G "https://api.perpetuals.polymarket.com/v1/account/notifications" \
          -H "polymarket-proxy: <proxy_address>" \
          -H "polymarket-secret: <proxy_secret>" \
          --data-urlencode "since_seq=1234567890"
        ```

        While `has_more` is true, pass `next_cursor` back as `cursor` together with the
        same `since_seq`, so follow-up pages stay inside the gap window. If you have no
        processed data frame to anchor on, use the `durable_source_seq` of your most
        recent read instead. If you have neither, fetch the first page without
        `since_seq`.
      </Step>

      <Step title="Confirm the Store Caught Up">
        Each response reports `durable_source_seq`, the highest sequence the store has
        persisted for the account. Compare it against the catch-up target: the `resync`
        frame's `sq` after a drop, or the `sq` of the first data frame received on the
        new connection after a reconnect. Buffer live frames from the moment you
        subscribe so you do not lose that target.

        While `durable_source_seq` is below the target, the store has not caught up
        yet. Retry the same backfill until it reaches the target and deduplicate the
        merged results by notification `id`.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Notification Types

Every notification carries a `type` and a small type-specific payload.

<Tabs>
  <Tab title="TypeScript">
    The `PerpsNotificationType` and `PerpsNotificationOrderType` enums export the
    `type` and `orderType` values shown in the examples below.

    | Notification Type                          | Sent when                                                                                    |
    | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
    | `PerpsNotificationType.PositionOpened`     | A fill opens a new position.                                                                 |
    | `PerpsNotificationType.PositionIncreased`  | A fill adds to an existing position.                                                         |
    | `PerpsNotificationType.PositionReduced`    | A fill shrinks a position without closing it.                                                |
    | `PerpsNotificationType.PositionClosed`     | A fill fully closes a position and realizes its PnL.                                         |
    | `PerpsNotificationType.LimitOrderCanceled` | A resting limit order is canceled.                                                           |
    | `PerpsNotificationType.LiquidationWarning` | A position (isolated margin) or the whole account (cross margin) is approaching liquidation. |
    | `PerpsNotificationType.PositionLiquidated` | A liquidation closes part or all of a position.                                              |

    Fill-driven position notifications can include an `orderType` field that names
    the kind of order behind the fill. The field is omitted when the fill cannot
    be attributed to an order, so treat it as optional display metadata.

    | Order Type                              | Meaning                                                                  |
    | --------------------------------------- | ------------------------------------------------------------------------ |
    | `PerpsNotificationOrderType.Market`     | An untriggered aggressing order submitted without a limit price.         |
    | `PerpsNotificationOrderType.Limit`      | Any other untriggered order, including fills on a resting maker order.   |
    | `PerpsNotificationOrderType.TakeProfit` | An order fired by a take-profit trigger, whether it aggressed or rested. |
    | `PerpsNotificationOrderType.StopLoss`   | An order fired by a stop-loss trigger, whether it aggressed or rested.   |

    Each notification type carries the fields shown below.

    <CodeGroup>
      ```json Position Opened theme={null}
      {
        "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
        "type": "position_opened",
        "instrumentId": 1,
        "side": "long",
        "size": "0.01",
        "avgPrice": "65000",
        "leverage": 5,
        "orderType": "market"
      }
      ```

      ```json Position Closed theme={null}
      {
        "id": "1b6e9f2a-4c3d-5f5b-8a9c-2d3e4f5a6b7c",
        "type": "position_closed",
        "instrumentId": 1,
        "side": "long",
        "size": "0.01",
        "avgPrice": "66500",
        "pnl": "15",
        "orderType": "take_profit"
      }
      ```

      ```json Limit Order Canceled theme={null}
      {
        "id": "2c7fa03b-5d4e-5a6c-9b8d-3e4f5a6b7c8d",
        "type": "limit_order_canceled",
        "instrumentId": 1,
        "side": "long",
        "size": "0.01",
        "price": "64000"
      }
      ```

      ```json Liquidation Warning (Isolated) theme={null}
      {
        "id": "3d8ab14c-6e5f-5b7d-8c9e-4f5a6b7c8d9e",
        "type": "liquidation_warning",
        "marginType": "isolated",
        "instrumentId": 1,
        "markPrice": "53040",
        "liquidationPrice": "52000"
      }
      ```

      ```json Liquidation Warning (Cross) theme={null}
      {
        "id": "4e9bc25d-7f6a-5c8e-9d8f-5a6b7c8d9e0f",
        "type": "liquidation_warning",
        "marginType": "cross",
        "markPrice": "53040",
        "affectedInstruments": [1, 2]
      }
      ```

      ```json Position Liquidated theme={null}
      {
        "id": "5fa0d36e-8a7b-5d9f-8e9a-6b7c8d9e0f1a",
        "type": "position_liquidated",
        "instrumentId": 1,
        "side": "long",
        "sizeClosed": "0.01",
        "pnl": "-130",
        "marginType": "isolated",
        "viaBackstop": false
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    The `PerpsNotificationType` and `PerpsNotificationOrderType` type aliases list
    the `type` and `order_type` values.

    | `PerpsNotificationType` | Sent when                                                                                    |
    | ----------------------- | -------------------------------------------------------------------------------------------- |
    | `position_opened`       | A fill opens a new position.                                                                 |
    | `position_increased`    | A fill adds to an existing position.                                                         |
    | `position_reduced`      | A fill shrinks a position without closing it.                                                |
    | `position_closed`       | A fill fully closes a position and realizes its PnL.                                         |
    | `limit_order_canceled`  | A resting limit order is canceled.                                                           |
    | `liquidation_warning`   | A position (isolated margin) or the whole account (cross margin) is approaching liquidation. |
    | `position_liquidated`   | A liquidation closes part or all of a position.                                              |

    Fill-driven position notifications can include an `order_type` field that
    names the kind of order behind the fill. The field is omitted when the fill
    cannot be attributed to an order, so treat it as optional display metadata.

    | `PerpsNotificationOrderType` | Meaning                                                                  |
    | ---------------------------- | ------------------------------------------------------------------------ |
    | `market`                     | An untriggered aggressing order submitted without a limit price.         |
    | `limit`                      | Any other untriggered order, including fills on a resting maker order.   |
    | `take_profit`                | An order fired by a take-profit trigger, whether it aggressed or rested. |
    | `stop_loss`                  | An order fired by a stop-loss trigger, whether it aggressed or rested.   |

    Each notification type carries the fields shown below.

    <CodeGroup>
      ```json Position Opened theme={null}
      {
        "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
        "type": "position_opened",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "avg_price": "65000",
        "leverage": 5,
        "order_type": "market"
      }
      ```

      ```json Position Closed theme={null}
      {
        "id": "1b6e9f2a-4c3d-5f5b-8a9c-2d3e4f5a6b7c",
        "type": "position_closed",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "avg_price": "66500",
        "pnl": "15",
        "order_type": "take_profit"
      }
      ```

      ```json Limit Order Canceled theme={null}
      {
        "id": "2c7fa03b-5d4e-5a6c-9b8d-3e4f5a6b7c8d",
        "type": "limit_order_canceled",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "price": "64000"
      }
      ```

      ```json Liquidation Warning (Isolated) theme={null}
      {
        "id": "3d8ab14c-6e5f-5b7d-8c9e-4f5a6b7c8d9e",
        "type": "liquidation_warning",
        "margin_type": "isolated",
        "instrument_id": 1,
        "mark_price": "53040",
        "liquidation_price": "52000"
      }
      ```

      ```json Liquidation Warning (Cross) theme={null}
      {
        "id": "4e9bc25d-7f6a-5c8e-9d8f-5a6b7c8d9e0f",
        "type": "liquidation_warning",
        "margin_type": "cross",
        "mark_price": "53040",
        "affected_instruments": [1, 2]
      }
      ```

      ```json Position Liquidated theme={null}
      {
        "id": "5fa0d36e-8a7b-5d9f-8e9a-6b7c8d9e0f1a",
        "type": "position_liquidated",
        "instrument_id": 1,
        "side": "long",
        "size_closed": "0.01",
        "pnl": "-130",
        "margin_type": "isolated",
        "via_backstop": false
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    Notifications report these `type` values.

    | `type`                 | Sent when                                                                                     |
    | ---------------------- | --------------------------------------------------------------------------------------------- |
    | `position_opened`      | A fill opens a new position.                                                                  |
    | `position_increased`   | A fill adds to an existing position.                                                          |
    | `position_reduced`     | A fill shrinks a position without closing it.                                                 |
    | `position_closed`      | A fill fully closes a position and realizes its PnL.                                          |
    | `limit_order_canceled` | A resting limit order is canceled.                                                            |
    | `liquidation_warning`  | A position (isolated margin) or the whole account (cross margin) is approaching liquidation.  |
    | `position_liquidated`  | A liquidation closes part or all of a position.                                               |
    | `position_deleveraged` | Auto-deleveraging closes part or all of a position to settle a liquidation on the other side. |

    A liquidation that cannot settle on the order book is auto-deleveraged against
    a trader on the profitable side. The liquidated account receives
    `position_liquidated`; the counterparty, whose position was closed or reduced
    without any action of its own, receives `position_deleveraged` with the
    settlement `price` and the realized `pnl`.

    Fill-driven position notifications can include an `order_type` field that
    names the kind of order behind the fill. The field is omitted when the fill
    cannot be attributed to an order, so treat it as optional display metadata.

    | `order_type`  | Meaning                                                                  |
    | ------------- | ------------------------------------------------------------------------ |
    | `market`      | An untriggered aggressing order submitted without a limit price.         |
    | `limit`       | Any other untriggered order, including fills on a resting maker order.   |
    | `take_profit` | An order fired by a take-profit trigger, whether it aggressed or rested. |
    | `stop_loss`   | An order fired by a stop-loss trigger, whether it aggressed or rested.   |

    Each notification type carries the fields shown below.

    <CodeGroup>
      ```json Position Opened theme={null}
      {
        "id": "0a5d8f1e-3b2c-5e4a-9f8b-1c2d3e4f5a6b",
        "type": "position_opened",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "avg_price": "65000",
        "leverage": 5,
        "order_type": "market"
      }
      ```

      ```json Position Closed theme={null}
      {
        "id": "1b6e9f2a-4c3d-5f5b-8a9c-2d3e4f5a6b7c",
        "type": "position_closed",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "avg_price": "66500",
        "pnl": "15",
        "order_type": "take_profit"
      }
      ```

      ```json Limit Order Canceled theme={null}
      {
        "id": "2c7fa03b-5d4e-5a6c-9b8d-3e4f5a6b7c8d",
        "type": "limit_order_canceled",
        "instrument_id": 1,
        "side": "long",
        "size": "0.01",
        "price": "64000"
      }
      ```

      ```json Liquidation Warning (Isolated) theme={null}
      {
        "id": "3d8ab14c-6e5f-5b7d-8c9e-4f5a6b7c8d9e",
        "type": "liquidation_warning",
        "margin_type": "isolated",
        "instrument_id": 1,
        "mark_price": "53040",
        "liq_price": "52000"
      }
      ```

      ```json Liquidation Warning (Cross) theme={null}
      {
        "id": "4e9bc25d-7f6a-5c8e-9d8f-5a6b7c8d9e0f",
        "type": "liquidation_warning",
        "margin_type": "cross",
        "instrument_id": null,
        "mark_price": "53040",
        "affected_instruments": [1, 2]
      }
      ```

      ```json Position Liquidated theme={null}
      {
        "id": "5fa0d36e-8a7b-5d9f-8e9a-6b7c8d9e0f1a",
        "type": "position_liquidated",
        "instrument_id": 1,
        "side": "long",
        "size_closed": "0.01",
        "pnl": "-130",
        "margin_type": "isolated",
        "via_backstop": false
      }
      ```

      ```json Position Deleveraged theme={null}
      {
        "id": "6ab1e47f-9b8c-5eaf-8f9b-7c8d9e0f1a2b",
        "type": "position_deleveraged",
        "instrument_id": 1,
        "side": "short",
        "size_closed": "0.01",
        "price": "52000",
        "pnl": "130",
        "margin_type": "isolated"
      }
      ```
    </CodeGroup>
  </Tab>
</Tabs>
