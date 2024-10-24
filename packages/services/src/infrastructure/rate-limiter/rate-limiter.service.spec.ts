import { NetworkConfiguration } from '@leather.io/models';

import { bestInSlotApiLimiterSettings } from './best-in-slot-limiter';
import { RateLimiterType, createRateLimiterService } from './rate-limiter.service';

describe('RateLimiterService', () => {
  const mockNetworkService = {
    getConfig: () =>
      ({
        chain: {
          bitcoin: {
            mode: 'mainnet',
          },
        },
      }) as NetworkConfiguration,
  };

  it('should rate limit concurrent calls', async () => {
    const service = createRateLimiterService(mockNetworkService);
    const startTime = Date.now();

    const callCount = bestInSlotApiLimiterSettings.intervalCap + 1;
    const promises = Array(callCount)
      .fill(null)
      .map(() => service.add(RateLimiterType.BestInSlot, async () => 'result'));

    await Promise.all(promises);
    const duration = Date.now() - startTime;

    const expectedMinDuration = bestInSlotApiLimiterSettings.interval;
    expect(duration).toBeGreaterThanOrEqual(expectedMinDuration);
  });

  it('should handle priorities correctly', async () => {
    const service = createRateLimiterService(mockNetworkService);
    const results: number[] = [];
    // first need to hit rate limit
    const fillerCalls = Array(bestInSlotApiLimiterSettings.intervalCap)
      .fill(null)
      .map(() =>
        service.add(RateLimiterType.BestInSlot, async () => {
          return 'result';
        })
      );
    // subsequent calls should be queued in priority order
    const priorityPromises = [
      service.add(RateLimiterType.BestInSlot, async () => results.push(3), { priority: 3 }),
      service.add(RateLimiterType.BestInSlot, async () => results.push(5), { priority: 5 }),
      service.add(RateLimiterType.BestInSlot, async () => results.push(1), { priority: 1 }),
      service.add(RateLimiterType.BestInSlot, async () => results.push(4), { priority: 4 }),
      service.add(RateLimiterType.BestInSlot, async () => results.push(2), { priority: 2 }),
    ];

    await Promise.all([...fillerCalls, ...priorityPromises]);
    expect(results).toEqual([5, 4, 3, 2, 1]);
  });
});
