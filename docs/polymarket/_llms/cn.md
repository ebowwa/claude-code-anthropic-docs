<!--
Source: https://docs.polymarket.com/_llms/cn.md
Downloaded: 2026-08-26T22:47:43.293Z
-->

# Polymarket Documentation: Chinese

## 入门指南

- [概览](https://docs.polymarket.com/cn/index.md): 基于全球最大的预测市场进行构建。通过 Polymarket API 进行交易、集成并访问实时市场数据。
- [Polymarket 101](https://docs.polymarket.com/cn/polymarket-101.md): Polymarket 简介——全球最大的预测市场

## SDK 与 API

- [SDK 与 API](https://docs.polymarket.com/cn/getting-started/sdks-apis.md): 选择与 Polymarket 集成的方式。
- [TypeScript SDK](https://docs.polymarket.com/cn/getting-started/typescript.md): 开始使用统一的 Polymarket TypeScript SDK。
- [Python SDK](https://docs.polymarket.com/cn/getting-started/python.md): 开始使用统一的 Polymarket Python SDK。
- [API](https://docs.polymarket.com/cn/getting-started/api.md): 直接使用 Polymarket REST API 和 WebSocket 流进行构建。
- [SDK 迁移](https://docs.polymarket.com/cn/getting-started/migrate-from-previous-sdks.md): 将现有的 Polymarket 集成迁移到统一的 SDK。

## 核心概念

- [市场与事件](https://docs.polymarket.com/cn/concepts/markets-events.md): 了解 Polymarket 的基本构成要素
- [负风险市场](https://docs.polymarket.com/cn/concepts/negative-risk.md): 多结果事件的资本高效交易机制
- [价格与订单簿](https://docs.polymarket.com/cn/concepts/prices-orderbook.md): 价格机制以及订单簿如何实现点对点交易
- [持仓与代币](https://docs.polymarket.com/cn/concepts/positions-tokens.md): 了解 Polymarket 上的结果代币和持仓机制
- [Polymarket USD](https://docs.polymarket.com/cn/concepts/pusd.md): pUSD — Polymarket 上用于所有交易的抵押代币
- [订单生命周期](https://docs.polymarket.com/cn/concepts/order-lifecycle.md): 了解订单从创建到结算的完整流程
- [判定](https://docs.polymarket.com/cn/concepts/resolution.md): 市场如何判定以及如何兑换获胜持仓

## 市场数据

- [概览](https://docs.polymarket.com/cn/market-data/overview.md): 了解 Polymarket 如何组织市场数据，以及应从何处开始。
- [发现市场](https://docs.polymarket.com/cn/market-data/discover-markets.md): 了解如何查找和筛选事件与市场，并探索相关元数据。
- [市场详情](https://docs.polymarket.com/cn/market-data/market-details.md): 了解 Polymarket 市场的结构和状态。
- [价格与订单簿](https://docs.polymarket.com/cn/market-data/prices-order-books.md): 了解价格与订单簿如何反映 Polymarket 上的交易活动。
- [分析](https://docs.polymarket.com/cn/market-data/public-analytics.md): 了解 Polymarket 上的活动与表现。
- [实时数据](https://docs.polymarket.com/cn/market-data/realtime-data.md): 通过 Polymarket 的实时数据流持续更新市场数据。
- [Chainlink TWAP 价格](https://docs.polymarket.com/cn/market-data/chainlink-twap.md): 直接通过 Chainlink 或 Polymarket RTDS 获取 Chainlink 计算的 TWAP 价格。

## 交易

- [概览](https://docs.polymarket.com/cn/trading/overview.md): 了解 Polymarket 中订单、结算和持仓如何协同运作。
- [下第一笔订单](https://docs.polymarket.com/cn/trading/quickstart.md): 了解如何通过 CLOB 进行身份验证并提交第一笔市价单。
- [钱包与身份验证](https://docs.polymarket.com/cn/trading/wallets-auth.md): 连接或创建用于交易的 Polymarket 账户。
- [下单](https://docs.polymarket.com/cn/trading/place-orders.md): 了解如何下单并控制订单的执行方式
- [管理订单](https://docs.polymarket.com/cn/trading/manage-orders.md): 了解如何在提交订单后跟踪和管理订单。
- [实时订单更新](https://docs.polymarket.com/cn/trading/realtime-order-updates.md): 实时响应经过身份验证的订单和交易活动。

## 持仓

- [仓位的工作原理](https://docs.polymarket.com/cn/trading/positions/how-positions-work.md): 了解支撑 Polymarket 仓位的链上代币机制。
- [管理仓位](https://docs.polymarket.com/cn/trading/positions/manage.md): 了解如何管理结果代币库存，从创建直到赎回。
- [组合仓位](https://docs.polymarket.com/cn/trading/positions/combinatorial.md): 由现有 Polymarket 结果构建的多腿仓位

## Combos

- [Combos 的运作方式](https://docs.polymarket.com/cn/trading/combos/overview.md): 了解多腿市场的 Combo 持仓和 RFQ 流程
- [做市商](https://docs.polymarket.com/cn/trading/combos/market-makers.md): 构建用于定价和执行 Combos 的做市商集成

## 交易

- [钱包活动](https://docs.polymarket.com/cn/trading/wallet-activity.md): 追踪与 Polymarket 钱包关联的持仓和活动。
- [费用](https://docs.polymarket.com/cn/trading/fees.md): 了解 Polymarket 的交易费用
- [做市](https://docs.polymarket.com/cn/trading/market-making.md): 在 Polymarket 上运行做市系统的指南。
- [撮合引擎重启](https://docs.polymarket.com/cn/trading/matching-engine.md): 维护窗口、重启处理以及重启后的仅挂单模式

## 跨链桥

- [存款](https://docs.polymarket.com/cn/trading/bridge/deposit.md): 从任何受支持的链桥接资产，为你的 Polymarket 账户充值
- [受支持资产](https://docs.polymarket.com/cn/trading/bridge/supported-assets.md): 支持存入 Polymarket 的链和代币
- [报价](https://docs.polymarket.com/cn/trading/bridge/quote.md): 预览存款和提款的费用及预计输出
- [提款](https://docs.polymarket.com/cn/trading/bridge/withdraw.md): 将 pUSD 从 Polymarket 桥接到任何受支持的链
- [交易状态](https://docs.polymarket.com/cn/trading/bridge/status.md): 跟踪跨链桥存款和提款直至完成

## 计划

- [Taker 返利计划](https://docs.polymarket.com/cn/programs/taker-rebates.md): 随着你的交易攀升等级，每日赚取 pUSD 返利
- [Maker 返利计划](https://docs.polymarket.com/cn/programs/maker-rebates.md): 通过在 Polymarket 提供流动性赚取每日 pUSD 返利
- [流动性奖励](https://docs.polymarket.com/cn/programs/liquidity-rewards.md): 在 Polymarket 上提供流动性获得奖励

## Builder 计划

- [概览](https://docs.polymarket.com/cn/programs/builders/overview.md): 构建通过 Polymarket 路由订单的应用
- [Builder 费用](https://docs.polymarket.com/cn/programs/builders/fees.md): 了解 Builder 如何从通过其应用路由的订单中赚取费用，以及如何完成集成。
- [Tiers](https://docs.polymarket.com/cn/programs/builders/tiers.md): 速率限制、奖励以及如何升级

## 计划

- [推荐计划](https://docs.polymarket.com/cn/programs/referral-program.md): 向交易者推荐 Polymarket，并每日赚取 pUSD 奖励

## 资源

- [合约](https://docs.polymarket.com/cn/resources/contracts.md): Polymarket 所有智能合约地址、审计与安全资源
- [数据资源](https://docs.polymarket.com/cn/resources/blockchain-data.md): 访问 Polymarket 链上活动数据并进行分析
- [错误码](https://docs.polymarket.com/cn/resources/error-codes.md): CLOB API 错误响应完整参考

## 概览

- [概览](https://docs.polymarket.com/cn/api-reference/predictions/overview.md): 了解用于构建 Polymarket 预测市场集成的 API。
- [速率限制](https://docs.polymarket.com/cn/api-reference/rate-limits.md): Polymarket API 的 Cloudflare IP 速率限制
- [CLOB 交易速率限制](https://docs.polymarket.com/cn/api-reference/trading-rate-limits.md): 按签名者地址划分的 CLOB 下单和取消令牌桶限制
- [地区限制](https://docs.polymarket.com/cn/api-reference/geoblock.md): 在 Polymarket API 下单前检查地区限制

## 事件

- [获取事件列表（键集分页）](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-keyset.md): Returns events using cursor-based (keyset) pagination for stable, efficient paging through large result sets. Use `next_cursor` from each response as `after_cursor` in the next request. The `offset` parameter is explicitly rejected; use `after_cursor` instead.
- [获取事件列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events.md)
- [按 ID 获取事件](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-id.md)
- [按 Slug 获取事件](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-slug-slug.md)
- [获取事件标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-id-tags.md)

## 市场

- [获取市场列表（键集分页）](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-keyset.md): Returns markets using cursor-based (keyset) pagination for stable, efficient paging through large result sets. Use `next_cursor` from each response as `after_cursor` in the next request. The `offset` parameter is explicitly rejected; use `after_cursor` instead.
- [获取市场列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets.md)
- [按 ID 获取市场](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-id.md)
- [按 Slug 获取市场](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-slug-slug.md)
- [按 ID 获取市场标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-id-tags.md)
- [按 Token 获取市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-markets-by-token-token-id.md): Returns the parent market for a given token ID. Useful when you have a token ID and need to resolve its parent market without knowing the condition ID in advance.
- [获取市场主要持仓者](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-holders.md)
- [获取未平仓量](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-oi.md)
- [获取事件实时交易量](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-live-volume.md)
- [获取简化市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-simplified-markets.md)
- [获取抽样市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-sampling-markets.md)
- [获取简化抽样市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-sampling-simplified-markets.md)

## 订单簿与价格

- [获取订单簿](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-book.md): Retrieves the order book summary for a specific token ID. Includes bids, asks, market details, and last trade price.
- [获取订单簿（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-books.md): Retrieves order book summaries for multiple token IDs using a request body.
- [获取市场价格](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-price.md): Retrieves the best market price for a specific token ID and side (bid or ask). Returns the best bid price for BUY side or best ask price for SELL side.
- [获取市场价格（查询参数）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-prices.md): Retrieves market prices for multiple token IDs and sides using query parameters.
- [获取市场价格（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-prices.md): Retrieves market prices for multiple token IDs and sides using a request body. Each request must include both token_id and side.
- [获取中间价](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-midpoint.md): Retrieves the midpoint price for a specific token ID. The midpoint is calculated as the average of the best bid and best ask prices.
- [获取中间价（查询参数）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-midpoints.md): Retrieves midpoint prices for multiple token IDs using query parameters. The midpoint is calculated as the average of the best bid and best ask prices.
- [获取中间价（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-midpoints.md): Retrieves midpoint prices for multiple token IDs using a request body. The midpoint is calculated as the average of the best bid and best ask prices.
- [获取价差](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-spread.md): Retrieves the spread for a specific token ID. The spread is the difference between the best ask and best bid prices.
- [获取价差](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-spreads.md): Retrieves spreads for multiple token IDs. The spread is the difference between the best ask and best bid prices.
- [获取最新成交价](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-last-trade-price.md): Retrieves the last trade price and side for a specific token ID. Returns default values of "0.5" for price and empty string for side if no trades found.
- [获取最新成交价（查询参数）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-last-trades-prices.md): Retrieves last trade prices for multiple token IDs using query parameters. Maximum 500 token IDs can be requested per call.
- [获取最新成交价（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-last-trades-prices.md): Retrieves last trade prices for multiple token IDs using a request body. Maximum 500 token IDs can be requested per call.
- [获取历史价格](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-prices-history.md): Retrieve historical price data for a market.
- [批量获取历史价格](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-batch-prices-history.md): Retrieve historical price data for multiple markets in a single request.
- [获取费率](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-fee-rate.md): Retrieves the base fee rate for a specific token ID. The fee rate can be provided either as a query parameter or as a path parameter.
- [通过路径参数获取费率](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-fee-rate-token-id.md): Retrieves the base fee rate for a specific token ID using the token ID as a path parameter.
- [获取最小价格变动单位](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-tick-size.md): Retrieves the minimum tick size (price increment) for a specific token ID. The tick size can be provided either as a query parameter or as a path parameter.
- [通过路径参数获取最小价格变动单位](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-tick-size-token-id.md): Retrieves the minimum tick size (price increment) for a specific token ID using the token ID as a path parameter.
- [获取 CLOB 市场信息](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-clob-markets-condition-id.md): Returns all CLOB-level parameters for a market in a single call — tokens, tick size, base fees, rewards, RFQ status, and fee details.
- [获取服务器时间](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-time.md): Returns the current Unix timestamp of the server. This can be used to synchronize client time with server time.

## 订单

- [提交新订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-order.md): Creates a new order in the order book
- [取消单个订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-order.md): Cancels a single order by its ID. Works even in cancel-only mode.
- [按 ID 获取订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-data-order-orderid.md): Retrieves a specific order by its ID (order hash) for the authenticated user. Builder-authenticated clients can also use this endpoint to retrieve orders attributed to their builder account.
- [批量提交订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-orders.md): Creates multiple new orders in the order book. Orders are processed in parallel. Maximum 15 orders per request.
- [获取用户订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-data-orders.md): Retrieves open orders for the authenticated user. Returns paginated results. Builder-authenticated clients can also use this endpoint to retrieve orders attributed to their builder account.
- [批量取消订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-orders.md): Cancels multiple orders by their IDs. Maximum 1000 orders per request. Duplicate order IDs in the request are automatically ignored. Works even in cancel-only mode.
- [取消所有订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-cancel-all.md): Cancels all open orders for the authenticated user. Works even in cancel-only mode.
- [取消市场订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-cancel-market-orders.md): Cancels all open orders for the authenticated user in a specific market (condition) and asset. Works even in cancel-only mode.
- [获取订单计分状态](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-order-scoring.md): Checks if a specific order is currently scoring for rewards.
- [发送心跳](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-heartbeats.md): Sends a heartbeat signal to maintain active session status. If heartbeats are not sent regularly, all open orders for the user will be automatically canceled. This is useful for automated trading systems that need to ensure orders are canceled if the system becomes unresponsive.

## 交易

- [获取交易](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-data-trades.md): Retrieves trades for the authenticated user. Returns paginated results. Requires readonly or level 2 API key authentication.
- [获取 Builder 交易](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-builder-trades.md): Retrieves trades attributed to a builder code.

## 返利

- [获取做市商当前返佣](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rebates-current.md): Returns the current rebated fees for a maker address on a given date.

## 奖励

- [获取当前有效的奖励配置](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-markets-current.md): Returns all current active rewards configurations grouped by market.
- [获取指定市场的原始奖励](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-markets-condition-id.md): Returns an array of present and future rewards configured on a market.
- [获取多个奖励市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-markets-multi.md): Returns a list of active markets with their reward configurations. Supports text search, tag filtering, numeric filters, and sorting.
- [获取用户指定日期的收益](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user.md): Returns an array of user earnings per market for a provided day.
- [获取用户指定日期的总收益](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user-total.md): Returns the summed total rewards earnings for a user on a provided day, grouped by asset address.
- [获取用户奖励比例](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user-percentages.md): Returns the real-time percentages of rewards that a user is earning per market.
- [获取用户收益和市场配置](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user-markets.md): Returns an array of current rewards including user earnings and live percentages per market for a provided day.

## 个人资料

- [按钱包地址获取公开资料](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-public-profile.md)
- [获取用户当前仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-positions.md)
- [获取用户已关闭的仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-closed-positions.md)
- [获取用户活动](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-activity.md)
- [获取用户仓位总价值](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-value.md)
- [获取用户或市场的交易](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-trades.md)
- [获取用户交易过的市场总数](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-traded.md)
- [获取市场仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-market-positions.md)
- [下载账户快照（CSV ZIP）](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-accounting-snapshot.md)

## 排行榜

- [获取交易者排行榜](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-leaderboard.md)

## Builders

- [获取 Builder 汇总排行榜](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-builders-leaderboard.md)
- [获取 Builder 每日交易量时间序列](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-builders-volume.md)

## 搜索

- [搜索市场、事件和资料](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-public-search.md)

## 标签

- [获取标签列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags.md)
- [按 ID 获取标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-id.md)
- [按 Slug 获取标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-slug-slug.md)
- [按标签 ID 获取相关标签关系](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-id-related-tags.md)
- [按标签 Slug 获取相关标签关系](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-slug-slug-related-tags.md)
- [获取与标签 ID 相关的标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-id-related-tags-tags.md)
- [获取与标签 Slug 相关的标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-slug-slug-related-tags-tags.md)

## 系列

- [获取系列列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-series.md)
- [按 ID 获取系列](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-series-id.md)

## 评论

- [获取评论列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-comments.md)
- [按评论 ID 获取评论](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-comments-id.md)
- [按用户地址获取评论](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-comments-user-address-user-address.md)

## 体育

- [获取体育元数据](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-sports.md)
- [获取有效的体育市场类型](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-sports-market-types.md)
- [获取队伍列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-teams.md)

## Relayer

- [提交交易](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/post-submit.md): Submit a transaction request to the Relayer. Authenticated using Builder API Keys or Relayer API Keys.
- [按 ID 获取交易](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-transaction.md): Gets a transaction submitted to the Relayer. Takes in a required transaction ID as a query parameter.
- [获取用户最近的交易](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-transactions.md): Gets the most recent transactions submitted to the Relayer, owned by a specific user. Authenticated using Builder API Keys or Relayer API Keys.
- [获取用户当前 Nonce](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-nonce.md): Gets the current Proxy or Safe nonce for a user. Takes in the user's signer address and the type of nonce to retrieve.
- [获取 Relayer 地址和 Nonce](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-relay-payload.md): Fetches the relayer address and nonce for a specific user. Takes in the user's signer address and the type of nonce to retrieve.
- [检查钱包是否已部署](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-deployed.md): Returns whether the wallet at the given address is deployed onchain.
- [获取所有 Relayer API Key](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-relayer-api-keys.md): Returns all relayer API keys for the authenticated address. Auth allowed: Gamma auth or Relayer API key auth (`RELAYER_API_KEY` + `RELAYER_API_KEY_ADDRESS`).

## Combos

- [获取组合市场](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/get-v1-rfq-combo-markets.md): Returns active markets that can be used as combo legs, ordered by volume descending. This endpoint is public and does not require CLOB authentication.
- [提交报价](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/post-v1-maker-quotes.md): Submit a signed maker quote for an active RFQ. Requires CLOB L2 authentication for the maker role.
- [取消报价](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/post-v1-maker-quotes-cancel.md): Cancel an active maker quote before it is selected. Requires CLOB L2 authentication for the maker role. `signer_address` and `maker_address` must match the authenticated identity.
- [确认或拒绝最终确认](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/post-v1-maker-confirmations.md): Respond to a last-look confirmation request for a selected quote. Requires CLOB L2 authentication for the maker role. `decision` must be `CONFIRM` or `DECLINE`.
- [获取用户组合仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-positions-combos.md): Combinatorial (multi-market) positions held by a user, with per-leg breakdown. Also available at /v1/data/user/{address}/positions/combos (address from the path). Open positions with shares_balance below 0.001 are omitted (dust floor — e.g. sub-0.001 remainders left by "sell all" cashouts); resolved…
- [获取用户组合活动](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-activity-combos.md): Combo lifecycle and redeem events (split / merge / convert / compress / wrap / unwrap / redeem) for a user, with per-leg breakdown. The combo counterpart to /activity trade rows. Also available at /v1/data/user/{address}/activity/combos (address from the path).
- [报价方网关](https://docs.polymarket.com/cn/api-reference/wss/rfq.md): Authenticated WebSocket for combinatorial RFQ quoters — receive requests, submit quotes, confirm last look, and track execution.

## 永续合约

- [修改订单](https://docs.polymarket.com/cn/api-reference/endpoints/perps/patch-trade-orders.md): Modify the price and total quantity of existing orders by exchange order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [按客户端订单 ID 修改订单](https://docs.polymarket.com/cn/api-reference/endpoints/perps/patch-trade-orders-coid.md): Modify the price and total quantity of existing orders by client order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [修改订单](https://docs.polymarket.com/cn/api-reference/wss/perps-modify-orders.md): 通过永续合约 WebSocket 按订单 ID 修改订单。
- [按客户端订单 ID 修改订单](https://docs.polymarket.com/cn/api-reference/wss/perps-modify-orders-coid.md): 通过永续合约 WebSocket 按客户端订单 ID 修改订单。
- [批量更新杠杆](https://docs.polymarket.com/cn/api-reference/endpoints/perps/patch-trade-leverage-batch.md): Update leverage for up to 100 unique instruments. Updates are processed sequentially and are not atomic. If only some responses arrive before the gateway deadline, missing item results use `internal_error`; whether those updates applied is unknown. If no responses arrive, the request returns 500. Re…
- [批量更新杠杆](https://docs.polymarket.com/cn/api-reference/wss/perps-update-leverages.md): 通过永续合约 WebSocket 批量更新杠杆。

## WebSocket

- [市场频道](https://docs.polymarket.com/cn/api-reference/wss/market.md): Public WebSocket for real-time orderbook, price, and market lifecycle updates.
- [用户频道](https://docs.polymarket.com/cn/api-reference/wss/user.md): Authenticated WebSocket for real-time order and trade updates.
- [体育频道](https://docs.polymarket.com/cn/api-reference/wss/sports.md): Public WebSocket for real-time sports match results.

## 跨链桥

- [获取支持的资产](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/get-supported-assets.md)
- [创建跨链桥地址](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/post-deposit.md)
- [获取报价](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/post-quote.md)
- [获取交易状态](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/get-status-address.md): Returns the deposits and withdrawals seen at a bridge address, newest first. Responses are cursor-paginated: each request returns one page plus a `nextCursor`. To read the full history, pass each `nextCursor` back as `cursor` until it comes back null. To track only recent activity, keep requesting t…
- [创建提现地址](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/post-withdraw.md)

## OpenAPI Specs

- [gamma-openapi](/api-spec/gamma-openapi.yaml)
- [clob-openapi](/api-spec/clob-openapi.yaml)
- [data-openapi](/api-spec/data-openapi.yaml)
- [relayer-openapi](/api-spec/relayer-openapi.yaml)
- [combos-rfq-openapi](/api-spec/combos-rfq-openapi.yaml)
- [perps-openapi](/api-spec/perps-openapi.json)
- [bridge-openapi](/api-spec/bridge-openapi.yaml)

## AsyncAPI Specs

- [asyncapi-rfq](/asyncapi-rfq.json)
- [asyncapi-perps](/asyncapi-perps.json)
- [asyncapi](/asyncapi.json)
- [asyncapi-user](/asyncapi-user.json)
- [asyncapi-sports](/asyncapi-sports.json)
