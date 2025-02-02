import { FungibleCryptoAssetInfo } from '@leather.io/models';

import { createBtcMarketDataQueryOptions } from './btc-market-data.query';
import { createMarketDataQueryOptions } from './market-data.query';

const maxTimeMs = 2147483647;

describe('createMarketDataQueryOptions', () => {
  const options = createMarketDataQueryOptions({} as FungibleCryptoAssetInfo, 'mainnet');
  it('should have valid cache times', () => {
    expect(options.gcTime).toBeGreaterThanOrEqual(0);
    expect(options.staleTime).toBeGreaterThanOrEqual(0);
    expect(options.gcTime).toBeLessThanOrEqual(maxTimeMs);
    expect(options.staleTime).toBeLessThanOrEqual(maxTimeMs);
  });
});

describe('createBtcMarketDataQueryOptions', () => {
  const options = createBtcMarketDataQueryOptions();
  it('should have valid cache times', () => {
    expect(options.gcTime).toBeGreaterThanOrEqual(0);
    expect(options.staleTime).toBeGreaterThanOrEqual(0);
    expect(options.gcTime).toBeLessThanOrEqual(maxTimeMs);
    expect(options.staleTime).toBeLessThanOrEqual(maxTimeMs);
  });
});
