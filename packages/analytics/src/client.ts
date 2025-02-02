import { AnalyticsClientConfig, AnalyticsClientInterface, Events, JsonMap } from './types';

export function AnalyticsClient<T extends AnalyticsClientInterface>(
  analyticsClient: T,
  options: Pick<AnalyticsClientConfig<T>, 'defaultProperties' | 'defaultTraits'>
) {
  return {
    async track<K extends keyof Events>(
      event: K,
      ...properties: undefined extends Events[K] ? [] : [param: Events[K]]
    ) {
      return analyticsClient.track(event, { ...properties, ...options.defaultProperties });
    },
    async untypedTrack(event: string, properties?: JsonMap) {
      if (event.match(/^[a-zA-Z0-9\s][a-zA-Z0-9\s]*$/)) {
        throw new Error('Event must be snake_case');
      }
      return analyticsClient.track(event as any, { ...properties, ...options.defaultProperties });
    },
    screen: analyticsClient.screen,
    group: analyticsClient.group,
    identify: analyticsClient.identify,
    page: analyticsClient.page ? analyticsClient.page : () => Promise.resolve(),
    client: analyticsClient,
  };
}
