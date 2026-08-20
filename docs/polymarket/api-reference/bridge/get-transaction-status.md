> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get transaction status

> Returns the deposits and withdrawals seen at a bridge address, newest first. Responses are cursor-paginated: each request returns one page plus a `nextCursor`. To read the full history, pass each `nextCursor` back as `cursor` until it comes back null. To track only recent activity, keep requesting the first page without a cursor.




## OpenAPI

````yaml /api-spec/bridge-openapi.yaml get /status/{address}
openapi: 3.0.3
info:
  title: Polymarket Bridge API
  version: 1.0.0
  description: HTTP API for Polymarket bridge and swap operations.
servers:
  - url: https://bridge.polymarket.com
    description: Polymarket Bridge API
security: []
tags:
  - name: Bridge
    description: Bridge and swap operations for Polymarket
paths:
  /status/{address}:
    get:
      tags:
        - Bridge
      summary: Get transaction status
      description: >
        Returns the deposits and withdrawals seen at a bridge address, newest
        first. Responses are cursor-paginated: each request returns one page
        plus a `nextCursor`. To read the full history, pass each `nextCursor`
        back as `cursor` until it comes back null. To track only recent
        activity, keep requesting the first page without a cursor.
      parameters:
        - name: address
          in: path
          required: true
          description: >
            The bridge address to query for transaction status, taken from the
            `/deposit` or `/withdraw` response. EVM, Solana, Tron, and Bitcoin
            address formats are supported. EVM addresses are normalized before
            the request is forwarded upstream.
          schema:
            type: string
          example: EXoZue2avJae1d45B3fVw2unhkrtToSYQqHtHgfZ2cbE
        - name: limit
          in: query
          required: false
          description: >
            Maximum number of transactions per page. A page may contain fewer
            transactions than requested and still have a following page.
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 50
          example: 100
        - name: cursor
          in: query
          required: false
          description: >
            Opaque continuation token returned as `nextCursor` by the previous
            response. Omit it to request the first page. URL-encode it, since
            cursors can contain characters such as `+`, `/`, and `=`. Invalid,
            tampered, or cross-address tokens return 400; restart the walk
            without a cursor when that happens.
          schema:
            type: string
          example: eyJsYXN0SWQiOiI0MiJ9
        - name: paginate
          in: query
          required: false
          description: >
            Compatibility parameter forwarded upstream for existing
            integrations. Pagination applies whether or not it is sent, so new
            integrations should omit it and use `cursor` and `limit` alone. When
            sent, the only supported value is `true`.
          schema:
            type: string
            enum:
              - 'true'
      responses:
        '200':
          description: Successfully retrieved transaction status
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TransactionStatusResponse'
              example:
                transactions:
                  - fromChainId: '1151111081099710'
                    fromTokenAddress: '11111111111111111111111111111111'
                    fromAmountBaseUnit: '13566635'
                    toChainId: '137'
                    toTokenAddress: '0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB'
                    status: DEPOSIT_DETECTED
                  - fromChainId: '1151111081099710'
                    fromTokenAddress: '11111111111111111111111111111111'
                    fromAmountBaseUnit: '13400000'
                    toChainId: '137'
                    toTokenAddress: '0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB'
                    createdTimeMs: 1757646914535
                    status: PROCESSING
                  - fromChainId: '1151111081099710'
                    fromTokenAddress: '11111111111111111111111111111111'
                    fromAmountBaseUnit: '13500152'
                    toChainId: '137'
                    toTokenAddress: '0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB'
                    txHash: >-
                      3atr19NAiNCYt24RHM1WnzZp47RXskpTDzspJoCBBaMFwUB8fk37hFkxz35P5UEnnmWz21rb2t5wJ8pq3EE2XnxU
                    createdTimeMs: 1757531217339
                    status: COMPLETED
                nextCursor: eyJsYXN0SWQiOiI0MiJ9
        '400':
          description: Bad Request - Missing or invalid address, limit, or cursor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                missingAddress:
                  value:
                    error: address is required
                invalidAddress:
                  value:
                    error: invalid address
                invalidLimit:
                  value:
                    error: limit must be an integer between 1 and 100
                rejectedUpstream:
                  summary: >-
                    Rejected by the bridge provider, most often a stale or
                    malformed cursor
                  value:
                    error: invalid request
        '500':
          description: Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: cannot get transaction status
components:
  schemas:
    TransactionStatusResponse:
      type: object
      required:
        - transactions
        - nextCursor
      properties:
        transactions:
          type: array
          items:
            $ref: '#/components/schemas/Transaction'
          description: >
            One page of transactions for the given address, newest first. This
            is a page, not the full history for the address.
        nextCursor:
          type: string
          nullable: true
          description: >
            Opaque continuation token for the next page, or null when the
            pagination walk is complete. Pass it back verbatim as `cursor` on
            the next request; never parse, modify, construct, or reuse it with a
            different address. Stop on null rather than on an empty page or a
            page shorter than `limit`.
          example: eyJsYXN0SWQiOiI0MiJ9
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error
    Transaction:
      type: object
      properties:
        fromChainId:
          type: string
          description: Source chain ID
          example: '1151111081099710'
        fromTokenAddress:
          type: string
          description: Source token contract address
          example: '11111111111111111111111111111111'
        fromAmountBaseUnit:
          type: string
          description: Amount in base units (without decimals)
          example: '13566635'
        toChainId:
          type: string
          description: Destination chain ID
          example: '137'
        toTokenAddress:
          type: string
          description: Destination token contract address
          example: '0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB'
        status:
          type: string
          description: >
            Current status of the transaction. If a transaction fails, remains
            stuck, or funds are held due to a compliance check, direct users to
            our Bridge API provider's support
            (https://intercom.help/funxyz/en/articles/10732578-contact-us).
          enum:
            - DEPOSIT_DETECTED
            - PROCESSING
            - ORIGIN_TX_CONFIRMED
            - SUBMITTED
            - COMPLETED
            - FAILED
          example: COMPLETED
        txHash:
          type: string
          description: Transaction hash (only available when status is COMPLETED)
          example: >-
            3atr19NAiNCYt24RHM1WnzZp47RXskpTDzspJoCBBaMFwUB8fk37hFkxz35P5UEnnmWz21rb2t5wJ8pq3EE2XnxU
        createdTimeMs:
          type: number
          description: >-
            Unix timestamp in milliseconds when transaction was created (missing
            when status is DEPOSIT_DETECTED)
          example: 1757531217339

````