> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Markets

> Listed perpetual markets and trading parameters

export const PerpsInstrumentsTable = () => {
  const collapsedRowCount = 10;
  const instrumentsUrl = "https://api.perpetuals.polymarket.com/v1/info/instruments";
  const [instruments, setInstruments] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const fetchInstruments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(instrumentsUrl, {
          cache: "no-store",
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The instruments response was not a list");
        }
        setInstruments([...data].sort((first, second) => first.instrument_id - second.instrument_id));
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchInstruments();
    return () => controller.abort();
  }, [requestId]);
  if (loading) {
    return <div className="not-prose rounded-xl border border-gray-200 p-4 text-sm text-gray-600 dark:border-zinc-800 dark:text-gray-400" role="status">
        Loading available instruments…
      </div>;
  }
  if (error) {
    return <div className="not-prose rounded-xl border border-red-200 p-4 text-sm text-red-700 dark:border-red-900 dark:text-red-300" role="alert">
        <p>Could not load the available instruments.</p>
        <button className="mt-3 rounded-md border border-red-300 px-3 py-1.5 font-medium hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950" onClick={() => setRequestId(current => current + 1)} type="button">
          Try again
        </button>
      </div>;
  }
  const visibleInstruments = showAll ? instruments : instruments.slice(0, collapsedRowCount);
  return <div className="not-prose rounded-xl border border-gray-200 dark:border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-10" />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300">
            <tr>
              <th className="w-10 px-2 py-3 font-medium" scope="col">
                ID
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Symbol
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Category
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Base Asset
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Max Leverage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {visibleInstruments.map(instrument => <tr key={instrument.instrument_id}>
                <td className="w-10 min-w-0 px-2 py-3 text-gray-600 dark:text-gray-400">
                  {instrument.instrument_id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-gray-900 dark:text-gray-100">
                  {instrument.symbol}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-gray-900 dark:text-gray-100">
                  {instrument.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-gray-900 dark:text-gray-100">
                  {instrument.base_asset}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                  {instrument.max_leverage}x
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {instruments.length > collapsedRowCount && <div className="border-t border-gray-200 px-4 py-3 dark:border-zinc-800">
          <button aria-expanded={showAll} className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white" onClick={() => setShowAll(current => !current)} type="button">
            {showAll ? "Show fewer" : `Show all ${instruments.length} instruments`}
          </button>
        </div>}
    </div>;
};

Polymarket Perps markets track underlying assets across indices, commodities,
crypto assets, and equities. Each market has its own trading parameters.

## Instruments

Perps markets are represented by instruments, which are the listed perpetual
contracts available to trade.

<PerpsInstrumentsTable />

Each instrument also includes details that shape how it trades:

* Underlying asset
* Collateral and quote asset
* Price and quantity precision
* Tick size
* Minimum order size
* Risk tiers and leverage caps
* Mark, index, and funding configuration

<Note>
  Market parameters can change as markets evolve. Builders should read live
  instrument details from [Market Data](/perps/market-data#fetch-instruments)
  before submitting orders.
</Note>

## Price Feeds

Each market tracks an underlying market through external price feeds. Those
feeds drive the [Index Price](/perps/learn-about-trading/index-price), and the Index Price helps anchor the [Mark Price](/perps/learn-about-trading/mark-price).
