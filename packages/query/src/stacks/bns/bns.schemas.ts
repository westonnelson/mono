import { z } from 'zod';

const bnsV2NameSchema = z.object({
  full_name: z.string(),
  name_string: z.string(),
  namespace_string: z.string(),
  owner: z.string(),
  registered_at: z.string(),
  renewal_height: z.string(),
  stx_burn: z.string(),
  revoked: z.boolean(),
});

export const bnsV2NamesByAddressSchema = z.object({
  total: z.number(),
  current_burn_block: z.number(),
  limit: z.number(),
  offset: z.number(),
  names: z.array(bnsV2NameSchema),
});

export type BnsV2NamesByAddressResponse = z.infer<typeof bnsV2NamesByAddressSchema>;

export const bnsV2ZoneFileDataSchema = z.object({
  owner: z.string(),
  general: z.string(),
  twitter: z.string(),
  url: z.string(),
  nostr: z.string(),
  lightning: z.string(),
  btc: z.string(),
  subdomains: z.array(z.string()),
});

export interface BnsV2ZoneFileDataResponse {
  zonefile: z.infer<typeof bnsV2ZoneFileDataSchema>;
}
